//core modules
const path = require('path');



//external modules
const express = require('express');
const userRouter = express.Router();


//local modules
const { RergisterdHomes } = require('./hostRouter');


userRouter.get("/", (req, res, next) => {
  console.log(RergisterdHomes);
  res.render("home", { RergisterdHomes: RergisterdHomes, pageTitle: 'airbnb home',currentPage:'home' });//even if RergisterdHomes is mentioned one time like {RergisterdHomes} is also fine ,its the shortcut
});

module.exports = userRouter;