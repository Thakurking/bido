const mongoose = require("mongoose");
const { findByIdAndUpdate, findOneAndUpdate } = require("../model/user");

//Database table
const User = require("../model/user");

/**
 * This update user address
 * @module updateAddress
 * @param {string} userId - takes user id from user
 * @param {String} address - takes user address
 */

//#region Controller for updating address
exports.updateAddress = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.json({ Error: "User Not Authorized", isSuccess: false });
  }
  if (!address) {
    return res.json({ Error: "Please Provide", isSuccess: false });
  }
  const updateProfile = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { address: address } }
  );
  console.log(updateProfile);
  if (updateProfile) {
    return res.json({
      message: "Your Address Updated",
      isSuccess: true,
      address,
    });
  } else {
    return res.json({ Error: "Something Went Wrong", isSuccess: false });
  }
};
//#endregion

/**
 * This updates user profile image
 * @module updateProfile
 * @param {string} userId - takes user id from user
 * @param {string} profile - takes profile image of user
 */
//#region Controller for updating update profile image
exports.updateProfile = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.json({ Error: "User Not Authorized", isSuccess: false });
  }
  const profile = req.file.filename;
  if (!profile) {
    return res.json({ Error: "Please Select Your Profile", isSuccess: false });
  }
  const profileUpdate = await findOneAndUpdate(
    { _id: userId },
    { $set: { profile: profile } }
  );
  if (profileUpdate) {
    return res.json({
      message: "Your Profile Image Uploaded",
      isSuccess: true,
    });
  }
};
//#endregion
