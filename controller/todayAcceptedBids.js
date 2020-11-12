const mongoose = require("mongoose");
const moment = require("moment");

//Database
const Bids = require("../model/bids");

//#region Showig Today's Accepted Bids
exports.todayBids = async (req, res) => {
  if (!req.user) {
    return res.json({ message: "Access Denied", isSuccess: false });
  }
  const showBids = await Bids.find({
    status: "Y",
    bidDate: moment().format("dddd, Do, MMMM, YYYY, h:mm:ss a"),
  });
  if (showBids.length > 0) {
    return res.json({
      message: "Showing Bids Today",
      isSuccess: true,
      bids: showBids,
    });
  }
  return res.json({ message: "No Bids Found Today", isSuccess: false });
};
//#endregion
