//core modules
const path = require("path");

//external modules
const express = require("express");
//local modules
const rootDir = require("./utilities/pathUtil");


//local modules
const homeRouter = require("./routes/homeRouter");
const contactRouter = require("./routes/contactRouter");

const app = express();

app.use(homeRouter);
app.use(contactRouter);

app.use((req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "404.html"));
});


const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
