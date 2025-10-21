
const Home = require("../models/home"); 
const Favourite = require("../models/favourites");


exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(RergisterdHomes => {
     res.render("store/index", {
      RergisterdHomes: RergisterdHomes, 
      pageTitle: "airbnb home",
      currentPage: "home"
    });
  })
};

exports.getHomesList = (req, res, next) => {
  Home.fetchAll().then(RergisterdHomes=> {
    res.render("store/home-list", {
      RergisterdHomes: RergisterdHomes,
      pageTitle: "Home list",
      currentPage: "Homelist"
    });
  });
};

exports.getBookings = (req, res, next) => {
  Home.fetchAll().then(RergisterdHomes => {
    res.render("store/bookings", {
      RergisterdHomes: RergisterdHomes,
      pageTitle: "my bookings",
      currentPage: "booking"
    });
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites(favourites => {
    Home.fetchAll().then(RergisterdHomes => {
      const FavouriteHomes = RergisterdHomes.filter(home =>
        favourites.includes(home.id))
      res.render("store/favourites", {
        FavouriteHomes: FavouriteHomes,
        pageTitle: "my favourites",
        currentPage: "favourites"
      })
    });
  })

};


exports.postFavouriteList = (req, res, next) => {
  Favourite.addToFavourite(req.body.id, error => {
    if (error) {
      console.log("error while marking favourite", error);
    }
    res.redirect("/favourites");
  })
}

exports.postRemoveFavourite = (req, res, next) => {
  const homeid = req.params.homeid;
  Favourite.deleteById(homeid, error => {
    if (error) {
      console.log("error while removing from favourite", error);
    }
    res.redirect("/favourites");
  })


 }
  


exports.getHomeDetails = (req, res, next) => {
  const homeid = req.params.homeid;
  console.log("at homes details page", homeid);

  Home.findById(homeid).then(([homes]) => {
    const home = homes[0];

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
