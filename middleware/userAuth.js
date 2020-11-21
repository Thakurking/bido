const token = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const { jwt } = req.headers;
    if (!jwt) {
      return res.json({ Error: "Access Failed", isSuccess: false });
    }
    const auth = jwt.replace("Bearer ", "");
    token.verify(auth, process.env.SECRET_KEY, async (err, payload) => {
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
