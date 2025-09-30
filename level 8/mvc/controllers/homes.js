const { RergisterdHomes } = require("../routes/hostRouter");
const Home = require("../models/home"); // import the class

exports.getaddHome = (req, res, next) => {
  res.render('addHome', { pageTitle: 'Add Home', currentPage: 'addHome' });
}

exports.postaddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoURL } = req.body;
  
  const home = new Home(houseName, price, location, rating, photoURL); // create instance
  home.save(); // call save on the instance

  res.render('homeadded', { pageTitle: 'Home added successfully', currentPage: 'homeadded' });
}

exports.gethomes = (req, res, next) => {
  const RergisterdHomes = Home.fetchAll(RergisterdHomes => res.render("home", {
    RergisterdHomes: RergisterdHomes,
    pageTitle: 'Airbnb Home',
    currentPage: 'home'
  })); 
  
}