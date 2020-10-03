const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

/**
 * This bid schema stores all the bids by the bidders
 */
const bidSchema = new Schema({
  //This stores the post detail
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  //This stores the bidder detail
  bidder: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  //This stores the bid date when bidder bids
  bidDate: {
    type: String,
    default: moment().format("dddd, Do, MMMM, YYYY, h:mm:ss a"),
  },
  //This stores the status of the every bid whether it is accepted by the user or not
  status: {
    type: String,
    default: "N", // Y for approved and N for not responded
  },
  amount: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Bids", bidSchema);
