const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const notifySchema = new Schema({
  categoryName: {
    type: String,
    default: null,
  },
  clientName: {
    type: String,
    default: null,
  },
  clientEmail: {
    type: String,
    default: null,
  },
  clientPhone: {
    type: String,
    default: null,
  },
  amount: {
    type: String,
    default: null,
  },
  time: {
    type: String,
    default: moment().format("dddd, Do, MMMM, YYYY, h:mm:ss a"),
  },
  bidder: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("BidNotify", notifySchema);
