//Mongoose
const mongoose = require("mongoose");
//Redis
const redis = require("redis");
//Promises
const { promisify } = require("util");

//Database table
const Post = require("../model/post");
const User = require("../model/user");

//Redis Client Setup
const client = redis.createClient();
const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

/**
 * @module acceptedPost
 * @param {string} userId - this takes user id from user
 */

//#region Controller for post accepted bids from client
exports.acceptedPost = async (req, res) => {
  if (!req.user) {
    return res.json({ message: "User Not Authorized", isSuccess: false });
  }
  const reply = await GET_ASYNC("acceptedPost");
  if (reply) {
    return res.json({
      message: "using cached data",
      isSuccess: true,
      allPost: JSON.parse(reply),
    });
  }
  const isUser = await User.findOne({ _id: req.user });
  if (!isUser) {
    return res.json({ message: "Please Signup First", isSuccess: false });
  }
  const allPost = await Post.find({ postedBy: req.user, status: "Y" });
  const saveResult = await SET_ASYNC(
    "acceptedPost",
    JSON.stringify(allPost),
    "EX",
    60
  );
  console.log("new data cached", saveResult);
  if (allPost) {
    return res.json({
      message: "Showing Data Of Posts",
      isSuccess: true,
      allPost,
      isUser,
    });
  }
};
//#endregion

/**
 *@module ongoingPost
 * @param {string} userId - this takes user id from user
 */

//#region Controller for onging bids that haven't accepted bids from client
exports.ongoingPost = async (req, res) => {
  if (!req.user) {
    return res.json({ message: "User Not Authorized", isSuccess: false });
  }
  const reply = await GET_ASYNC("ongoingPost");
  if (reply) {
    return res.json({
      message: "using cached data",
      isSuccess: true,
      allPost: JSON.parse(allPost),
    });
  }
  const allPost = await Post.find({ postedBy: req.user, status: "N" });
  const saveResult = await SET_ASYNC(
    "ongoingPost",
    JSON.stringify(allPost),
    "EX",
    60
  );
  console.log("using cached data", saveResult);
  if (allPost) {
    return res.json({
      message: "Showing All Posts",
      isSuccess: true,
      allPost,
    });
  }
};
//#endregion
