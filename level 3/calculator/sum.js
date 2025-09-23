const sumRequestHandler = (req, res) => {
  console.log("1 . in sum request handler", req.url,);
  const body = [];
  let result;
  req.on("data", chunk => {
    body.push(chunk)
    console.log("2 . chunk came");
  });


  req.on("end", () => {
    console.log("3 . end event came");
    const bodyStr = Buffer.concat(body).toString();
    const params = new URLSearchParams(bodyStr);
    const bodyObj = Object.fromEntries(params);
    result = Number(bodyObj.first) + Number(bodyObj.second);
    console.log(result);
  })


  console.log("4 . sending the response");
  res.setHeader("Content-Type", "text/html");
  res.write(`
   <html>
   <head><title> practice set </title></head>
   <body><h1> your result is ${result}</h1>
   <a href="/"> go to home </a>
  </body>
  </html>`);
  return res.end();
}

exports.sumRequestHandler = sumRequestHandler;