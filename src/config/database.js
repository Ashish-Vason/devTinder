const mongoose = require('mongoose');

// as mongoose.connect returns a promise. We'll be handling asynchronously.

const connectDB = async () => {
  await mongoose.connect(
    'mongodb+srv://ashishvason:mongodb@namastenode.mmrhz.mongodb.net/devtinder'
  );
};

module.exports = connectDB;
