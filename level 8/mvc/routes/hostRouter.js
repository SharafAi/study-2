//core modules
const path = require('path');

//external modules
const express = require('express');
const hostRouter = express.Router();

//local modules
const rootDir = require('../utilities/pathUtil');
const homesController = require("../controllers/homes")

hostRouter.get("/add-home",homesController.getaddHome);
hostRouter.post("/add-home", homesController.postaddHome);

exports.hostRouter = hostRouter;

