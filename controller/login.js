const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Database tables
const User = require("../model/user");

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
  const user = await User.findOne({ phone: phone });
  if (user) {
    if (obj !== null) {
      bcrypt.compare(password, obj.password, async (err, result) => {
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
        const payload = obj._id;
        const token = jwt.sign({ payload }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        const user = obj;
        user.password = "";
        return res.json({
          message: "Auth Successfull",
          isSuccess: true,
          user,
          token,
        });
      });
    }
  } else {
    return res.json({ Error: "User Not Found", isSuccess: false });
  }
};
