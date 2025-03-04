const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: String, // String is shorthand for {type: String}
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

// Modal is like a class where we can structure the userSchema.

const User = mongoose.model('User', userSchema);

module.exports = User;
