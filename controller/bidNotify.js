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
  if (!req.user) {
    return res.json({ message: "Not Authorized", isSucccess: false });
  }
  const isBidder = await User.findOne({ _id: req.user });
  if (!isBidder) {
    return res.json({ message: "Not Authorized", isSucccess: false });
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
      message: "You Do Not Have Any Notification Yet",
      isSucccess: false,
    });
  }
};
//#endregion
