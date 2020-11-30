//Mongoose
const mongoose = require("mongoose");
//Redis
const redis = require("redis");
//Promises
const { promisify } = require("util");

//Database Table
const Post = require("../model/post");

//Redai Client Setup
const client = redis.createClient();
const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

exports.showAllPost = async (req, res) => {
  if (!req.user) {
    return res.json({ message: "Access failed", isSuccess: false });
  }
  const { cat } = req.query;
  if (!cat) {
    return res.json({ message: "Category Not Selected", isSuccess: false });
  }
  const reply = await GET_ASYNC(cat);
  if (reply) {
    return res.json({
      message: "using cached data",
      isSuccess: true,
      data: JSON.parse(reply),
    });
  }
  if (cat == 1) {
    const catering = await Post.find({ category: cat }).select(
      "catering postedOn status postedBy"
    );
    const saveResult = await SET_ASYNC(cat, JSON.stringify(catering), "EX", 3);
    console.log("new data cached", saveResult);
    if (catering) {
      return res.json({
        message: "Showing Post For Catering",
        isSuccess: true,
        data: catering,
      });
    } else {
      return res.json({
        message: "Somethign Went Wrong Please Try Again",
        isSuccess: false,
      });
    }
  }
  if (cat == 2) {
    const shipping = await Post.find({ category: cat }).select(
      "shipping postedOn status postedBy"
    );
    const saveResult = await SET_ASYNC(cat, JSON.stringify(shipping), "EX", 3);
    console.log("new data cached", saveResult);
    if (shipping) {
      return res.json({
        message: "Showing Post For Shipping",
        isSuccess: true,
        data: shipping,
      });
    } else {
      return res.json({
        message: "Something Went Wrong Please Try Again",
        isSuccess: false,
      });
    }
  }
  if (cat == 3) {
    const interiorDesign = await Post.find({ category: cat }).select(
      "interiorDesign postedOn status postedBy"
    );
    const saveResult = await SET_ASYNC(
      cat,
      JSON.stringify(interiorDesign),
      "EX",
      3
    );
    console.log("new data cached", saveResult);
    if (interiorDesign) {
      return res.json({
        message: "Showing Post For Interior Design",
        isSuccess: true,
        data: interiorDesign,
      });
    } else {
      return res.json({
        message: "Something Went Wrong Please Try Again",
        isSuccess: false,
      });
    }
  }
  if (cat == 4) {
    const construction = await Post.find({ category: cat }).select(
      "construction postedOn status postedBy"
    );
    const saveResult = await SET_ASYNC(
      cat,
      JSON.stringify(construction),
      "EX",
      3
    );
    console.log("new data cached", saveResult);
    if (construction) {
      return res.json({
        message: "Showing Post For Construction",
        isSuccess: true,
        data: construction,
      });
    } else {
      return res.json({
        message: "Something Went Wrong Please Try Again",
        isSuccess: false,
      });
    }
  }
};
