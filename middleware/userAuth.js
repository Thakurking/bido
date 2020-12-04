//JSON Web Token
const token = require("jsonwebtoken");
//Redis
const redis = require("redis");

//Redis Client Setup
const client = require("../helper/redis_helper");

module.exports = async (req, res, next) => {
  try {
    // const { jwt } = req.headers;
    // console.log(jwt);
    // if (!jwt) {
    //   return res.json({ Error: "Access Failed", isSuccess: false });
    // }
    const { user_id } = req.headers;
    if (!user_id) {
      return res.json({ message: "Access Denied", isSuccess: false });
    }
    const token = client.GET(`${user_id}`);
    if (token) {
      req.user = user_id;
      req.client = true;
      next();
    } else {
      return res.json({ message: "Not Authorized", isSuccess: false });
    }
    // const auth = jwt.replace("Bearer ", "");
    // token.verify(auth, process.env.SECRET_KEY, async (err, payload) => {
    //   if (err) {
    //     return res.json({ Error: "Authentication Failed", isSuccess: false });
    //   }
    //   if (payload.client && payload.user) {
    //     req.client = true;
    //     req.user = payload.user;
    //     next();
    //   } else {
    //     return res.json({ message: "Not Authorized", isSuccess: false });
    //   }
    // });
  } catch (error) {
    console.log(error);
  }
};
