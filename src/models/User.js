const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 200,
      trim: true,
    },
    lastName: {
      type: String,
      minLength: 4,
      maxLength: 200,
      trim: true,
      minLength: 4,
      maxLength: 200,
    }, // String is shorthand for {type: String}
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 4,
      maxLength: 200,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Please enter a valid email', value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error('Please enter a strong password', value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      maxLength: 4,
    },
    gender: {
      type: String,
      minLength: 4,
      maxLength: 20,
      validate(value) {
        if (!['male', 'female', 'others'].includes(value)) {
          throw new Error('Invalid Gender');
        }
      },
    },
    photoURL: {
      type: String,
      minLength: 4,
      maxLength: 200,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error('The photoURL is not valid', value);
        }
      },
    },

    about: {
      type: String,
      default: 'About Section of the application user',
      minLength: 4,
      maxLength: 200,
    },
    skills: {
      type: [String],
      maxLength: 300,
    },
  },
  { timestamps: true }
);

// Modal is like a class where we can structure the userSchema.

const User = mongoose.model('User', userSchema);

module.exports = User;
