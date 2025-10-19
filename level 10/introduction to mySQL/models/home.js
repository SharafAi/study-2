//core modules
const db = require('../utilities/dataBaseUtil');


module.exports = class Home {
  constructor(houseName, price, location, rating, photoURL) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoURL = photoURL;
  }

  save() {
  }

  static fetchAll() {
    return db.execute('SELECT * FROM homes');
      
  }

  static findById(homeId, callback) {
  }

  static deleteById(homeid, callback) {
  } 
}
