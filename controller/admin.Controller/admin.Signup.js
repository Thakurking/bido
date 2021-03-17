const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const User = require("../../model/user");

exports.admin_Signup_Request = async (req, res) => {
  const ID = req.query.GMAIL;
  const PASSWORD = req.query.PASSWORD;
  const SECRETKEY = req.query.SECRETKEY;
  const PHONE = req.query.PHONE;
  const NAME = req.query.NAME;
  if (!ID || !PASSWORD || !SECRETKEY || !PHONE || !NAME) {
    return res.send({
      Details: {
        ID: ID,
        PASSWORD: PASSWORD,
        SECRETKEY: SECRETKEY,
        PHONE: PHONE,
        NAME: NAME,
      },
      message: "Please Provide All The Details Above",
      isSuccess: false,
    });
  }
  if (PASSWORD !== process.env.PASSWORD) {
    return res.send({ error: "Wrong Password", isSuccess: false });
  }
  if (ID !== process.env.ID) {
    return res.send({ error: "Wrong ID", isSuccess: false });
  }
  if (SECRETKEY !== process.env.SECRETKEY) {
    return res.send({ error: "Wrong SecretKey", isSuccess: false });
  }
  if (PHONE !== process.env.PHONE) {
    return res.send({ error: "Wrong Phone", isSuccess: false });
  }
  if (NAME !== process.env.NAME) {
    return res.send({ error: "Wrong Name", isSuccess: false });
  }
  bcrypt.genSalt(10, async (err, salt) => {
    if (!err) {
      bcrypt.hash(PASSWORD, salt, async (err, hash) => {
        if (!err) {
          const user = new User({
            email: ID,
            password: PASSWORD,
            phone: PHONE,
            role: "admin",
            name: NAME,
            referalCode: uuidv4(),
          });
          const saveAdmin = await user.save();
          if (saveAdmin) {
            return res.send({
              message: "Admin Registered Successfuly",
              saveAdmin,
              LoginLink: "http://localhost:3000/admin/Login",
              isSuccess: true,
            });
          }
        }
      });
    }
  });
};
