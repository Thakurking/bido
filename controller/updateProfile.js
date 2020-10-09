const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//Database table
const User = require("../model/user");

//Nodemailer
let transporter = nodemailer.createTransport({
  service: process.env.service,
  port: 80,
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

/**
 * This update user address
 * @module updateAddress
 * @param {string} userId - takes user id from user
 * @param {String} address - takes user address
 */

//#region Controller for updating address
exports.updateAddress = async (req, res) => {
  //userId will be removed by req.user after setting up middleware
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
 * @module profileUpdate
 * @param {string} userId - takes user id from user
 * @param {string} profile - takes profile image of user
 */
//#region Controller for updating update profile image
exports.profileUpdate = async (req, res) => {
  //userId will be removed by req.user after setting up middleware
  console.log("hello");
  const { userId } = req.body;
  if (!userId) {
    return res.json({ Error: "User Not Authorized", isSuccess: false });
  }
  const profile = req.file.filename;
  if (!profile) {
    return res.json({ Error: "Please Select Your Profile", isSuccess: false });
  }
  const update = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { profile: profile } }
  );
  if (update) {
    return res.json({
      message: "Your Profile Image Uploaded",
      isSuccess: true,
    });
  }
};
//#endregion

/**
 * @module changePassword
 * @param {String} userId - takes user id
 * @param {String} password - takes user password for change
 * @param {String} cpassword - takes same password for confirm
 */

//#region Change Password Controller
exports.changePassword = async (req, res) => {
  const { userId, password, cpassword } = req.body;
  if (!userId) {
    return res.json({ Error: "Not Authorized", isSuccess: false });
  }
  if (password !== cpassword) {
    return res.json({ Error: "Password Did Not Matched", isSuccess: false });
  }
  const userEmail = await User.findOne({ _id: userId });
  bcrypt.genSalt(10, async (err, salt) => {
    if (!err && salt !== null) {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (!err && hash !== null) {
          const passUpdate = await User.updateOne(
            { _id: userId },
            { $set: { password: hash } }
          );
          const mailOption = {
            from: process.env.user,
            to: userEmail.email,
            subject: `Changed Password`,
            html: `<h1>New Password Request</h1>
                  <br><a>Your new password is ${password}</a>`,
          };
          if (passUpdate) {
            transporter.sendMail(mailOption, async (err, info) => {
              if (!err && info !== null) {
                return res.json({
                  message: "Your Password Changed..Please Check Your Email",
                  isSuccess: true,
                  passUpdate,
                });
              }
            });
          }
        }
      });
    }
  });
};
//#endregion
