//Mongoose
const mongoose = require("mongoose");

//Database table
const Post = require("../model/post");
const User = require("../model/user");

/**
 * @module acceptedPost
 * @param {string} userId - this takes user id from user
 */

//#region Controller for post accepted bids from client
exports.acceptedPost = async (req, res) => {
  if (!req.user) {
    return res.json({ message: "User Not Authorized", isSuccess: false });
  }
  const isUser = await User.findOne({ _id: req.user });
  if (!isUser) {
    return res.json({ message: "Please Signup First", isSuccess: false });
  }
  const allPost = await Post.find({ postedBy: req.user, status: "Y" });
  if (allPost) {
    return res.json({
      message: "Showing All Accepted Posts",
      isSuccess: true,
      allPost,
      isUser,
    });
  }
};
//#endregion

/**
 *@module ongoingPost
 * @param {string} userId - this takes user id from user
 */

//#region Controller for onging bids that haven't accepted bids from client
exports.ongoingPost = async (req, res) => {
  if (!req.user) {
    return res.json({ message: "User Not Authorized", isSuccess: false });
  }
  const allPost = await Post.find({ postedBy: req.user, status: "N" });
  if (allPost) {
    return res.json({
      message: "Showing All Ongoing Posts",
      isSuccess: true,
      allPost,
    });
  }
};
//#endregion
