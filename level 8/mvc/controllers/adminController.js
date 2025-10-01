const Home = require("../models/home"); // Home = class

exports.getaddHome = (req, res, next) => {
  res.render('admin/addHome', { pageTitle: 'Add Home', currentPage: 'addHome' });
};


exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((RergisterdHomes) => {
    res.render("admin/admin-home-list", {
      RergisterdHomes: RergisterdHomes, //corected
      pageTitle: "host-home-list",
      currentPage: "host-homes"
    });
  });
};


exports.postaddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoURL } = req.body;

  const home = new Home(houseName, price, location, rating, photoURL); // ✅ lowercase: instance
  home.save(); // ✅ save instance to file

  res.render('admin/homeadded', { pageTitle: 'Home added successfully', currentPage: 'homeadded' });
};
