// Core modules
const path = require('path');

// External modules
const express = require('express');
const session = require('express-session');
const mongoDbstore = require('connect-mongodb-session')(session);
const multer = require('multer');
const mongoose = require('mongoose');

// Local modules
const authRouter = require('./routes/authRouter');
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const errorsController = require("./controllers/errors");

const DB_PATH = "mongodb+srv://gundey0_db_user:shlmh@xayroindustries.d5xjgz9.mongodb.net/airbnb?retryWrites=true&w=majority&appName=XayroIndustries";

const app = express();
const store = new mongoDbstore({ uri: DB_PATH, collection: 'sessions' });

// Utility function for random strings
const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // ensure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = randomString(8) + '-' + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerOptions = {
 storage,fileFilter
};

// Multer middleware
app.use(multer(multerOptions).single('photo'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "authentication")
]);

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


// Session middleware
app.use(session({
  secret: "shlmh",
  resave: false,
  saveUninitialized: true,
  store: store
}));

// Set isLoggedIn flag for views
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

// 404 error handler
app.use(errorsController.PageNotFound);

// Database connection
const PORT = 3004;

mongoose.connect(DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB via Mongoose");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB via Mongoose", err);
  });