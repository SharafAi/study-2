
const Home = require("../models/home");
const User = require("../models/user");


exports.getIndex = (req, res, next) => {
  console.log("session values:", req.session);
  Home.find().then(RergisterdHomes => {
    res.render("store/index", {
      RergisterdHomes: RergisterdHomes,
      pageTitle: "airbnb home",
      currentPage: "home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  })
};

exports.getHomesList = (req, res, next) => {
  Home.find().then(RergisterdHomes => {
    res.render("store/home-list", {
      RergisterdHomes: RergisterdHomes,
      pageTitle: "Home list",
      currentPage: "Homelist",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getBookings = (req, res, next) => {
  Home.find().then(RergisterdHomes => {
    res.render("store/bookings", {
      RergisterdHomes: RergisterdHomes,
      pageTitle: "my bookings",
      currentPage: "booking",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getFavouriteList = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favourites');
  res.render("store/favourites", {
    FavouriteHomes: user.favourites,
    pageTitle: "my favourites",
    currentPage: "favourites",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.postFavouriteList = async (req, res, next) => {
  const homeid = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeid)) {
    user.favourites.push(homeid);
    await user.save();
  }
  res.redirect("/favourites");
}



exports.postRemoveFavourite = async (req, res, next) => {
  const homeid = req.params.homeid;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favourites.includes(homeid)) {
    user.favourites = user.favourites.filter(fav => fav != homeid);
    await user.save();
  }
  res.redirect("/favourites");

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
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    }
  });

};
