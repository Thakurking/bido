const mongoose = require("mongoose");

//Database table
const Post = require("../../model/post");

//#region interior Design module for createPost controller
module.exports = async (req, res) => {
  console.log(req.body);
  const { isFloor, isCeiling, notes, rooms } = req.body;
  const { location } = req.body;
  if (!isFloor) {
    return res.json({
      Error: "Please Select Above Fields",
      isSuccess: false,
    });
  }
  if (!isCeiling) {
    return res.json({ Error: "Please Select Above fields", isSuccess: false });
  }
  if (!location) {
    return res.json({ Error: "Please Enter Your Location", isSuccess: false });
  }
  if (!rooms) {
    return res.json({ Error: "Add Numbers Of Rooms", isSuccess: false });
  }
  if (typeof rooms != "number") {
    return res.json({ Error: "Rooms Must Be In Numeric", isSuccess: false });
  }
  const interiorDesign = {
    isFloor: isFloor,
    isCeiling: isCeiling,
    notes: notes,
    rooms: rooms,
    location: location,
  };
  const savePost = await Post.create({ interiorDesign, postedBy: _id });
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
