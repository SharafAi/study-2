
const Home = require("../models/home");
const Favourite = require("../models/favourites");


exports.getIndex = (req, res, next) => {
  console.log("session values:", req.session);
  Home.find().then(RergisterdHomes => {
    res.render("store/index", {
      RergisterdHomes: RergisterdHomes,
      pageTitle: "airbnb home",
      currentPage: "home",
      isLoggedIn: req.isLoggedIn
    });
  })
};

exports.getHomesList = (req, res, next) => {
  Home.find().then(RergisterdHomes => {
    res.render("store/home-list", {
      RergisterdHomes: RergisterdHomes,
      pageTitle: "Home list",
      currentPage: "Homelist",
      isLoggedIn: req.isLoggedIn
    });
  });
};

exports.getBookings = (req, res, next) => {
  Home.find().then(RergisterdHomes => {
    res.render("store/bookings", {
      RergisterdHomes: RergisterdHomes,
      pageTitle: "my bookings",
      currentPage: "booking",
      isLoggedIn: req.isLoggedIn
    });
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
    .populate('houseid')
    .then(favourites => {
      const FavouriteHomes = favourites.map(fav => fav.houseid);
      res.render("store/favourites", {
        FavouriteHomes: FavouriteHomes,
        pageTitle: "my favourites",
        currentPage: "favourites",
        isLoggedIn: req.isLoggedIn
      });
    });
};

exports.postFavouriteList = (req, res, next) => {
  const homeid = req.body.id;
  console.log("home id to be marked as favourite", homeid);
  Favourite.findOne({ houseid: homeid })
    .then(fav => {
      if (fav) {
        console.log("Already marked as favourite");
        return null; // nothing to save
      } else {
        const newFav = new Favourite({ houseid: homeid });
        return newFav.save().then(result => {
          console.log("Marked as favourite", result);
        });
      }
    })
    .catch(error => {
      console.log("Error while marking favourite", error);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};



exports.postRemoveFavourite = (req, res, next) => {
  const homeid = req.params.homeid;
  Favourite.findOneAndDelete({ houseid: homeid }).then(result => {
    console.log("removed from favourite", result);
  }).catch(error => {
    console.log("error while removing favourite", error);
  }).finally(() => {
    res.redirect("/favourites");
  })
};



exports.getHomeDetails = (req, res, next) => {
  const homeid = req.params.homeid;
  console.log("at homes details page", homeid);

  Home.findById(homeid).then(home => {
    if (!home) {
      return res.status(404).send("Home not found");
      res.redirect("/homes")
    } else {
      console.log("home details found", home);
      res.render("store/home-detail", {
        pageTitle: "home detail",
        currentPage: "Home",
        home: home,
        isLoggedIn: req.isLoggedIn
      });
    }
  });

};
