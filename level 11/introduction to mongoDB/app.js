//core modules
const path = require('path');

//external modules
const express = require('express');

//local modules
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const rootDir = require('./utilities/pathUtil');
const errorsController = require("./controllers/errors");
const { MongoConnect } = require('./utilities/dataBaseUtil');






const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, 'public')));



app.use(express.urlencoded());
app.use(storeRouter);
app.use(hostRouter);



app.use(errorsController.PageNotFound);

const PORT = 3004;
MongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})

