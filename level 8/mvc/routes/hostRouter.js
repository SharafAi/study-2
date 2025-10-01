// external modules
const express = require("express");
const hostRouter = express.Router();

// local modules
const hostController = require("../controllers/adminController");

// /admin/add-home → show form
hostRouter.get("/add-home", hostController.getaddHome);

// /admin/add-home → handle form submit
hostRouter.post("/add-home", hostController.postaddHome);

hostRouter.get("/admin-home-list", hostController.getHostHomes)

module.exports = hostRouter;