const {getDB} = require('../utilities/dataBaseUtil');


module.exports = class Home {
  constructor(houseName, price, location, rating, photoURL, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoURL = photoURL;
    this.description = description;
    this.id = id;
  }

  save() {
    const db = getDB();
    return db.collection('homes').insertOne(this);
  
   
  }

  static fetchAll() {
    const db = getDB();
    return db.collection('homes').find().toArray();

      
  }

  static findById(homeid) {

  }

  static deleteById(homeid) {
 
  } 
}
