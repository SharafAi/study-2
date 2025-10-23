//core modules
const path = require('path');

//external modules
const express = require('express');

//local modules
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const rootDir = require('./utilities/pathUtil');
const errorsController = require("./controllers/errors");
const { default: mongoose } = require('mongoose');






const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, 'public')));



app.use(express.urlencoded());
app.use(storeRouter);
app.use(hostRouter);



app.use(errorsController.PageNotFound);

const PORT = 3004;
const DB_PATH = "mongodb+srv://gundey0_db_user:shlmh@xayroindustries.d5xjgz9.mongodb.net/airbnb?retryWrites=true&w=majority&appName=XayroIndustries";//have added the database name 'airbnb' at the end of the connection string after the .mongodb.net/ why? because we want to connect to that specific database

mongoose.connect(DB_PATH).then(() => {
  console.log("Connected to MongoDB via Mongoose");
   app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

 }).catch((err) => {
   console.error("Failed to connect to MongoDB via Mongoose", err);
 });

