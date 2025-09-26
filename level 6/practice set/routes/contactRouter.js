//core modules
const path = require("path");

//external modules
const express = require("express");
//local modules
const rootDir = require("../utilities/pathUtil");

const contactRouter = express.Router();

contactRouter.get("/contact-us", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contact-us.html"));

});

contactRouter.post("/contact-us", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contact-success.html"));
});


module.exports = contactRouter;