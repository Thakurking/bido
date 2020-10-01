const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

module.exports = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ Error: "You Must Be Logged In", isSuccess: false });
    }
    const auth = token.replace("Bearer ", "");
    jwt.verify(auth, process.env.SECRET_KEY, async (err, payload) => {
      if (err) {
        return res.json({ Error: "You Must Be Logged In", isSuccess: false });
      }
      const { id } = payload;
      User.findOne({ _id: id }).then(async (userData) => {
        req.user = userData;
        next();
      });
    });
  } catch (error) {
    console.log(error);
  }
};
