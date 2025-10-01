//core modulees
const fs = require('fs');
const path = require('path');
const rootDir = require('../utilities/pathUtil');

const homeDataPath = path.join(rootDir, 'data', 'homes.json');



module.exports = class Home {
  constructor(houseName, price, location, rating, photoURL) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoURL = photoURL;
  }
  
  save() {
    this.id = Math.random().toString();
    Home.fetchAll((RergisterdHomes) => {
      RergisterdHomes.push(this);
      fs.writeFile(homeDataPath, JSON.stringify(RergisterdHomes), (error) => {
        console.log("file writing concluded", error);
      })
    });
  }

  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callback) {
    this.fetchAll(homes => {  // renamed parameter to 'homes' to avoid confusion
      const homeFound = homes.find(home => home.id === homeId);
      callback(homeFound);     // call the callback here
    });
  }
};
