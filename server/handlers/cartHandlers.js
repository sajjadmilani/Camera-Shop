const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

//Add an item to the user's cart
const addToCart = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        //Connect client
        await client.connect();
        console.log("connected!");
        const db = client.db(DB_NAME);
        //Connect client
        //------------------------------------------------------------------------------------------
        //Queries
        const { user, itemId } = req.body;

        //Find item data by id
        let item = await db.collection("items").findOne({ _id: itemId });

        //If item not in stock return 404
        if (item.numInStock === 0) {
            return res.status(404).json({ status: 404, message: "Item is out of stock" });
        }

        //Find user data by id
        let userData = await db.collection("users").findOne({ _id: user.sub });
        let duplicate = false;
        let prevQuantity = 0;

        //If user exist 
        if (userData) {
            //Check Item exist in cart or not
            userData.cart.forEach(async (item) => {
                if (item.id === itemId) {
                    duplicate = true;
                    prevQuantity = item.quantity;
                }
            });

            //If item exist try to add quantity of item in user's card
            if (duplicate) {
                if (prevQuantity + 1 > item.numInStock) {
                    return res.status(404).json({ status: 404, message: `There is just ${item.numInStock} of this product in stock!` });
                }
                await db.collection("users").findOneAndUpdate(
                    { _id: user.sub, "cart.id": itemId },
                    { $inc: { "cart.$.quantity": 1 } },
                    { new: true }
                );
            }

            //If item not exist insert that to card of user
            else {
                await db.collection("users").findOneAndUpdate(
                    { _id: user.sub },
                    { $push: { cart: { id: itemId, quantity: 1 } } },
                    { new: true });
            }
        }
        //If user not exist in users collection , insert user and card at the same time
        else {
            userData = await db.collection("users").insertOne({
                ...user, _id: user.sub, cart: [{
                    id: itemId, quantity: 1
                }]
            });
        }

        userData ?
            res.status(200).json({ status: 200, data: userData.cart }) :
            res.status(400).json({ status: 400, message: "There is a problem on inserting data!" });

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

//Get all items in the cart of user
const getCart = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);
    const { _id } = req.params;
    try {
        //Connect client
        await client.connect();
        console.log("connected!");
        const db = client.db(DB_NAME);
        //Connect client
        //------------------------------------------------------------------------------------------
        //Queries

        //Aggregate users collection and items to return list of items data that already in the card
        const cart = await db.collection("users").aggregate([
            { $match: { _id } },
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
                "$project": {
                    _id: "$cart._id",
                    name: "$cart.name",
                    price: "$cart.price",
                    body_location: "$cart.body_location",
                    category: "$cart.category",
                    imageSrc: "$cart.imageSrc",
                    numInStock: "$cart.numInStock",
                    companyId: "$cart.companyId",
                    quantity: 1
                }
            }
        ]).toArray();

        cart ?
            res.status(200).json({ status: 200, data: cart }) :
            res.status(404).json({ status: 404, message: "Not Found!" });
        //------------------------------------------------------------------------------------------
    }
    catch (error) {
        console.log(error);
    }
    finally {
        //Close client
        client.close();
        console.log("disconnected!");
        //Close client
    }
};

//Remove an item from cart of the user
const removeFromCart = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const _id = isNaN(Number(req.params._id)) ?
        req.params._id :
        Number(req.params._id);

    const { user } = req.body;
    try {
        //Connect client
        await client.connect();
        console.log("connected!");
        const db = client.db(DB_NAME);
        //Connect client
        //------------------------------------------------------------------------------------------
        //Queries

        //Remove item from user's card
        const result = await db.collection("users").updateOne(
            { _id: user.sub },
            { $pull: { cart: { id: _id } } }
        );


        result.modifiedCount ?
            res.status(200).json({ status: 200, message: "cart removed!" }) :
            res.status(400).json({ status: 404, message: "Not Found!" });
        //------------------------------------------------------------------------------------------
    }
    catch (error) {
        console.log(error);
    }
    finally {
        //Close client
        client.close();
        console.log("disconnected!");
        //Close client
    }
};

//Remove all items in cart of the user
const clearCart = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const { _id } = req.params;
    try {
        //Connect client
        await client.connect();
        console.log("connected!");
        const db = client.db(DB_NAME);
        //Connect client
        //------------------------------------------------------------------------------------------
        //Queries

        //Remove whole items in cart of user
        const result = await db.collection("users").updateOne(
            { _id },
            { $set: { "cart": [] } }
        );

        result.modifiedCount ?
            res.status(200).json({ status: 200, message: "The cart was cleared!" }) :
            res.status(404).json({ status: 404, message: "There are no products in the cart!" });
        //------------------------------------------------------------------------------------------
    }
    catch (error) {
        console.log(error);
    }
    finally {
        //Close client
        client.close();
        console.log("disconnected!");
        //Close client
    }
};

module.exports = { addToCart, getCart, removeFromCart, clearCart };