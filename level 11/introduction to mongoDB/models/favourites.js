const { getDB } = require('../utilities/dataBaseUtil')


module.exports = class Favourite {
   constructor(houseid) {
    this.houseid = houseid;
   }
  
  save() {
    const db = getDB();
     return db.collection('favourites').insertOne(this);
  }
  


  static getFavourites() {
      const db = getDB();
    return db.collection('favourites').find().toArray();
   
    }

  static deleteById(delHomeId) {
   const db = getDB();
       return db.collection('favourites').deleteOne({ houseid : delHomeId });
  }
  };