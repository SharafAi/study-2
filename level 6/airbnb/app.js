//external modules
const express = require('express');

//local modules
const userRouter = require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');


const app = express();

app.use(express.urlencoded());
app.use(userRouter);
app.use(hostRouter);

app.use((req, res, next) => {
  res.status(404).send('<h1>404! Your page not found on airbnb</h1>');
})



const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
