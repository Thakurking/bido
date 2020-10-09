const mongoose = require("mongoose");

//Database table
const Post = require("../model/post");

/**
 * @module allPost
 * @param {String} posts - this outputs all post from post schema randomly
 */

//#region this controller shows all post randomly
exports.allPost = async (req, res) => {
  const showPosts = await Post.find({ status: "N" });
  console.log(showPosts);
};
//#endregion
