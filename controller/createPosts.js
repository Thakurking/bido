const mongoose = require("mongoose");

//Database table
const Post = require("../model/post");

//Post component
const catering = require("../component/post/catering");
const shipping = require("../component/post/shipping");
const interiorDesign = require("../component/post/interiorDesign");
const construction = require("../component/post/construction");

//#region create bid post from user
exports.createPost = async (req, res) => {
  console.log("hello");
  const cat = req.body.cat;
  console.log(cat);
  if (!cat) {
    return res.json({ Error: "Category Not Selected", isSuccess: false });
  }
  if (cat == 1) {
    catering(req, res);
  }
  if (cat == 2) {
    shipping(req, res);
  }
  if (cat == 3) {
    interiorDesign(req, res);
  }
  if (cat == 4) {
    construction(req, res);
  }
};
//#endregion
