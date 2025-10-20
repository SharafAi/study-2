//core modules
const db = require('../utilities/dataBaseUtil');


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
    if (this.id) { //update 
      return db.execute('UPDATE homes SET houseName=?, price=?, location=?, rating=?, photoURL=?, description=? WHERE id=?',[this.houseName, this.price, this.location, this.rating, this.photoURL, this.description, this.id]);

    } else { //insert
        return db.execute('INSERT INTO homes(houseName, price, location, rating, photoURL, description)VALUES(?,?,?,?,?,?)',[this.houseName, this.price, this.location, this.rating, this.photoURL, this.description]); 
    }
  
  }

  static fetchAll() {
    return db.execute('SELECT * FROM homes');
      
  }

  static findById(homeid) {
    return db.execute('SELECT * FROM homes WHERE id = ?',[homeid]);
  }

  static deleteById(homeid) {
    return db.execute('DELETE FROM homes WHERE id = ?',[homeid]);
  } 
}
