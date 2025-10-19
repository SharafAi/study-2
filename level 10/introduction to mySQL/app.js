//core modules
const path = require('path');

//external modules
const express = require('express');

//local modules
const storeRouter = require('./routes/storeRouter');
const hostRouter  = require('./routes/hostRouter');
const rootDir = require('./utilities/pathUtil');
const errorsController = require("./controllers/errors");
const db = require('./utilities/dataBaseUtil');

db.execute('SELECT * FROM homes')
  .then(([rows, feilds]) => {
    console.log("getting from DB", rows);
  })
  .catch(error => {
    console.log("error while reading home records", error);
})


const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, 'public')));



app.use(express.urlencoded());
app.use(storeRouter);
app.use(hostRouter);



app.use(errorsController.PageNotFound);

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
