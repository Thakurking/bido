const mongoose = require("mongoose");
const redis = require("redis");

//Redis Setup
const client = require("../helper/redis_helper");

exports.deleteRedisAuth = async (req, res) => {
    try {
        const { user_id } = req.body;
        if (user_id) {
          client.DEL("user_id", (err, val) => {
            if (err) {
              console.log(err);
              return res.json({
                message: "Somethign Went Wrong",
                isSuccess: false,
              });
            }
            console.log(val);
            return res.json({ message: "Logout Successful", isSuccess: true });
          });
        } 
    } catch (error) {
        console.log(error)
        return res.json({ message: "Internal Server Error", isSuccess: false });
    }
};
