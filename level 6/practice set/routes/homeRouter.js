//core modules
const path = require("path");

//external modules
const express = require("express");
//local modules
const rootDir = require("../utilities/pathUtil");

const homeRouter = express.Router();

homeRouter.get("/", (req, res, next) => {
  console.log("handling  / for get", req.url, req.method);
  res.sendFile(path.join(rootDir, 'views', 'home.html'));
});

module.exports = homeRouter;