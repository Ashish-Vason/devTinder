const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/ConnectionRequest');
const User = require('../models/User');
const USER_SAFE_DATA = [
  'firstName',
  'lastName',
  'age',
  'gender',
  'skills',
  'photoURL',
];

userRouter.get('/user/requests/received/view', userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: 'interested',
    }).populate('fromUserId', USER_SAFE_DATA);

    res.status(200).json({
      message: 'The data fetched successfully',
      data: connectionRequest,
    });
  } catch (error) {
    res.status(400).send('Error' + error.message);
  }
});

userRouter.get('/user/connections', userAuth, async (req, res) => {
  try {
    const connectedUsers = await ConnectionRequest.find({
      $or: [
        { fromUserId: req.user._id, status: 'accepted' },
        {
          toUserId: req.user._id,
          status: 'accepted',
        },
      ],
    })
      .populate('fromUserId', 'firstName lastName')
      .populate('toUserId', 'firstName lastName');

    const data = connectedUsers.map((user) => {
      if (user.fromUserId._id.toString() == req.user._id.toString()) {
        return user.toUserId;
      }
      return user.fromUserId;
    });
    if (!connectedUsers) {
      throw new Error('Connections Not found!');
    }
    res.json({ data });
  } catch (error) {
    res.status(400).json({
      message: 'Some Error occurred',
      error: error.message,
    });
  }
});

userRouter.get('/feed', userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;

    let skip = (page - 1) * limit;
    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });

    const hideFromUsers = new Set();
    connections.forEach((req) => {
      hideFromUsers.add(req.fromUserId.toString());
      hideFromUsers.add(req.toUserId.toString());
    });

    const feedUsers = await User.find({
      $and: [
        {
          _id: { $nin: Array.from(hideFromUsers) },
        },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.send(feedUsers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// feed API
// exclude the loggedin user.
// also excludes the user whose connection request is empty with that user.

module.exports = userRouter;
