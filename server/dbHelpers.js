const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const mongoCreate = async (collectionName, query) => {
    const client = new MongoClient(MONGO_URI, options);

    //Connect client
    await client.connect();
    console.log("connected!");
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries
    let result = null;
    Array.isArray(query) ?
        result = await db.collection(collectionName).insertMany(query) :
        result = await db.collection(collectionName).insertOne(query);
    //------------------------------------------------------------------------------------------

    //Close client
    client.close();
    console.log("disconnected!");
    //Close client

    return result;

};

const mongoReadOne = async (collectionName, query) => {
    const client = new MongoClient(MONGO_URI, options);

    //Connect client
    await client.connect();
    console.log("connected!");
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries
    const result = await db.collection(collectionName).findOne(query);
    //------------------------------------------------------------------------------------------

    //Close client
    client.close();
    console.log("disconnected!");
    //Close client

    return result;
};

const mongoRead = async (collectionName, query) => {
    const client = new MongoClient(MONGO_URI, options);

    //Connect client
    await client.connect();
    console.log("connected!");
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries
    const result = await db.collection(collectionName).find(query).toArray();
    //------------------------------------------------------------------------------------------

    //Close client
    client.close();
    console.log("disconnected!");
    //Close client

    return result;
};

const mongoReadLimit = async (collectionName, query, skip, limit) => {
    const client = new MongoClient(MONGO_URI, options);

    //Connect client
    await client.connect();
    console.log("connected!");
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries
    const total = await db.collection(collectionName).countDocuments(query);
    const result = await db.collection(collectionName).find(query).sort({ "_id": -1 }).skip(skip).limit(limit).toArray();
    //------------------------------------------------------------------------------------------

    //Close client
    client.close();
    console.log("disconnected!");
    //Close client

    return [total, result];
};

const mongoReadDistinct = async (collectionName, query, category) => {
    const client = new MongoClient(MONGO_URI, options);

    //Connect client
    await client.connect();
    console.log("connected!");
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries
    const result = await db.collection(collectionName).distinct("category");

    //------------------------------------------------------------------------------------------

    //Close client
    client.close();
    console.log("disconnected!");
    //Close client

    return [... new Set(result)];
};


const mongoUpdateOne = async (collectionName, query, newValues) => {
    const client = new MongoClient(MONGO_URI, options);
    console.log(query);
    console.log(newValues);
    //Connect client
    await client.connect();
    console.log("connected!");
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries

    const result = await db.collection(collectionName).updateOne(query, newValues);
    //------------------------------------------------------------------------------------------

    //Close client
    client.close();
    console.log("disconnected!");
    //Close client

    return result;

};

const mongoDelete = async (collectionName, query) => {
    const client = new MongoClient(MONGO_URI, options);

    //Connect client
    await client.connect();
    console.log("connected!");
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries

    const result = await db.collection(collectionName).deleteOne(query);
    //------------------------------------------------------------------------------------------

    //Close client 
    client.close();
    console.log("disconnected!");
    //Close client

    return result;
};

module.exports = {
    mongoCreate,
    mongoRead,
    mongoReadOne,
    mongoReadDistinct,
    mongoReadLimit,
    mongoUpdateOne,
    mongoDelete
};