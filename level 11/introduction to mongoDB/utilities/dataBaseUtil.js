const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const Mongo_URL = "mongodb+srv://gundey0_db_user:secretpassword@xayroindustries.d5xjgz9.mongodb.net/?retryWrites=true&w=majority&appName=XayroIndustries";


const MongoConnect = (callback) => {
  MongoClient.connect(Mongo_URL)
    .then((client) => {
      callback(client);
    }).catch((error) => {
      console.error("Failed to connect to MongoDB", error);
    });
}

module.exports = MongoConnect;
