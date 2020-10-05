const express = require("express");
const router = express.Router();

const signupController = require("../controller/signup");
const loginController = require("../controller/login");
const postController = require("../controller/createPosts");
const bidsController = require("../controller/bids");
const postHistoryController = require("../controller/post");
const bidHistoryController = require("../controller/bidLog");
const bidNotify = require("../controller/bidNotify");
const showPost = require("../controller/showPost");

const isUser = require("../middleware/userAuth");
const photo = require("../middleware/multer");

router.post("/signup", signupController.signup);
router.post("/verifyOTP", signupController.verifyOTP);

router.post("/login", loginController.login);

router.post(
  "/createPost",
  photo.upload.array("photo"),
  postController.createPost
);
router.post("/bidsIn", bidsController.bidsIn);
router.post("/acceptBids", bidsController.acceptBids);

router.get("/acceptedPost", postHistoryController.acceptedPost);
router.get("/ongoingPost", postHistoryController.ongoingPost);

router.get("/acceptedBids", bidHistoryController.acceptedBids);
router.get("/ongoingBids", bidHistoryController.ongoingBids);

router.get("/bidNotify", bidNotify.bidNotify);

router.get("/allPost", showPost.allPost);
module.exports = router;
