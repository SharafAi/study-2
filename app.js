const http  = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
  process.exit(); // Exit after handling one request

});

const PORT = 3000;
server.listen(PORT,() => {
  console.log (`Server is running on http://localhost:${PORT}`)

});
