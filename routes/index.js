const express = require("express");
const router = express.Router();

const signupController = require("../controller/signup");
const loginController = require("../controller/login");
const postRouter = require("../controller/createPosts");

const isUser = require("../middleware/userAuth");
const photo = require("../middleware/multer");

router.post("/signup", signupController.signup);
router.post("/verifyOTP", signupController.verifyOTP);

router.post("/login", loginController.login);

router.post("/createPost", photo.upload.array("photo"), postRouter.createPost);
module.exports = router;
