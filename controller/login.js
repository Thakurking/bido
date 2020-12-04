const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis = require("redis");

//Database tables
const User = require("../model/user");

//Redis Setup
const client = require("../helper/redis_helper");

/**
 *@module login
 * @param {string} phone - this takes user phone number
 * @param {string} password - this takes password from user
 */

//#region Login router
exports.login = async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.json({
      message: "Please Provide All The Details",
      isSuccess: false,
    });
  }
  if (!validator.isMobilePhone(phone)) {
    return res.json({
      message: "Please Enter A Valid Mobile Number",
      isSuccess: false,
    });
  }
  const isUser = await User.findOne({ phone: phone });
  if (isUser) {
    bcrypt.compare(password, isUser.password, async (err, result) => {
      if (err) {
        return res.json({
          message: "Something went wrong please try again",
          isSuccess: false,
        });
      }
      if (result !== true) {
        return res.json({
          message: "Wrong Email Or Password Please Try Aain",
          isSuccess: false,
        });
      }
      const payload = {};
      payload.user = isUser._id;
      if (isUser.role === "client") payload.client = true;
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      const user_id = isUser._id;
      client.SET(`${user_id}`, `${token}`, "EX", 3600, (err, reply) => {
        if (err) {
          return res.json({ message: "Could Not Get Token", isSuccess: false });
        }
        const User = isUser;
        User.password = "";
        return res.json({
          message: "Login Successful",
          isSuccess: true,
          User,
          user_id: isUser._id,
        });
      });
    });
  } else {
    return res.json({ message: "User Not Found", isSuccess: false });
  }
};
//#endregion
