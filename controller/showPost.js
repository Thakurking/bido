//Mongoose
const mongoose = require("mongoose");

//Database Table
const Post = require("../model/post");

exports.showAllPost = async (req, res) => {
  console.log("hello")
  if (!req.user) {
    return res.json({ message: "Access failed", isSuccess: false });
  }
  const { cat } = req.query;
  if (!cat) {
    return res.json({ message: "Category Not Selected", isSuccess: false });
  }
  if (cat == 1) {
    const catering = await Post.find({ category: cat }).select(
      "catering postedOn status postedBy"
    );
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
