// external modules
const express = require("express");
const router = express.Router();

// local controllers
const homesController = require("../controllers/storeController");

// 👉 define routes and connect to controller functions
router.get("/", homesController.getIndex);            // show all homes
router.get("/bookings", homesController.getBookings); 
router.get("/favourites", homesController.getFavouriteList); 
router.get("/home-list", homesController.getHomesList); 

router.get("/home-detail/:homeId", homesController.getHomeDetails); 


// export router
module.exports = router;