const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 30,
  },
  phone: {
    type: String,
    required: true,
    max: 10,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  role: {
    type: String,
    default: "client", //Bidder Or Admin
  },
  bankId: {
    type: String,
  },
  referalCode: {
    type: String,
    required: true,
  },
  address: {
    state: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    PINcode: {
      type: String,
      default: null,
    },
    area: {
      type: String,
      default: null,
    },
    landmark: {
      type: String,
      default: null,
    },
  },
  profile: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: "N",
  },
  createdBy: {
    type: String,
    default: null,
  },
  updatedBy: {
    type: String,
    default: null,
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

module.exports = mongoose.model("User", userSchema);
