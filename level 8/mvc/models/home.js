const fs = require('fs');
const path = require('path');
const rootDir = require('../utilities/pathUtil');

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

  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, 'data', 'homes.json');
    fs.readFile(homeDataPath, (err, data) => {
      console.log("file read:", err, data);
      callback(!err ? JSON.parse(data) : [])
    });
  }
}