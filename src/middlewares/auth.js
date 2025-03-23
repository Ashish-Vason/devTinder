const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error('Token Not valid!!');
    }
    const decodedMessage = jwt.verify(token, 'Dev@Tinder$271');
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error('User Not exists!!');
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
};

module.exports = { userAuth };
