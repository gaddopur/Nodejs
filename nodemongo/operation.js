const assert = require('assert');

exports.insertDocument = (db, collection, document, callback) => {
    const coll = db.collection(collection);
    return coll.insert(document);
}
exports.findDocument = (db, collection, callback) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();
}
exports.updateDocument = (db, collection, document, update, callback) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, {$set: update}, null);
}
exports.deleteDocument = (db, collection, document, callback) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
}