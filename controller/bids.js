const mongoose = require("mongoose");

//Databse table
const Bids = require("../model/bids");
const User = require("../model/user");
const Post = require("../model/post");
const post = require("../model/post");

//#region Take Bids From Bidders
exports.bidsIn = async (req, res) => {
  const { post, bidder, amount } = req.body;
  if (!post || !bidder) {
    return res.json({
      Error: "User ID and Post Not Selected",
      isSuccess: false,
    });
  }
  if (!amount || typeof amount != "number") {
    return res.json({ Error: "Please Enter Your Bid Money", isSuccess: false });
  }
  const isUser = await User.findOne({ _id: bidder });
  if (!isUser) {
    return res.json({
      Error: "User Not Authrozied Please login First",
      isSuccess: false,
    });
  }
  const isSelf = await Post.findOne({ postedBy: bidder });
  if (isSelf) {
    return res.json({ Error: "Cannot Bid On Own Post", isSuccess: false });
  }
  const isSameBid = await Bids.findOne({ post: post, amount: amount });
  if (isSameBid) {
    return res.json({
      Error: "Cannot bid on the same post with same amount",
      isSuccess: false,
    });
  }
  const isPost = await Post.findOne({ _id: post });
  if (!isPost) {
    return res.json({ Error: "Post Not Authorized", isSuccess: false });
  }
  const savePost = await Bids.create({
    post: post,
    bidder: bidder,
    amount: amount,
  });
  console.log(savePost);
  if (savePost) {
    return res.json({
      message: "Thank You For Bidding",
      isSuccess: true,
      savePost,
    });
  }
};
//#endregion

//#region Accept bid from client
exports.acceptBids = async (req, res) => {
  const { bidId, postId } = req.body;
  if (!bidId) {
    return res.json({ Error: "Bid Not Authorized", isSuccess: false });
  }
  if (!postId) {
    return res.json({ Error: "Post Not Selected", isSuccess: false });
  }
  const isBid = await Bids.findOne({ _id: bidId });
  if (isBid.status == "Y") {
    return res.json({ Error: "Bid Already Accepted", isSuccess: false });
  }
  const bidUpdate = await Bids.updateOne(
    { _id: bidId },
    { $set: { status: "Y" } }
  );
  console.log(bidUpdate);
  const postUpdate = await Post.updateOne(
    { _id: postId },
    { $set: { status: "Y" } }
  );
  console.log(postUpdate);
  if (bidUpdate && postUpdate) {
    return res.json({
      message: "Bid Accepted Bidder Will Contact You Soon",
      isSuccess: true,
      bidUpdate,
    });
  }
};
//#endregion
