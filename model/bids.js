const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bidSchema = new Schema({
  postId: {
    type: String,
    required: true,
  },
  bidder: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  bidDate: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Bids", bidSchema);
