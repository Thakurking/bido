const mongoose = require("mongoose");

//Database table
const User = require("../model/user");
const Bids = require("../model/bids");
const Post = require("../model/post");

//#region Controller for bids accepted from clients
exports.acceptedBids = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.json({ Error: "Not Authorized", isSuccess: false });
  }
  const isUser = await User.findOne({ _id: userId });
  if (!isUser) {
    return res.json({ Error: "Please Signup First", isSuccess: false });
  }
  const allBids = await Bids.find({ bidder: userId, status: "Y" });
  const allPost = await Post.findOne({ status: "Y", bidder: userId });
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
    return res.json({ Error: "Something Went Wrong", isSuccess: false });
  }
};
//#endregion

//#region Controller for bids that have not accepted by any client
exports.ongoingBids = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.json({ Error: "Not Authorized", isSuccess: false });
  }
  const isUser = await User.findOne({ _id: userId });
  if (!isUser) {
    return res.json({ Error: "Please Signup First", isSuccess: false });
  }
  const allBids = await Bids.find({ bidder: userId, status: "N" });
  if (allBids) {
    return res.json({
      message: "Showing All Ongoing Bids",
      isSuccess: true,
      allBids,
      isUser,
    });
  } else {
    return res.json({ Error: "Something Went Wrong", isSuccess: false });
  }
};
//#endregion
