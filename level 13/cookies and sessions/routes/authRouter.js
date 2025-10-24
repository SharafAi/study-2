// external modules
const express = require("express");
const authRouter = express.Router();

// local controllers
const authController = require("../controllers/authController");

// define routes and connect to controller functions
authRouter.get("/login", authController.getLogin);   
authRouter.post("/login", authController.postLogin);        



// export router
module.exports = authRouter;