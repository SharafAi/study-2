// Core modules
const path = require('path');

// External modules
const express = require('express');
const session = require('express-session');
const mongoDbstore = require('connect-mongodb-session')(session);
const DB_PATH = "mongodb+srv://gundey0_db_user:shlmh@xayroindustries.d5xjgz9.mongodb.net/airbnb?retryWrites=true&w=majority&appName=XayroIndustries";

// Local modules
const authRouter = require('./routes/authRouter');
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
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


const store = new mongoDbstore({
  uri: DB_PATH,
  collection: 'sessions'
});

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Middleware to handle cookies and sessions
app.use(session({
  secret: "shlmh",
  resave: false,
  saveUninitialized: true,
  store: store
}));

// Middleware to set isLoggedIn based on session
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});


// Routers
app.use(authRouter);
app.use(storeRouter);

app.use((req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
}, hostRouter);

app.use("/host", hostRouter);
// Error handler
app.use(errorsController.PageNotFound);

// Database connection
const PORT = 3004;

mongoose.connect(DB_PATH).then(() => {
  console.log("Connected to MongoDB via Mongoose");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to MongoDB via Mongoose", err);
});