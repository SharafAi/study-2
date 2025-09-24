const http = require("http");
const TestingSyntax = require('./syntax');
const runtime = require('./runtime');
const logical = require('./logical');


const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  //TestingSyntax();
  //runtime();
  logical();
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
