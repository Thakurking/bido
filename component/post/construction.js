const mongoose = require("mongoose");

//Database table
const Post = require("../../model/post");

//#region construction module for createPost controller
module.exports = async (req, res) => {
  if (!req.user) {
    return res.json({ Error: "Not Authorized", isSuccess: false });
  }
  const { noOfRooms, noOfHall, noOfKitchen, noOfBathroom, landArea } = req.body;
  const { location } = req.body;
  if (!noOfRooms || !noOfHall || !noOfKitchen || !noOfBathroom || !landArea) {
    return res.json({ Error: "Please Provide All Details", isSuccess: false });
  }
  if (typeof noOfBathroom != "number") {
    return res.json({
      Error: "Bathroom should be in numbers",
      isSuccess: false,
    });
  }
  if (typeof noOfKitchen != "number") {
    return res.json({
      Error: "Kitchen should be in numbers",
      isSuccess: false,
    });
  }
  if (typeof noOfHall != "number") {
    return res.json({
      Error: "Hall should be in numbers",
      isSuccess: false,
    });
  }
  if (typeof landArea != "number") {
    return res.json({
      Error: "Property area should be in numbers",
      isSuccess: false,
    });
  }
  if (!location.state || !location.district || !location.city) {
    return res.json({ Error: "Please add location", isSuccess: false });
  }
  const construction = {
    noOfBathroom: noOfBathroom,
    noOfHall: noOfHall,
    noOfKitchen: noOfKitchen,
    noOfRooms: noOfRooms,
    landArea: landArea,
    location: location,
  };
  const savePost = await Post.create({
    construction,
    postedBy: req.user,
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
