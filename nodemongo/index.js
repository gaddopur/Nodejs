const MongoClient = require('mongodb').MongoClient;
const assert = require("assert");
const dbOper = require('./operation');

const url = "mongodb://localhost:27017";
const dbname = 'Confusion';

MongoClient.connect(url)
.then((client) => {
    console.log("Connected succesfully to the mongodb\n");

    const db = client.db(dbname);
    const collection = 'dishes';

    dbOper.insertDocument(db, collection, {name: "Laddus", discription: "This is made of basen"})
    .then(res => {
        console.log("Inserted successfully what a good thing happen", res);
        return dbOper.findDocument(db, collection);
    })
    .then(res => {
        console.log("Find successfully what we do now", res);
        return dbOper.updateDocument(db, collection, {name: "Laddus"}, {name: "Update Laddus"});
    })
    .then(res => {
        console.log("Updated successfully what we do now", res.result);
        return dbOper.findDocument(db, collection);
    })
    .then(res => {
        console.log("Again found successfully", res);
        return db.dropCollection(collection);
    })
    .then(res => {
        console.log('We dropdown the collection which you created bro', res);
        return client.close();
    })
    .then(res => {
        console.log("successfully close");
    })
    .catch(err => {
        console.log("We found an err what we do now", err);
    });
})
.catch((err) => 
    console.log('We got some error guys what we need to do now', err)
);