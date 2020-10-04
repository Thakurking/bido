const mongoose = require("mongoose");

//Database table
const User = require("../model/user");
const Post = require("../model/post");
const Bids = require("../model/bids");

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
  console.log(allBids);
  if (allBids) {
    return res.json({
      message: "Showing All Acepted Bids",
      isSuccess: true,
      allBids,
      isUser,
    });
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
      message: "Showing All Bids",
      isSuccess: true,
      allBids,
      isUser,
    });
  }
};
//#endregion
