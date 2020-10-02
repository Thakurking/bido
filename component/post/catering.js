const mongoose = require("mongoose");
const moment = require("moment");

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
    _id,
  } = req.body;
  if (
    !totalPeople ||
    !items ||
    !notes ||
    !waiters ||
    !catType ||
    !servDate ||
    !servTime ||
    !postedBy ||
    !_id
  ) {
    return res.json({
      Error: "Please Provide All The Details",
      isSuccess: false,
    });
  }
  if (!isNaN(totalPeople)) {
    return res.json({
      Error: "Number Of People Will Be In Number",
      isSuccess: false,
    });
  }
  const catering = {
    totalPeople: totalPeople,
    items: items,
    notes: notes,
    waiters: waiters,
    catType: catType,
    servDate: servDate,
    servTime: servTime,
    postedBy: _id,
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
