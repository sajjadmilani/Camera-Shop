const { v4: uuidv4 } = require("uuid");
const {
    mongoReadOne,
    mongoReadLimit,
    mongoUpdateOne,
    mongoReadDistinct,
    mongoCreate,
    mongoDelete } = require("../dbHelpers");

//Mergin company detail with product detail
const companyMerge = (product, company) => {
    return { ...product, company };
};

//Add a product 
const addProduct = async (req, res) => {
    const { name, price, body_location, category, imageSrc, numInStock, companyId } = req.body;

    if (!(name && price && body_location && category && imageSrc && numInStock && companyId)) {
        return res.status(400).json({ status: 400, message: "Not all required values have been sent!" });
    }

    const result = await mongoCreate("items", { ...req.body, _id: uuidv4() });
    (result.insertedId) ?
        res.status(200).json({ status: 200, data: { _id: result.insertedId }, message: "Product Added!" }) :
        res.status(400).json({ status: 400, message: "There is a problem on inserting data!" });
};

//Get list of products (can limit with -limit and - start)
const getProducts = async (req, res) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = 20;
    const start = limit * (page - 1);

    const [total, products] = await mongoReadLimit("items", null, start, limit);

    if (products.length > 0) {
        return res.status(200).json({
            status: 200,
            total,
            data: products
        });
    }
    return res.status(404).json({ status: 404, message: "Not found!" });
};

//Get array of category names (Distinct)
const getCategories = async (req, res) => {
    const categories = await mongoReadDistinct("items", null, "category");
    console.log(categories);
    if (categories.length > 0) {
        return res.status(200).json({
            status: 200,
            data: categories
        });
    }
    return res.status(404).json({ status: 404, message: "Not found!" });
};

//Get list of products by each key exist in collection (Category , Section , Detail , Name and so on)
const getProductsByProperty = async (req, res) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = 20;
    const start = limit * (page - 1);

    const query = { [req.params.key]: { $regex: req.params.value.toLowerCase(), $options: 'i' } };

    const [total, products] = await mongoReadLimit("items", query, start, limit);

    if (products.length > 0) {
        return res.status(200).json({
            status: 200,
            total,
            data: products
        });
    }
    return res.status(404).json({ status: 404, message: "Not found!" });
};

//Get list of products by company name
const getProductsByCompany = async (req, res) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = 20;
    const start = limit * (page - 1);
    const companyQuery = {
        name: {
            $regex: req.params.name.toLowerCase(), $options: 'i'
        }
    };
    //Get company data
    const company = await mongoReadOne("companies", companyQuery);
    if (!company) {
        return res.status(404).json({ status: 404, message: "Not found!" });
    }

    const query = { companyId: company._id };

    const [total, products] = await mongoReadLimit("items", query, start, limit);

    //Merge company data with each product
    const mappedProducts = products.map((product) => {
        return companyMerge(product, company);
    });
    if (products.length > 0) {
        return res.status(200).json({
            status: 200,
            total,
            data: mappedProducts
        });
    }
    return res.status(404).json({ status: 404, message: "Not found!" });
};

//Get a product by id
const getSingleProduct = async (req, res) => {
    //-----------------------------------------------------------------------------//
    //**Check if _id is a number then convert it to the (Number).**                //    
    //I added this because initial data contains (Number) as _id but adding data_ //
    //with endpoint contains UUidv4(string) as _id                                 //
    //-----------------------------------------------------------------------------//
    const _id = isNaN(Number(req.params._id)) ?
        req.params._id :
        Number(req.params._id);
    try {
        const product = await mongoReadOne("items", { _id });
        const company = await mongoReadOne("companies", { _id: product.companyId });
        if (product && company) {
            return res.status(200).json({
                status: 200,
                data: companyMerge(product, company)
            });
        }
        return res.status(404).json({ status: 404, message: "Not found!" });
    }
    catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    }

};

//Update a product
const updateProduct = async (req, res) => {
    const _id = isNaN(Number(req.params._id)) ?
        req.params._id :
        Number(req.params._id);

    const { name, price, body_location,
        category, imageSrc, numInStock, companyId } = req.body;

    const product = await mongoReadOne("items", { _id });


    const newValues = {
        $set: {
            "name": name ? name : product.name,
            "price": price ? price : product.price,
            "body_location": body_location ? body_location : product.body_location,
            "category": category ? category : product.category,
            "imageSrc": imageSrc ? imageSrc : product.imageSrc,
            "numInStock": numInStock ? numInStock : product.numInStock,
            "companyId": companyId ? companyId : product.companyId
        }
    };
    const result = await mongoUpdateOne("items", { _id }, newValues);

    result.modifiedCount === 1 ?
        res.status(200).json({ status: 200, message: "Product Updated!" }) :
        res.status(404).json({ status: 404, message: "Not Found!" });
};

//Delete a product by id
const deleteProduct = async (req, res) => {
    const _id = isNaN(Number(req.params._id)) ?
        req.params._id :
        Number(req.params._id);

    const result = await mongoDelete("items", { _id });
    if (result.deletedCount === 1) {
        return res.status(200).json({ status: 200, message: "Product Deleted!" });
    }
    return res.status(404).json({ status: 404, message: "Not found!" });
};

module.exports = {
    addProduct,
    getProducts,
    getSingleProduct,
    getProductsByProperty,
    updateProduct,
    deleteProduct,
    getProductsByCompany,
    getCategories
};