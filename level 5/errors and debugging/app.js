//http can be done using express

//eternal modules
const express = require('express');



const app = express();
app.use("/", (req, res, next) => { ///try app.use, app.get, app.post
  console.log("came in first middileware ", req.url, req.method);
  //res.send("<P>came from first middleware.</P>");

  next();
});

app.use("/", (req, res, next) => {
  console.log("came in first middileware ", req.url, req.method);
  res.send("<P>came from another middleware.</P>");
});


app.use("/submit-details", (req, res, next) => {
  console.log("came in second middileware ", req.url, req.method);
  res.send("<P>welcome to mvcrate - unbox maldives.</P>");
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
