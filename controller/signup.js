const mongoose = require("mongoose");
const validator = require("validator");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const ip = require("ip");

//Database tables
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
 *@module signup
 * @param {string} name - this takes name from user
 * @param {string} phone - this takes user phone number
 * @param {string} email - this takes user email
 * @param {string} password - this takes user password
 * @param {string} cpassword - this takes user cofirmed password
 */

//#region User Signup router
exports.signup = async (req, res) => {
  const { name, phone, email, password, cpassword } = req.body;
  if (!name || !email || !phone || !password || !cpassword) {
    return res.json({
      message: "Please Provide All The Details",
      isSuccess: false,
    });
  }
  if (!validator.isMobilePhone(phone)) {
    return res.json({
      message: "Please Enter Valid Phone Number",
      isSuccess: false,
    });
  }
  if (!validator.isEmail(email)) {
    return res.json({ message: "Please Enter Valid Email", isSuccess: false });
  }
  if (
    !validator.matches(
      password,
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/
    )
  ) {
    return res.json({
      message: "Password must contain a uppercse, digit, lowercase",
      isSuccess: false,
    });
  }
  if (!validator.matches(password, cpassword)) {
    return res.json({
      message: "Password Does Not Match Please Enter Same Password",
      isSuccess: false,
    });
  }
  const isPhoneExist = await User.findOne({ phone: phone });
  if (isPhoneExist) {
    if(isPhoneExist.status== "N"){
      return res.json({
        message: "Compleate Your OTP Verification",
        isOTP: false,
        user: isPhoneExist._id,
        isSuccess: true,
      });
    }
    return res.json({
      message: "User Already Exist Please Try With Another Phone Number",
      isSuccess: false,
    });
  }
  const isEmailExist = await User.findOne({ email: email });
  if (isEmailExist) {
    if(isEmailExist.status == "N"){
      return res.json({
        message: "Compleate Your OTP Verification",
        isOTP: false,
        user: isEmailExist._id,
        isSuccess: true,
      });
    }
    return res.json({
      message: "User Already Exist Please Try With Another Email",
      isSuccess: false,
    });
  }
  const otpNum = Math.floor(Math.random() * 10000 + 1);
  const mailoption = {
    from: process.env.user,
    to: email,
    subject: `Bido Account Verification`,
    html: `<h1>Account Verification</h1><br><hr>
            <br><a>Your OTP is: ${otpNum}</a>`,
  };
  transporter.sendMail(mailoption, async (err, info) => {
    console.log(err);
    console.log(info);
    if (!err && info !== null) {
      bcrypt.genSalt(10, async (err, salt) => {
        console.log(err);
        console.log(salt);
        if (!err) {
          bcrypt.hash(password, salt, async (err, hash) => {
            console.log(hash);
            console.log(err);
            if (!err) {
              const user = new User({
                email: email,
                password: hash,
                phone: phone,
                name: name,
                createdBy: req.ip,
                updatedBy: req.ip,
                role: "client",
                referalCode: uuidv4(),
              });
              const saveUser = await user.save();
              console.log(saveUser);
              const otp = new OTP({
                user: saveUser._id,
                otp: otpNum,
                usedFor: "account activation",
              });
              const saveOTP = await otp.save();
              console.log(saveOTP);
              if (saveOTP && saveUser) {
                return res.json({
                  message: "OTP sent to your email plese verify",
                  isSuccess: true,
                  user: saveUser._id,
                  client: saveUser,
                  isOTP: true,
                });
              } else {
                return res.json({
                  message: "Failed To Save OTP Please Try Again",
                  isSuccess: false,
                });
              }
            }
          });
        }
      });
    } else {
      return res.json({
        message: "Cound Not Send OTP PLease Try Again",
        isSuccess: false,
      });
    }
  });
};
//#endregion

/**
 *@module verifyOTP
 * @param {string} otp - this takes otp from the user
 * @param {string} userId - this takes user id
 */

//#region OTP Verification router
exports.verifyOTP = async (req, res) => {
  const { otp, userId } = req.body;
  if (!otp) {
    return res.json({ message: "Please Enter OTP", isSuccess: false });
  }
  const isOTP = await OTP.findOne({ user: userId, otp: otp });
  if (isOTP) {
    if (isOTP.status == 1) {
      const updateOTP = await OTP.updateOne(
        { user: userId, otp: otp },
        { $set: { status: 2 } }
      );
      const updateUser = await User.updateOne(
        { _id: userId },
        { $set: { status: "Y" } }
      );
      if (updateOTP && updateUser) {
        const user = await User.findOne({ _id: userId });
        if (user) {
          return res.json({
            message: "OTP verified successfully",
            isSuccess: true,
            user: user,
          });
        }
      }
    }
    if (isOTP.status == 2) {
      return res.json({ message: "OTP Already Verified", isSuccess: false });
    }
  }
  return res.json({ message: "Please Enter Valid OTP", isSuccess: false });
};
//#endregion
