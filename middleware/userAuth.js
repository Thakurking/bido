const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ Error: "Access Denied", isSuccess: false });
    }
    const auth = token.replace("Bearer ", "");
    jwt.verify(auth, process.env.SECRET_KEY, async (err, payload) => {
      if (err) {
        return res.json({ Error: "Authentication Failed", isSuccess: false });
      }
      if (payload.client && payload.user) {
        req.client = true;
        req.user = payload.user;
        next();
      } else {
        return res.json({ message: "Not Authorized", isSuccess: false });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
