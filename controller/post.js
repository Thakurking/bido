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
  //userId will be removed by req.user after setting up middleware
  const { userId } = req.body;
  if (!userId) {
    return res.json({ message: "User Not Authorized", isSuccess: false });
  }
  const isUser = await User.findOne({ _id: userId });
  if (!isUser) {
    return res.json({ message: "Please Signup First", isSuccess: false });
  }
  const allPost = await Post.find({ postedBy: userId, status: "Y" });
  console.log(allPost);
  if (allPost) {
    return res.json({
      message: "Showing Data Of Posts",
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
  //userId will be removed by req.user after settingup middleware
  const { userId } = req.body;
  if (!userId) {
    return res.json({ message: "Not Authorized", isSuccess: false });
  }
  const isUser = await User.findOne({ _id: userId });
  if (!isUser) {
    return res.json({ message: "please Signup First", isSuccess: false });
  }
  const allPost = await Post.find({ postedBy: userId, status: "N" });
  console.log(allPost);
  if (allPost) {
    return res.json({
      message: "Showing All Posts",
      isSuccess: true,
      allPost,
      isUser,
    });
  }
};
//#endregion
