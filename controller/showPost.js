const mongoose = require("mongoose");

//Database table
const Post = require("../model/post");

/**
 * @module allPost
 * @param {string} posts - this outputs all post from post schema randomly
 */

//#region this controller shows all post randomly
exports.allPost = async (req, res) => {
  Post.count().exec(async (err, count) => {
    const random = Math.floor(Math.random() * count);
    Post.findOne({ status: "N" })
      .skip(random)
      .exec(async (err, result) => {
        return res.json({
          message: "fething all posts",
          isSuccess: true,
          posts: result,
        });
      });
  });
};
//#endregion
