const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Database tables
const User = require("../model/user");

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
      Error: "Please Provide All The Details",
      isSuccess: false,
    });
  }
  if (!validator.isMobilePhone(phone)) {
    return res.json({
      Error: "Please Enter A Valid Mobile Number",
      isSuccess: false,
    });
  }
  const isUser = await isUser.findOne({ phone: phone });
  if (isUser) {
    bcrypt.compare(password, isUser.password, async (err, result) => {
      if (err) {
        return res.json({
          Error: "Something went wrong please try again",
          isSuccess: false,
        });
      }
      if (result !== true) {
        return res.json({
          Error: "Wrong Email Or Password Please Try Aain",
          isSuccess: false,
        });
      }
      const payload = {};
      payload.user = isUser._id;
      if (isUser.role === "client") payload.client = true;
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      const User = isUser;
      User.password = "";
      return res.json({
        message: "Login Successful",
        isSuccess: true,
        User,
        token,
      });
    });
  } else {
    return res.json({ Error: "User Not Found", isSuccess: false });
  }
};
//#endregion
