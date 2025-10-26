// Core modules
const path = require('path');

// External modules
const express = require('express');
const mongoose = require('mongoose');

// Local modules
const errorsController = require('./controllers/errors');


const DB_PATH = "mongodb+srv://gundey0_db_user:shlmh@xayroindustries.d5xjgz9.mongodb.net/ToDo?retryWrites=true&w=majority&appName=XayroIndustries";

const app = express();



// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));




// Routers
app.use(authRouter);
app.use(storeRouter);

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