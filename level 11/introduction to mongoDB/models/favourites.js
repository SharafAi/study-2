const { getDB } = require('../utilities/dataBaseUtil')


module.exports = class Favourite {
   constructor(houseid) {
    this.houseid = houseid;
   }
  
  save() {
    const db = getDB();
    return db.collection('favourites').findOne({ houseid: this.houseid }).then(existingFav => {
      if (!existingFav) {
        return db.collection('favourites').insertOne(this);
      }
      return Promise.resolve();
    
    });
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