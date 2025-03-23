const profileRouter = require('express').Router();
const { userAuth } = require('../middlewares/auth');

profileRouter.get('/profile/view', userAuth, async (req, res) => {
  try {
    let user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send('Something went wrong ' + error.message);
  }
});

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
  try {
    // const { age, skills, about, photoURL } = req.body;
    const allowedFields = ['age', 'skills', 'about', 'photoURL'];
    const isAllowedUpdate = Object.keys(req.body).every((key) =>
      allowedFields.includes(key)
    );
    if (!isAllowedUpdate) {
      throw new Error('This change is not allowed!!!');
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    loggedInUser.save();
    res.send("User's Profile Updated Successfully! " + loggedInUser);
  } catch (error) {
    res.status(400).send('Something went wrong' + error.message);
  }
});

module.exports = profileRouter;
