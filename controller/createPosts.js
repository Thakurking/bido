const mongoose = require("mongoose");

//Database table
const Post = require("../model/post");

//Post component
const catering = require("../component/post/catering");
const shipping = require("../component/post/shipping");
const interiorDesign = require("../component/post/interiorDesign");
const construction = require("../component/post/construction");

/**
 * @module createPost
 * @param {string} cat - this take different category from user for post
 */

//#region create bid post from user
exports.createPost = async (req, res) => {
  // if(!req.user){
  //   return res.json({ message: "Access Denied", isSuccess: false });
  // }
  const cat = req.body.cat;
  console.log(cat);
  if (!cat) {
    return res.json({ message: "Category Not Selected", isSuccess: false });
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
