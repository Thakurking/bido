const mongoose = require("mongoose");

//Database table
const Post = require("../model/post");

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
