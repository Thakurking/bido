const mongoose = require("mongoose");

//Database table
const Post = require("../../model/post");

//#region shipping module for createPost controller
module.exports = async (req, res) => {
  if (!req.user) {
    return res.json({ Error: "Not Authorized", isSuccess: false });
  }
  const { weight, notes, size, prefVehicle, productDetail } = req.body;
  const { from } = req.body;
  console.log(from);
  const { to } = req.body;
  console.log(to);
  if (!from) {
    return res.json({
      Error: "Please Enter Pickup Location",
      isSuccess: false,
    });
  }
  if (!to) {
    return res.json({
      Error: "Please Enter Destination",
      isSuccess: false,
    });
  }
  if (!weight) {
    return res.json({
      Error: "Please Add Weight Of The Product",
      isSuccess: false,
    });
  }
  if (weight <= 1) {
    return res.json({
      Error: "Please Add More Than 1 KG Weight",
      isSuccess: false,
    });
  }
  if (isNaN(weight)) {
    return res.json({ Error: "Weight Should Be Number", isSuccess: false });
  }
  if (from.state === to.state && from.landmark === to.landmark) {
    return res.json({
      Error: "Cannot Enter Same landmark For Shipping",
      isSuccess: false,
    });
  }
  if (!notes) {
    return res.json({
      Error: "Please Add Notes About Your Product What You Wanted To Ship",
      isSuccess: false,
    });
  }
  if (!productDetail) {
    return res.json({
      Error: "Please Add The Shipping Product Detail",
      isSuccess: false,
    });
  }
  const shipping = {
    weight: weight,
    from: from,
    to: to,
    notes: notes,
    size: size,
    prefVehicle: prefVehicle,
    productDetail: productDetail,
    // photo: photo,
  };
  const savePost = await Post.create({
    shipping,
    postedBy: req.user,
    category: req.body.cat,
  });
  if (savePost) {
    return res.json({
      message: "Your Post Submited",
      isSuccess: true,
      savePost,
    });
  }
};
//#endregion
