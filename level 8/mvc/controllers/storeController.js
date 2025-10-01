const Home = require("../models/home"); // import the class

// GET / → show all homes
exports.getIndex = (req, res, next) => {
  Home.fetchAll((RergisterdHomes) => {
    res.render("store/index", {
      RergisterdHomes: RergisterdHomes, //corected
      pageTitle: "airbnb home",
      currentPage: "home"
    });
  });
};

exports.getHomesList = (req, res, next) => {
  Home.fetchAll((RergisterdHomes) => {
    res.render("store/home-list", {
      RergisterdHomes: RergisterdHomes,
      pageTitle: "Home list",
      currentPage: "Homelist"
    });
  });
};

exports.getBookings = (req, res, next) => {
  Home.fetchAll((RergisterdHomes) => {
    res.render("store/bookings", {
      RergisterdHomes: RergisterdHomes,
      pageTitle: "my bookings",
      currentPage: "booking"
    });
  });
};

exports.getFavouriteList = (req, res, next) => {
  Home.fetchAll((RergisterdHomes) => {
    res.render("store/favourites", {
      RergisterdHomes: RergisterdHomes,
      pageTitle: "my favourites",
      currentPage: "favourites"
    });
  });
};

