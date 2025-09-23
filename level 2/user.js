const fs = require("fs");
const constants = require("constants");

const userRequestHandler = (req, res) => {
  console.log(req.url, req.method); //removed because output was too long ,for learning purpose only

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title> mvcrate </title></head>");
    res.write("<body><h1> enter your details: </h1>"); //1
    res.write('<form action ="/submit-details" method="POST">'); //2
    res.write(
      '<input type="text" name="username" placeholder="enter your name"><br>'
    ); //3

    res.write('<label for="male"> male </label>'); //4
    res.write(
      '<input type="radio" id = "male" name= "gender" value = "male" />'
    ); //5
    res.write('<label for="female"> female </label>'); //6
    res.write(
      '<input type="radio" id = "female" name= "gender" value = "female" />'
    ); //7
    res.write('<br><input type="submit" value="submit">'); //8
    res.write("</form>");

    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (
    req.url.toLowerCase() === "/submit-details" &&
    req.method === "POST"
  ) {
    const body = [];
    req.on(`data`, (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);
      const params = new URLSearchParams(fullBody);

      const bodyObject = Object.fromEntries(params); //does the work easier
      console.log(bodyObject);
      fs.writeFileSync("user.txt", JSON.stringify(bodyObject));
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>mvcrate</title></head>");
  res.write("<body><h1>unbox maldives</h1></body>");
  res.write("</html>");
  return res.end();
};

module.exports = userRequestHandler; //exporting the function to be used in other files
