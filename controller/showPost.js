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
    const status = {
      status: "N",
    };
    Post.find({})
      .skip(random, status)
      .exec(async (err, result) => {
        console.log(result);
        if (err) {
          return res.json({ Error: "Something Went Wrong", isSuccess: false });
        } else {
          return res.json({
            message: "Showing All Post",
            isSuccess: true,
            post: result,
          });
        }
      });
  });
};
//#endregion
