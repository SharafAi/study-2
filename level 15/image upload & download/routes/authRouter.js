// external modules
const express = require("express");
const authRouter = express.Router();

// local controllers
const authController = require("../controllers/authController");

// define routes and connect to controller functions
authRouter.get("/signup", authController.getSignup);   
authRouter.post("/signup", authController.postSignup);  
authRouter.get("/login", authController.getLogin);   
authRouter.post("/login", authController.postLogin);     
authRouter.post("/logout", authController.getLogout);   



// export router
module.exports = authRouter;
