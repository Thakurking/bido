const mongoose = require("mongoose");

//Database table
const Post = require("../../model/post");

module.exports = async (req, res) => {
  const {
    totalPeople,
    items,
    notes,
    servDate,
    servTime,
    postedBy,
    waiters,
    catType,
  } = req.body;
  if (
    !totalPeople ||
    !items ||
    !notes ||
    !waiters ||
    !catType ||
    !servDate ||
    !servTime ||
    !postedBy
  ) {
    return res.json({
      Error: "Please Provide All The Details",
      isSuccess: false,
    });
  }
  const catering = {
    totalPeople: req.body.totalPeople,
    items: req.body.items,
    notes: req.body.notes,
    waiters: req.body.waiters,
    catType: req.body.catType,
    servDate: req.body.servDate,
    servTime: req.body.servTime,
    postedBy: req.body._id,
  };
  const savePost = await Post.create({ catering });
  console.log(savePost);
  if (savePost) {
    return res.json({
      message: "Your Post Submited",
      isSuccess: true,
      savePost,
    });
  }
};
