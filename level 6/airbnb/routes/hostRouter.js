//external modules
const express = require('express');
const hostRouter = express.Router();


hostRouter.get("/add-home", (req, res, next) => {
  console.log(req.url, req.method)
  res.send(`
    <h1>rergister your home here:</h1>
    <form action ="/add-home" method = "POST">
      <input type="text" name="housename" placeholder=" home address"/>
      <input type="submit"/>
    </form>
    `)
})

hostRouter.post("/add-home", (req, res, next) => {
  console.log(req.body);
  res.send(`
    <h1>home rergisterd succesfully</h1>
    <a href="/">back to home</a>
    `)
})


module.exports = hostRouter;

