const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

//Databse table
const Bids = require("../model/bids");
const User = require("../model/user");
const Post = require("../model/post");
const BidNotify = require("../model/bidNotification");

//Nodemailer
let transporter = nodemailer.createTransport({
  service: process.env.service,
  port: 80,
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

/**
 * @module bidsIn
 * @param {string} post - this takes post _id from post schema
 * @param {string} bidder - this takes bidder _id
 * @param {string} amount - this takes amount money for bidding
 */

//#region Take Bids From Bidders in clients posts
exports.bidsIn = async (req, res) => {
  if (!req.user) {
    return res.json({ message: "Access Denied", isSuccess: false });
  }
  const { postId, amount } = req.body;
  if (!postId) {
    return res.json({
      message: "Post Not Selected",
      isSuccess: false,
    });
  }
  if (!amount || typeof amount != "number") {
    return res.json({
      message: "Please Enter Your Bid Money",
      isSuccess: false,
    });
  }
  const isUser = await User.findOne({ _id: req.user });
  if (!isUser) {
    return res.json({
      message: "User Not Authrozied Please Signup First",
      isSuccess: false,
    });
  }
  const isSelf = await Post.findOne({ _id: postId, postedBy: req.user });
  console.log(isSelf);
  if (isSelf) {
    return res.json({ message: "Cannot Bid On Own Post", isSuccess: false });
  }
  const isPostStatus = await Post.findOne({ _id: postId });
  if (isPostStatus.status == "Y") {
    return res.json({
      message: "Post Has Already Accepted Bids",
      isSuccess: false,
    });
  }
  const isSameBid = await Bids.findOne({ post: postId, amount: amount });
  if (isSameBid) {
    return res.json({
      message: "Cannot bid on the same post with same amount",
      isSuccess: false,
    });
  }
  const isPost = await Post.findOne({ _id: postId });
  if (!isPost) {
    return res.json({ message: "Post Not Authorized", isSuccess: false });
  }
  const saveBids = await Bids.create({
    post: postId,
    bidder: req.user,
    amount: amount,
  });
  console.log(saveBids);
  if (saveBids) {
    return res.json({
      message: "Your Bid Submitted",
      isSuccess: true,
      saveBids,
    });
  }
};
//#endregion

/**
 * @module acceptBids
 * @param {string} bidsIn - this takes bid _id
 * @param {string} postId - this takes post _id
 */

//#region Accept bids from bidders for clients
exports.acceptBids = async (req, res) => {
  if (!req.user) {
    return res.json({ message: "Access Denied", isSuccess: false });
  }
  const { bidId, postId } = req.body;
  if (!bidId) {
    return res.json({ message: "Bid Not Authorized", isSuccess: false });
  }
  if (!postId) {
    return res.json({ message: "Post Not Selected", isSuccess: false });
  }
  const isBid = await Bids.findOne({ _id: bidId });
  if (isBid.status == "Y") {
    return res.json({ message: "Bid Already Accepted", isSuccess: false });
  }
  const isPostStatus = await Post.findOne({ _id: postId });
  if (isPostStatus.status == "Y") {
    return res.json({
      message: "You Has Already Accepted Bids",
      isSuccess: false,
    });
  }
  const bidUpdate = await Bids.updateOne(
    { _id: bidId },
    { $set: { status: "Y" } }
  );
  const postUpdate = await Post.updateOne(
    { _id: postId },
    { $set: { status: "Y", bidder: bidUpdate.bidder } }
  );
  // const bidderUpdate = await Post.updateOne(
  //   { _id: postId },
  //   { $set: { bidder: isBid.bidder } }
  // );
  const client = await User.findOne({ _id: isPostStatus.postedBy });
  if (!client) {
    return res.json({ message: "User Not Authorized", isSuccess: false });
  }
  const bidNotify = await BidNotify.create({
    categoryName: isPostStatus.category,
    clientName: client.name,
    clientEmail: client.email,
    clientPhone: client.phone,
    amount: isBid.amount,
    bidder: isBid.bidder,
  });
  console.log(bidNotify);
  const bidder = await User.findOne({ _id: isBid.bidder });
  console.log(bidder);
  const mailOption = {
    from: process.env.user,
    to: bidder.email,
    subject: `You Got A Bid Accepted......`,
    html: `<p>Your Client Name is: ${client.name}</p><br><hr>
            <br><p>Your Client Email is: ${client.email}</p><br><hr>
            <br><p>Your Client Phone is: ${client.phone}</p><br><hr>`,
  };
  if (bidUpdate && postUpdate && bidNotify) {
    transporter.sendMail(mailOption, async (err, info) => {
      if (!err && info !== null) {
        return res.json({
          message: "Bid Accepted Bidder Will Contact You Soon",
          isSuccess: true,
          bidUpdate,
          postUpdate,
        });
      }
    });
  } else {
    return res.json({ message: "Somethign Went Wrong", isSuccess: false });
  }
};
//#endregion
