const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Admin = require("../../model/user");

exports.adminLogin = async (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    return res.json({
      message: "Please Provide Id And Password",
      isSuccess: false,
    });
  }
  const isAdmin = await Admin.findOne({ email: id });
  if (isAdmin) {
    bcrypt.compare(password, isAdmin.password, async (err, result) => {
      if (err || result !== true) {
        return res.json({
          message: "Wrong Id Or Password",
          isSuccess: false,
        });
      }
      const payload = {};
      payload.user = isAdmin._id;
      if (isAdmin.role === "admin") payload.admin = true;
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "8h",
      });
      const admin = isAdmin;
      admin.password = "";
      return res.json({
        message: "Login Successful 🚀",
        isSuccess: true,
        admin,
      });
    });
  }
};
