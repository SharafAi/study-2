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


exports.postFavouriteList = (req, res, next) => {
  console.log("came to add favourite", req.body);
  res.redirect("/favourites");
}

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("at homes details page", homeId);

  Home.findById(homeId, home => {

    if (!home) {
      return res.status(404).send("Home not found");
      res.redirect("/homes")
    } else {
      console.log("home details found", home);
      res.render("store/home-detail", {
        pageTitle: "home detail",
        currentPage: "Home",
        home: home // pass the found home to your template
      });
    }
  });

};
