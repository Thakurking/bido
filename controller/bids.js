const mongoose = require("mongoose");

//Databse table
const Bids = require("../model/bids");
const User = require("../model/user");
const Post = require("../model/post");
const BidNotify = require("../model/bidNotification");

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
  const isPostStatus = await Post.findOne({ _id: post });
  if (isPostStatus.status == "Y") {
    return res.json({
      Error: "Post Has Already Accepted Bids",
      isSuccess: false,
    });
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
      message: "Your Bid Submitted",
      isSuccess: true,
      savePost,
    });
  }
};
//#endregion

//#region Accept bid for client
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
  const isPostStatus = await Post.findOne({ _id: postId });
  if (isPostStatus.status == "Y") {
    return res.json({
      Error: "Post Has Already Accepted Bids",
      isSuccess: false,
    });
  }
  const bidUpdate = await Bids.updateOne(
    { _id: bidId },
    { $set: { status: "Y" } }
  );
  console.log(bidUpdate);
  const postUpdate = await Post.updateOne(
    { _id: postId },
    { $set: { status: "Y", bidder: bidUpdate.bidder } }
  );
  console.log(postUpdate);
  const bidderUpdate = await Post.updateOne(
    { _id: postId },
    { $set: { bidder: isBid.bidder } }
  );
  const client = await User.findOne({ _id: isPostStatus.postedBy });
  if (!client) {
    return res.json({ Error: "No User Found", isSuccess: false });
  }
  console.log(bidderUpdate);
  const bidNotify = await BidNotify.create({
    categoryName: isPostStatus.category,
    clientName: client.name,
    clientEmail: client.email,
    clientPhone: client.phone,
    amount: bidUpdate.amount,
    bidder: bidUpdate.bidder,
  });
  console.log(bidNotify);
  if (bidUpdate && postUpdate && bidderUpdate && bidNotify) {
    return res.json({
      message: "Bid Accepted Bidder Will Contact You Soon",
      isSuccess: true,
      bidUpdate,
      postUpdate,
    });
  }
};
//#endregion
