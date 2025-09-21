const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/home") {
    res.write("<h1> welcome to mvcrate. unbox maldives</h1>");
    return res.end();
  } else if (req.url === "/men") {
    res.write("<h1> welcome gentlemen </h1>");
    return res.end();
  } else if (req.url === "/women") {
    res.write("welcome ladies");
    return res.end();
  } else if (req.url === "/kids") {
    res.write("welcome kids");
    return res.end();
  } else if (req.url === "/cart") {
    res.write("welcome to your cart");
    return res.end();
  }

  res.write(`
    <html lang="en">
<head>
  <title>mvcrate</title>
</head>

<body>
  <head>
    <nav>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/men">men</a></li>
        <li><a href="/women">women</a></li>
        <li><a href="/kids">kids</a></li>
        <li><a href="/cart">cart</a></li>
      </ul>
    </nav>
  </head>
</body>
</html>
  `);
  res.end();
});

server.listen(3000, () => {
  console.log("Server is running on addresss http://localhost:3000");
});
