//core modulees
const fs = require('fs');
const path = require('path');
const rootDir = require('../utilities/pathUtil');

const FavouriteDataPath = path.join(rootDir, 'data', 'Favourite.json');

module.exports = class Favourite {
  
  static addToFavourite(Homeid, callback) {
    Favourite.getFavourites((Favourites) => {
      if (Favourites.includes(Homeid)) {
        callback("home is already marked favourites");
      } else {
        Favourites.push(Homeid);
        fs.writeFile(FavouriteDataPath, JSON.stringify(Favourites), callback);
      }
    


      
    });

  }

  static getFavourites(callback) {
    fs.readFile(FavouriteDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static deleteById(delHomeId, callback) {
    Favourite.getFavourites(homeIds => {
      homeIds = homeIds.filter(homeid => delHomeId !== homeid);
      fs.writeFile(FavouriteDataPath, JSON.stringify(homeIds), callback);
    })
  }
  };