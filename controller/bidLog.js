const mongoose = require("mongoose");

//Database table
const User = require("../model/user");
const Bids = require("../model/bids");
const Post = require("../model/post");

/**
 * @module acceptedBids
 * @param {string} userId - takes user id from user
 */

//#region Controller for bids accepted from clients
exports.acceptedBids = async (req, res) => {
  if (!req.user) {
    return res.json({ message: "Not Authorized", isSuccess: false });
  }
  const allBids = await Bids.find({ bidder: req.user, status: "Y" });
  const allPost = await Post.findOne({ status: "Y", bidder: req.user });
  console.log(allPost);
  console.log(allBids && allPost);
  if (allBids) {
    return res.json({
      message: "Showing All Acepted Bids",
      isSuccess: true,
      allBids,
      allPost,
      isUser,
    });
  } else {
    return res.json({ message: "Something Went Wrong", isSuccess: false });
  }
};
//#endregion

/**
 *@module ongoingBids
 * @param {string} userId - takes user id from user
 */

//#region Controller for bids that have not accepted by any client
exports.ongoingBids = async (req, res) => {
  if (!req.user) {
    return res.json({ message: "Not Authorized", isSuccess: false });
  }
  const isUser = await User.findOne({ _id: req.user });
  if (!isUser) {
    return res.json({ message: "Please Signup First", isSuccess: false });
  }
  const allBids = await Bids.find({ bidder: req.user, status: "N" });
  if (allBids) {
    return res.json({
      message: "Showing All Ongoing Bids",
      isSuccess: true,
      allBids,
      isUser,
    });
  } else {
    return res.json({ message: "Something Went Wrong", isSuccess: false });
  }
};
//#endregion
