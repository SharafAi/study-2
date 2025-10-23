const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next) => {
  console.log("first dummy middleware", req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log("second dummy middleware", req.url, req.method);
  next();
});

// app.use((req, res, next) => {
//   console.log("third dummy middleware", req.url, req.method);
//   res.send("<h1>Response from express server</h1>");
// });

app.get("/", (req, res, next) => {
  console.log("handling  / for get", req.url, req.method);
  res.send("<h1>welcome to mvcrate</h1>");
});

app.get("/contact-us", (req, res, next) => {
  console.log("handling  / contact-us", req.url, req.method);
  res.send(
    `<h1>please give you'r details here</h1>
    <form action ="/contact-us" method="POST">
      <input type="text" name="name" placeholder="enter your name"/>
      <input type="email" name="email" placeholder="enter your email"/>
      <input type="submit"/>
    </form>`
  );
});

app.post("/contact-us", (req, res, next) => {
  console.log("first handling", req.url, req.method, req.body);
  next();
});

app.use(bodyParser.urlencoded());

app.post("/contact-us", (req, res, next) => {
  console.log("handling  / contact-us for POST", req.url, req.method, req.body);
  res.send("<h1>Thanks for submitting your details. We will get back to you soon!</h1>");
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
