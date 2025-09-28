//core modules
const path = require('path');

//external modules
const express = require('express');
const hostRouter = express.Router();

//local modules
const rootDir = require('../dynamic ui using EJS/utilities/pathUtil');

hostRouter.get("/add-home", (req, res, next) => {
  console.log(req.url, req.method)
  res.render('addHome', { pageTitle: 'add home' });
});

const RergisterdHomes = [];


hostRouter.post("/add-home", (req, res, next) => {
  console.log("home Rergistration successful for:", req.body, req.body.HouseName);
  RergisterdHomes.push({ housename: req.body.HouseName });
  res.render('homeadded', { pageTitle: 'home added successfully' });
});

exports.hostRouter = hostRouter;
exports.RergisterdHomes = RergisterdHomes;
