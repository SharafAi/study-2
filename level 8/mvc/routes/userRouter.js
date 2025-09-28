//core modules
const path = require('path');

//external modules
const express = require('express');
const userRouter = express.Router();

const homesController = require("../controllers/homes")

userRouter.get("/",homesController.gethomes);

module.exports = userRouter;