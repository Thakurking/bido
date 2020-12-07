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
            return res.json({ message: "Logout Successful 🚀", isSuccess: true });
          });
        } else{
            return res.json({
              message: "Something went wrong",
              isSuccess: false,
            });
        }
    } catch (error) {
        console.log(error)
        return res.json({ message: "Internal Server Error ❎", isSuccess: false });
    }
};
