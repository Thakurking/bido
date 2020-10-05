const mongoose = require("mongoose");

//Database table
const User = require("../model/user");
const Post = require("../model/post");
const BidNotify = require("../model/bidNotification");

exports.bidNotify = async (req, res) => {
  /**
   * bidder will be removed by req.user from the middleware
   * for getting the current user to find his notification and show him/her
   */
  const { bidder } = req.body;
  if (!bidder) {
    return res.json({ Error: "Not Authorized", isSucccess: false });
  }
  const isBidder = await User.findOne({ _id: bidder });
  if (!isBidder) {
    return res.json({ Error: "Not Authorized", isSucccess: false });
  }
  const notification = await BidNotify.find({ bidder: bidder });
  if (notification.length > 0) {
    return res.json({
      message: "Showing All Notifications",
      isSucccess: true,
      notification,
    });
  } else {
    return res.json({
      Error: "You Do Not Have Bid Notification Yet",
      isSucccess: false,
    });
  }
};
