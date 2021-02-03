const mongoose = require("mongoose");

//Database Table
const postCategory = require("../model/postCategory");

exports.addPostCategory = async (req, res) => {
  const { item, description } = req.body;
  if (!item || !description) {
    return res.json({
      message: "Please Add Item And Description",
      isSuccess: false,
    });
  }
  let postCategories = new postCategory({
    item: item,
    description: description,
  });
  const savePost = await postCategories.save();
  if (savePost) {
    return res.json({ message: "Post Category Saved", isSuccess: true });
  }
};
