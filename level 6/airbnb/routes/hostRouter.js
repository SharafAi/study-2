//core modules
const path = require('path');

//external modules
const express = require('express');
const hostRouter = express.Router();


hostRouter.get("/add-home", (req, res, next) => {
  console.log(req.url, req.method)
  res.sendFile(path.join(__dirname, '../views/addHome.html'));
});

hostRouter.post("/add-home", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(__dirname, '../views/homeadded.html'));
});


module.exports = hostRouter;

