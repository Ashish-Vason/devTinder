const express = require('express');
const User = require('../models/User');
const validateSignUp = require('../utils/validate');
const bcrypt = require('bcrypt');
const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
  // validate the data
  try {
    validateSignUp(req);
    let { firstName, lastName, email, password } = req.body;
    // convert the password into hash and then store in DB.
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    // to save in the database
    res.send('User Added Successfully!!');
  } catch (err) {
    res.status(400).send('Error in saving user!:' + err.message);
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid Credentials!!!');
    }
    const validatePassword = user.verifyPassword(password);

    if (validatePassword) {
      const token = await user.getJWT();
      res.cookie('token', token, {
        expires: new Date(Date.now() + 70 * 900000),
      });
      res.send('Login Successful...');
    } else {
      throw new Error('Invalid Credentials!!!');
    }
  } catch (error) {
    res.status(400).send('Unable to login!!!' + error.message);
  }
});

authRouter.post('/logout', (req, res) => {
  res.cookie('token', null, { expires: new Date(Date.now()) });
  res.send('Logout Successfully!!!');
});

module.exports = authRouter;
