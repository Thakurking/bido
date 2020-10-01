const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  catering: {
    type: String,
    default: "catering",
  },
  shipping: {
    type: String,
    default: "shipping",
  },
  interiorDesign: {
    type: String,
    default: "interior design",
  },
  construction: {
    type: String,
    default: "construction",
  },
});

module.exports = mongoose.model("Category", categorySchema);