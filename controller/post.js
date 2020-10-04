const mongoose = require("mongoose");

//Database table
const Post = require("../model/post");
const User = require("../model/user");

//#region Controller for post accepted bids from client
exports.acceptedPost = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.json({ Error: "User Not Authorized", isSuccess: false });
  }
  const isUser = await User.findOne({ _id: userId });
  if (!isUser) {
    return res.json({ Error: "Please Signup First", isSuccess: false });
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

//#region Controller for onging bids that haven't accepted bids from client
exports.ongoingPost = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.json({ Error: "Not Authorized", isSuccess: false });
  }
  const isUser = await User.findOne({ _id: userId });
  if (!isUser) {
    return res.json({ Error: "please Signup First", isSuccess: false });
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
