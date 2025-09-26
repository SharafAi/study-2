//core modules
const path = require('path');



//external modules
const express = require('express');

//local modules
const userRouter = require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');
const rootDir = require('./utilities/pathUtil');


const app = express();

app.use(express.urlencoded());
app.use(userRouter);
app.use(hostRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});


const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
