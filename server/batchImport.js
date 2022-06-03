const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI, DB_NAME } = process.env;
// test
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const items = require("./data/cameras.json");
const companies = require("./data/companies.json");

const batchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);

    //Connect client
    await client.connect();
    console.log("connected!");
    const db = client.db(DB_NAME);
    //------------------------------------------------------------------------------------------
    //Queries

    //Insert each item to collection
    items.forEach(async (item) => {
        await db.collection("items").insertOne({ ...item, _id: uuidv4() });
    });

    //Insert each companies to collection
    await db.collection("companies").insertMany(companies);

    //Create Users collection
    await db.createCollection("users");

    //Making User Eamil unique
    await db.collection("users").createIndex({ email: 1 }, { unique: true });

    //------------------------------------------------------------------------------------------

    //Disconnect client
    client.close();
    console.log("disconnected!");
    //Disconnect client
};

batchImport();