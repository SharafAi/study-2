//external modules
const express = require('express');

//local modules
const userRouter = require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');


const app = express();

app.use(express.urlencoded());
app.use(userRouter);
app.use(hostRouter);








const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
