//core modules
const path = require('path');

//external modules
const express = require('express');
const hostRouter = express.Router();

//local modules
const rootDir = require('../utilities/pathUtil');

hostRouter.get("/add-home", (req, res, next) => {
  console.log(req.url, req.method)
  res.sendFile(path.join(rootDir, 'views', 'addHome.html'));
});

const RergisterdHomes = [];


hostRouter.post("/add-home", (req, res, next) => {
  console.log("home Rergistration successful for:", req.body, req.body.HouseName);
  RergisterdHomes.push({ housename: req.body.HouseName });
  res.sendFile(path.join(rootDir, 'views', 'homeadded.html'));
});

exports.hostRouter = hostRouter;
exports.RergisterdHomes = RergisterdHomes;
