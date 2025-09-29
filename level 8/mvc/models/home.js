const fs = require('fs');
const path = require('path');
const rootDir = require('../utilities/pathUtil');

// fake database
const RergisterdHomes = [];

module.exports = class Home { // Capitalized class name
  constructor(houseName, price, location, rating, photoURL){
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoURL = photoURL;
  }
  
  save() {
    RergisterdHomes.push(this);
    const homeDataPath = path.join(rootDir, 'data', 'homes.json');
    fs.writeFile(homeDataPath, JSON.stringify(RergisterdHomes), error => {
      console.log("file writing concluded", error);
    })
  }

  static fetchAll() {
    return RergisterdHomes;
  }
}