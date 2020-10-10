const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const otpSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  // email: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   default: null,
  // },
  otp: {
    type: Number,
    required: true,
  },
  usedFor: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("otp", otpSchema);
