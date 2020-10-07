const mongoose = require("mongoose");

//Database table
const User = require("../model/user");
const BidNotify = require("../model/bidNotification");

/**
 *@module bidNotify
 * @param {string} bidder - takes bidder _id from user schema
 */

//#region Controller for giving notification when clients accepts there bids
exports.bidNotify = async (req, res) => {
  /**
   * bidder will be removed by req.user from the middleware
   * for getting the current user to find notification and show him/her
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
      Error: "You Do Not Have Any Notification Yet",
      isSucccess: false,
    });
  }
};
