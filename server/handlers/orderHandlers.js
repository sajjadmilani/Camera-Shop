const {
    mongoReadOne,
    mongoReadLimit } = require("../dbHelpers"); 
    
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, DB_NAME } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

//Add an order
const addOrder = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const { userId } = req.body;
    try {
        //Connect client
        await client.connect();
        console.log("connected!");
        const db = client.db(DB_NAME);
        //Connect client
        //------------------------------------------------------------------------------------------
        //Queries

        //Getting targeted user that have at least one item in cart
        const userData = await db.collection("users").findOne({ _id: userId, "cart.0": { "$exists": true } });

        //If user not exist or cart is empty
        if (!userData) {
            return res.status(400).json({ status: 400, message: "Cart is empty" });
        }

        //Preparing |☰| Cart Data to insert into orders collection
        const cartData = await db.collection("users").aggregate([
            { $match: { _id: userId } },
            { $unwind: "$cart" },
            { $project: { cart: 1, quantity: "$cart.quantity" } },
            {
                $lookup: {
                    from: "items",
                    localField: "cart.id",
                    foreignField: "_id",
                    as: "cart"
                }
            },
            { $unwind: "$cart" },
            {
                $project: {
                    _id: "$_id",
                    cart: {
                        _id: "$cart._id",
                        name: "$cart.name",
                        price: "$cart.price",
                        body_location: "$cart.body_location",
                        category: "$cart.category",
                        imageSrc: "$cart.imageSrc",
                        companyId: "$cart.companyId",
                        quantity: "$quantity"
                    }
                }
            },
            { $group: { _id: "$_id", cart: { $push: "$cart" } } }
        ]).toArray();

        //Insert order data to orders collection (checkout info + _id + userId)
        const result = await db.collection("orders").insertOne({
            ...req.body,
            cart: cartData[0].cart,
            _id: uuidv4(),
            userId: cartData[0]._id
        });

        //Check order was inserted or not
        if (result.acknowledged) {

            //Decrease numInStock of each item after placing order
            cartData[0].cart.forEach(async (item) => {
                await db.collection("items").updateOne(
                    { _id: item._id },
                    { $inc: { numInStock: (-1 * item.quantity) } }
                );
            });

            //Empty the shopping cart after placing the order
            const clearResult = await db.collection("users").updateOne(
                { _id: userId },
                { $set: { "cart": [] } }
            );


            //Check if the user's cart was emptied or not
            clearResult.modifiedCount === 1 ?
                res.status(200).json({ status: 200, data: result.insertedId }) :
                res.status(400).json({ status: 400, message: "There is a problem on inserting data!" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: error.message });
    }
    //------------------------------------------------------------------------------------------
    finally {
        //Close client
        client.close();
        console.log("disconnected!");
        //Close client
    }
};

//Get orders by userId
const getOrdersByUser = async (req, res) => {
    
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = 20;
    const start = limit * (page - 1);

    const { userId } = req.params;
    const Orders = await mongoReadLimit("orders", { userId }, start, limit);
    Orders.length > 0 ?
        res.status(200).json({ status: 200, data: Orders }) :
        res.status(404).json({ status: 404, message: "Not Found!" });
};

//Get an order by Id
const getOrder = async (req, res) => {
    const { _id, userId } = req.params;
    const Order = await mongoReadOne("orders", { userId, _id });
    Order ?
        res.status(200).json({ status: 200, data: Order }) :
        res.status(404).json({ status: 404, message: "Not Found!" });
};


module.exports = {
    addOrder,
    getOrdersByUser,
    getOrder
};