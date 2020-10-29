const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//Database table
const User = require("../model/user");
const OTP = require("../model/otp");

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
  if (!req.user) {
    return res.json({ Error: "Access Denied", isSuccess: false });
  }
  const { address } = req.body;
  if (!address) {
    return res.json({ Error: "Please Provide Address", isSuccess: false });
  }
  const updateProfile = await User.findOneAndUpdate(
    { _id: req.user },
    { $set: { address: address } }
  );
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
  if (!req.user) {
    return res.json({ Error: "Access Denied", isSuccess: false });
  }
  const profile = req.file.filename;
  if (!profile) {
    return res.json({ Error: "Please Select Your Profile", isSuccess: false });
  }
  const update = await User.findOneAndUpdate(
    { _id: req.user },
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
  //userId will be removed by req.user after setting middleware
  const { password, cpassword } = req.body;
  if (req.user) {
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
                    message: "Your Password Changed Please Check Your Email",
                    isSuccess: true,
                  });
                }
              });
            }
          }
        });
      }
    });
  } else {
    const { email } = req.body;
    if (!email) {
      return res.json({ Error: "Please Enter Your Email", isSuccess: false });
    }
    const isUser = await User.findOne({ email: email });
    if (!isUser) {
      return res.json({
        Error: "User Not Registered SignUp First",
        isSuccess: false,
      });
    }
    const otpNUM = Math.floor(Math.random() * 10000 + 1);
    const otpOption = {
      from: process.env.user,
      to: email,
      subject: `Changed Password`,
      html: `<h1>New Password Request</h1>
          <br><a>Your OTP is ${otpNUM}</a>`,
    };
    transporter.sendMail(otpOption, async (err, info) => {
      if (!err && info !== null) {
        const otp = new OTP({
          user: email,
          otp: otpNUM,
          usedFor: "Password Change",
        });
        const saveOTP = await otp.save();
        if (saveOTP) {
          return res.json({
            message: "OTP Sent To Your Email",
            isSuccess: true,
          });
        } else {
          return res.json({
            Error: "Something Went Wrong Please Try Again",
            isSuccess: false,
          });
        }
      }
    });
  }
};
//#endregion

/**
 * @module changePasswordViaOTP
 * @param {String} otp - Takes OTP from the user
 * @param {String} password - Takes Password From User
 * @param {String} cpassword - Takes Same Password For Confirm
 */

//#region Controller For Change Password Via Email OTP
exports.changePasswordViaOTP = async (req, res) => {
  const { otp, password, cpassword } = req.body;
  if (!otp) {
    return res.json({ Error: "Please Enter Your OTP First", isSuccess: false });
  }
  if (password !== cpassword) {
    return res.json({ Error: "Please Enter Same Password", isSuccess: false });
  }
  const isOTP = await OTP.findOne({ otp: otp });
  if (isOTP) {
    bcrypt.genSalt(10, async (err, salt) => {
      if (!err && salt !== null) {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (!err && hash !== null) {
            const passUpdate = await User.findOneAndUpdate(
              { email: isOTP.user },
              { $set: { password: hash } }
            );
            const mailOption = {
              from: process.env.user,
              to: isOTP.user,
              subject: `Changed Password`,
              html: `<h1>New Password Request</h1>
                <br><a>Your new password is ${password}</a>`,
            };
            if (passUpdate) {
              transporter.sendMail(mailOption, async (err, info) => {
                if (!err && info !== null) {
                  return res.json({
                    message: "Your Password Changed Please Check Your Email",
                    isSuccess: true,
                  });
                }
              });
            }
          }
        });
      }
    });
  }
};
//#endregion
