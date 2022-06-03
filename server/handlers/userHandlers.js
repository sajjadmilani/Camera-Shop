const {
    mongoReadOne,
    mongoUpdateOne } = require("../dbHelpers");

//Get a user by _id
const getUser = async (req, res) => {
    const { _id } = req.params;

    const user = await mongoReadOne("users", { _id });

    user ?
        res.status(200).json({ status: 200, data: user }) :
        res.status(404).json({ status: 404, message: "Not Found!" });
};

//Update a user
const updateUser = async (req, res) => {
    const _id = isNaN(Number(req.params._id)) ?
        req.params._id :
        Number(req.params._id);

    const { name, url, country } = req.body;

    const user = await mongoReadOne("users", { _id });

    const newValues = {
        $set: {
            "name": name ? name : user.name,
            "email": url ? url : user.url,
            "picture": country ? country : user.country,
            "email_verified": email_verified ? email_verified : user.email_verified,
            "updated": updated ? updated : user.updated
        }
    };

    const result = await mongoUpdateOne("users", { _id }, newValues);

    result.modifiedCount === 1 ?
        res.status(200).json({ status: 200, message: "User was updated!" }) :
        res.status(404).json({ status: 404, message: "Not Found!" });
};

//Delete a user by _id
const deleteUser = async (req, res) => {
    const _id = isNaN(Number(req.params._id)) ?
        req.params._id :
        Number(req.params._id);

    const result = await mongoDelete("users", { _id });
    if (result.deletedCount === 1) {
        return res.status(200).json({ status: 200, message: "User was deleted!" });
    }
    return res.status(404).json({ status: 404, message: "Not found!" });
};

module.exports = {
    getUser,
    updateUser,
    deleteUser
};