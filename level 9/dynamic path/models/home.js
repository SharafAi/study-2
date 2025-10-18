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
    Home.fetchAll((RergisterdHomes) => {
      if (this.id) { //edit home case
        RergisterdHomes = RergisterdHomes.map(home =>
          home.id === this.id ? this : home)

      } else { //add home case
        this.id = Math.random().toString();
        RergisterdHomes.push(this);
      }

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
    this.fetchAll(homes => {
      const homeFound = homes.find(home => home.id === homeId);
      callback(homeFound);
    });
  }
};
