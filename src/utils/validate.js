const validator = require('validator');
const validateSignUp = (req) => {
  let { email, password, firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    throw new Error('Please Enter UserName');
  } else if (!validator.isEmail(email)) {
    throw new Error('Please Enter Valid Email Id.');
  } else if (!validator.isStrongPassword(password)) {
    throw new Error('Please Enter a Strong Password.');
  }
};

module.exports = validateSignUp;
