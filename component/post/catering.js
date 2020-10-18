const mongoose = require("mongoose");
const moment = require("moment");

//Database table
const Post = require("../../model/post");
const User = require("../../model/user");

//#region catering module for createPost controller
module.exports = async (req, res) => {
  //userId will going to be removed by the req.user when the middleware will going to setup
  const { userId } = req.body;
  if (!userId) {
    return res.json({ Error: "Not Authorized", isSuccess: false });
  }
  const {
    totalPeople,
    items,
    notes,
    servDate,
    servTime,
    waiters,
    catType,
  } = req.body;
  const { location } = req.body;
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
  if (!location) {
    return res.json({ Error: "Please Enter Your Address", isSuccess: false });
  }
  if (typeof totalPeople !== "number") {
    return res.json({
      Error: "Number Of People Will Be In Number",
      isSuccess: false,
    });
  }
  const isStatus = await User.findOne({ _id: postedBy });
  if (!isStatus.address) {
    return res.json({
      Error: "Please AddAddress And Update Your Profile First",
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
    location: location,
  };
  const savePost = await Post.create({
    catering,
    postedBy: userId,
    category: req.body.cat,
  });
  console.log(savePost);
  if (savePost) {
    return res.json({
      message: "Your Post Submited",
      isSuccess: true,
      savePost,
    });
  }
};
//#endregion
