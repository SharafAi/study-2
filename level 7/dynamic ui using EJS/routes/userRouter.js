//core modules
const path = require('path');



//external modules
const express = require('express');
const userRouter = express.Router();


//local modules
const rootDir = require('../utilities/pathUtil');
const { RergisterdHomes } = require('./hostRouter');


userRouter.get("/", (req, res, next) => {
  console.log(RergisterdHomes);
  res.sendFile(path.join(rootDir, 'views', 'home.html'));
});

module.exports = userRouter;