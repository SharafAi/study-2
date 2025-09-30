const Home = require("../models/home"); // import class

exports.getaddHome = (req, res, next) => {
  res.render('addHome', { pageTitle: 'Add Home', currentPage: 'addHome' });
};

exports.postaddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoURL } = req.body;
  const home = new Home(houseName, price, location, rating, photoURL); // instance
  home.save(); // push to array

  res.render('homeadded', { pageTitle: 'Home added successfully', currentPage: 'homeadded' });
};

exports.gethomes = (req, res, next) => {
  Home.fetchAll((RergisterdHomes) =>
    res.render("home", {
      RergisterdHomes: RergisterdHomes,
      pageTitle: 'Airbnb Home',
      currentPage: 'home'
    })
  );
};
