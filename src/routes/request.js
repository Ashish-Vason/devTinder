const requestRouter = require('express').Router();
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/ConnectionRequest');
const User = require('../models/User');

requestRouter.post(
  '/request/send/:status/:toUserId',
  userAuth,
  async (req, res) => {
    try {
      const user = req.user;
      let fromUserId = req.user._id;
      let status = req.params.status;
      let toUserId = req.params.toUserId;
      if (!user) {
        throw new Error('User is not authenticated!');
      }
      // if (fromUserId == toUserId) {
      //   throw new Error('User is not allowed to send the request to itself!');
      // }
      const existingUser = await User.findById({ _id: toUserId });
      if (!existingUser) {
        throw new Error('User does not exists!!!');
      }

      const samePendingRequest = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          { toUserId: fromUserId, fromUserId: toUserId },
        ],
      });
      if (samePendingRequest) {
        throw new Error('The Request already exists!!' + samePendingRequest);
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      await connectionRequest.save();
      res.json({
        message: `${
          status == 'ignored'
            ? `${req.user.firstName} ${status} the ${existingUser.firstName}`
            : `${req.user.firstName} is ${status} in ${existingUser.firstName}`
        }`,
        data: connectionRequest,
      });
    } catch (error) {
      res.status(400).send('Error: ' + error.message);
    }
  }
);

requestRouter.post(
  '/request/review/:status/:requestId',
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const allowedStatus = ['accepted', 'rejected'];
      if (!allowedStatus.includes(status)) {
        return res.status(404).json({
          message: 'Status Not allowed',
        });
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: 'interested',
      });

      if (!connectionRequest) {
        return res.status(404).json({
          message: 'Connection Request not found!!',
        });
      }
      connectionRequest.status = status;

      await connectionRequest.save();
      res.send(`connection request ${status} successfully!!`);
    } catch (error) {
      res.status(400).send('Error: ' + error.message);
    }
  }
);

module.exports = requestRouter;
