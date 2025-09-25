//external modules
const express = require('express');
const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  console.log(req.url, req.method)
  res.send(`  
    <h1>welcome to airbnb</h1>
    <a href="/add-home">add home</a>
    `)
})

module.exports = userRouter;