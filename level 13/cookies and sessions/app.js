// Core modules
const path = require('path');

// External modules
const express = require('express');

// Local modules
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');
const rootDir = require('./utilities/pathUtil');
const errorsController = require("./controllers/errors");
const { default: mongoose } = require('mongoose');

const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Allow Express to look for views in BOTH folders
app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "authentication")
]);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Routers
app.use(storeRouter);
app.use(hostRouter);
app.use(authRouter);
app.use("/admin", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }

});
app.use("/admin", hostRouter);
// Error handler
app.use(errorsController.PageNotFound);

// Database connection
const PORT = 3004;
const DB_PATH = "mongodb+srv://gundey0_db_user:shlmh@xayroindustries.d5xjgz9.mongodb.net/airbnb?retryWrites=true&w=majority&appName=XayroIndustries";

mongoose.connect(DB_PATH).then(() => {
  console.log("Connected to MongoDB via Mongoose");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to MongoDB via Mongoose", err);
});