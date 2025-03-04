const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');
const connectDB = require('./config/database');
const User = require('./models/User');

const app = express();
const port = 7777;

app.post('/signup', async (req, res) => {
  const userData = {
    firstName: 'Ashish',
    lastName: 'Vason',
    email: 'ashish@gmail.com',
    password: 'abc123',
  };
  // creating new instance of userModal.
  const user = new User(userData);
  try {
    await user.save();
    // to save in the database
    res.send('User Added Successfully!!');
  } catch (err) {
    res.status(400).send('Error in saving user!:', err.message);
  }
});

connectDB()
  .then(() => {
    console.log('Database connected succesfully.');
    app.listen(port, () => console.log('Server is listening at port', port));
  })
  .catch((err) => {
    console.error('Error while connecting to Database.', err);
  });

// Always connects to DB before listening an request on server. It's right way to do that.
