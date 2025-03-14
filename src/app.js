const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');
const connectDB = require('./config/database');
const User = require('./models/User');

const app = express();
const port = 7777;

app.use(express.json());

app.get(
  '/userfeed',
  async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (error) {
      res.status(400).send('Something went wrong!!!');
    }
  }
  // const users = await User.find({});
  // res.send(users);
);

app.get('/userbyemail', async (req, res) => {
  try {
    const users = await User.find({ email: req.body.email });
    if (!users || users.length < 1) {
      res.status(404).send('User not found in db!');
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send('Something went wrong!!!');
  }
});

app.delete('/user', async (req, res) => {
  try {
    const userId = req.body.userId;
    await User.findByIdAndDelete(userId);
    res.send('User deleted successfully!!!');
  } catch (error) {
    res.status(400).send('Something went wrong!!');
  }
});

app.patch('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = req.body;
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: 'before',
      runValidators: true,
    });
    const ALLOWED_UPDATES = ['skills', 'about', 'photoURL', 'password', 'age'];
    const isAllowedUpdates = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (data.skills && data?.skills.length > 10) {
      throw new Error('skills should not be exceeded beyond 10!!');
    }

    if (!isAllowedUpdates) {
      throw new Error('Update not allowed for these fields!!');
    }

    res.send('User updated successfully for' + user);
  } catch (error) {
    res.status(400).send('Update Failed!!' + error);
  }
});

app.post('/signup', async (req, res) => {
  // creating new instance of userModal.
  const user = new User(req.body);
  try {
    await user.save();
    // to save in the database
    res.send('User Added Successfully!!');
  } catch (err) {
    res.status(400).send('Error in saving user!:' + err.message);
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
