// external modules
const express = require("express");
const router = express.Router();

// local controllers
const storeController = require("../controllers/storeController");

// 👉 define routes and connect to controller functions
router.get("/", storeController.getIndex);            // show all homes
router.get("/bookings", storeController.getBookings);
router.get("/favourites", storeController.getFavouriteList);
router.get("/home-list", storeController.getHomesList);
router.get("/home-detail/:homeId", storeController.getHomeDetails);
router.post("/favourites", storeController.postFavouriteList);
router.post("/favourites/delete/:homeid", storeController.postRemoveFavourite);




// export router
module.exports = router;