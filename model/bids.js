const mongoose = require("mongoose");
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
    default: Date.now(),
  },
  //This stores the status of the every bid whether it is accepted by the user or not
  status: {
    type: String,
    default: "N", // Y for approved and N for nnot responded
  },
});

module.exports = mongoose.model("Bids", bidSchema);
