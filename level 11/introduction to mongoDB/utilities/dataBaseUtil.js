const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb+srv://gundey0_db_user:shlmh@xayroindustries.d5xjgz9.mongodb.net/?retryWrites=true&w=majority&appName=XayroIndustries";

let _db;


const MongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      callback();
      _db = client.db('airbnb');
    }).catch((error) => {
      console.error("Failed to connect to MongoDB", error);
    });
}

const getDB = () => {
  if (!_db) {
    throw new Error('No database found!');
  }
  return _db;
}

exports.MongoConnect = MongoConnect;
exports.getDB = getDB;
