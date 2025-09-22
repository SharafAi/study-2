const http = require("http");
const RequestHandler = require("./user"); //require is used to import modules

const server = http.createServer(RequestHandler); //here we can call it request handler but in user.js we called it userRequestHandler. still it works because we are exporting the function in user.js??

const PORT = 3003;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
