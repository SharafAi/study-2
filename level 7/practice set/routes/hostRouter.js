//core modules
const path = require('path');

//external modules
const express = require('express');
const hostRouter = express.Router();

//local modules
const rootDir = require('../utilities/pathUtil');

hostRouter.get("/add-home", (req, res, next) => {
  console.log(req.url, req.method)
  res.render('addHome', { pageTitle: 'add home',currentPage:'addHome' });
});

const RergisterdHomes = [];


hostRouter.post("/add-home", (req, res, next) => {
  console.log("home Rergistration successful for:", req.body);
  RergisterdHomes.push(req.body);
  res.render('homeadded', { pageTitle: 'home added successfully',currentPage:'homeadded' });
});

exports.hostRouter = hostRouter;
exports.RergisterdHomes = RergisterdHomes;
