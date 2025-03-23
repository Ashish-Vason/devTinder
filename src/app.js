const express = require('express');
const { userAuth } = require('./middlewares/auth');
const connectDB = require('./config/database');
const User = require('./models/User');
const validateSignUp = require('./utils/validate');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');

const app = express();
const port = 7777;

app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);

connectDB()
  .then(() => {
    console.log('Database connected succesfully.');
    app.listen(port, () => console.log('Server is listening at port', port));
  })
  .catch((err) => {
    console.error('Error while connecting to Database.', err);
  });

// Always connects to DB before listening an request on server. It's right way to do that.
