const { v4: uuidv4 } = require("uuid");
const {
    mongoReadOne,
    mongoReadLimit,
    mongoUpdateOne,
    mongoCreate,
    mongoDelete } = require("../dbHelpers");

//Add a company
const addCompany = async (req, res) => {

    const { name, url, country } = req.body;

    if (!(name && url && country)) {
        return res.status(400).json({ status: 400, message: "Not all required values have been sent!" });
    }

    const result = await mongoCreate("companies",
        {
            ...req.body,
            _id: uuidv4() // Generate UUIv4 as _id
        }
    );
    (result.insertedId) ?
        res.status(200).json({ status: 200, data: { _id: result.insertedId }, message: "Company Added!" }) :
        res.status(400).json({ status: 400, message: "There is a problem on inserting data!" });

};

//Get list of companies 
const getCompanies = async (req, res) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = 20;
    const start = limit * (page - 1);

    const [total, companies] = await mongoReadLimit("companies", null, start, limit);

    if (companies.length > 0) {
        return res.status(200).json({
            status: 200,
            total,
            data: companies
        });
    }
    return res.status(404).json({ status: 404, message: "Not found!" });
};

//Get a company
const getSingleCompany = async (req, res) => {
    const _id = isNaN(Number(req.params._id)) ?
        req.params._id :
        Number(req.params._id);

    const company = await mongoReadOne("companies", { _id });

    if (company) {
        return res.status(200).json({
            status: 200,
            data: company
        });
    }
    return res.status(404).json({ status: 404, message: "Not found!" });
};

//Update a company
const updateCompany = async (req, res) => {

    //-----------------------------------------------------------------------------//
    //**Check if _id is a number then convert it to the (Number).**                //    
    //I added this because initial data contains (Number) as _id but adding data_ //
    //with endpoint contains UUidv4(string) as _id                                 //
    //-----------------------------------------------------------------------------//  
    const _id = isNaN(Number(req.params._id)) ?
        req.params._id :
        Number(req.params._id);

    const { name, url, country } = req.body;

    const company = await mongoReadOne("companies", { _id });

    const newValues = {
        $set: {
            "name": name ? name : company.name,
            "url": url ? url : company.url,
            "country": country ? country : company.country
        }
    };
    const result = await mongoUpdateOne("companies", { _id }, newValues);

    result.modifiedCount === 1 ?
        res.status(200).json({ status: 200, message: "Company Updated!" }) :
        res.status(404).json({ status: 404, message: "Not Found!" });
};

//Delete a company by id
const deleteCompany = async (req, res) => {
    const _id = isNaN(Number(req.params._id)) ?
        req.params._id :
        Number(req.params._id);

    const result = await mongoDelete("companies", { _id });
    if (result.deletedCount === 1) {
        return res.status(400).json({ status: 200, message: "Company Deleted!" });
    }
    return res.status(404).json({ status: 404, message: "Not found!" });
};

module.exports = {
    addCompany,
    getSingleCompany,
    getCompanies,
    updateCompany,
    deleteCompany
};