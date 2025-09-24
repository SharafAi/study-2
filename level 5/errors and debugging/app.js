//http can be done using express

//eternal modules
const express = require('express');

//local modules
const RequestHandler = require('./user');

const app = express();
app.use((req, res, next) => {
  console.log("came in first middileware ", req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log("came in second middileware ", req.url, req.method);
  res.send("<P>welcome to mvcrate - unbox maldives.</P>");
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
