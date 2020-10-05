const mongoose = require("mongoose");

//Database table
const User = require("../model/user");
const Post = require("../model/post");
const Bids = require("../model/bids");

exports.allPosts = async (req, res) => {
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
