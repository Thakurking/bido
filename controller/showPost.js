const mongoose = require("mongoose");

//Database Table
const Post = require("../model/post");

exports.showAllPost = async (req, res) => {
  if(!req.user){
    return res.json({ message: "Access Denied", isSuccess: false });
  }
  const { cat } = req.body;
  if (!cat) {
    return res.json({ message: "Category Not Selected", isSuccess: false });
  }
  if (cat == 1) {
    const catering = await Post.find({ category: 1 }).select(
      "catering postedOn status"
    );
    console.log(catering);
    if (catering) {
      return res.json({
        message: "Showing Post For Catering",
        isSuccess: true,
        catering: catering,
      });
    } else {
      return res.json({
        message: "Somethign Went Wrong Please Try Again",
        isSuccess: false,
      });
    }
  }
  if (cat == 2) {
    const shipping = await Post.find({ category: 2 }).select(
      "shipping postedOn status"
    );
    console.log(shipping);
    if (shipping) {
      return res.json({
        message: "Showing Post For Shipping",
        isSuccess: true,
        shipping: shipping,
      });
    } else {
      return res.json({
        message: "Something Went Wrong Please Try Again",
        isSuccess: false,
      });
    }
  }
  if (cat == 3) {
    const interiorDesign = await Post.find({ category: 3 }).select(
      "interiorDesign postedOn status"
    );
    console.log(interiorDesign);
    if (interiorDesign) {
      return res.json({
        message: "Showing Post For Interior Design",
        isSuccess: true,
        interiorDesign: interiorDesign,
      });
    } else {
      return res.json({
        message: "Somwthing Went Wrong Please Try Again",
        isSuccess: false,
      });
    }
  }
  if (cat == 4) {
    const construction = await Post.find({ category: 4 }).select(
      "construction postedOn status"
    );
    console.log(construction);
    if (construction) {
      return res.json({
        message: "Showing Post For Construction",
        isSuccess: true,
        construction: construction,
      });
    } else {
      return res.json({
        message: "Something Went Wrong Please Try Again",
        isSuccess: false,
      });
    }
  }
};
