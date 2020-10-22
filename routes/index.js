const express = require("express");
const router = express.Router();

const signupController = require("../controller/signup");
const loginController = require("../controller/login");
const postController = require("../controller/createPosts");
const bidsController = require("../controller/bids");
const postHistoryController = require("../controller/post");
const bidHistoryController = require("../controller/bidLog");
const bidNotify = require("../controller/bidNotify");
const showAllPost = require("../controller/showPost");
const profileUpdateController = require("../controller/updateProfile");
const deletePost = require("../controller/deletePost");

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

router.get("/showAllPost", showAllPost.showAllPost);

router.post("/updateAddress", profileUpdateController.updateAddress);
router.post(
  "/profileUpdate",
  photo.upload.single("profile"),
  profileUpdateController.profileUpdate
);
router.post("/changePassword", profileUpdateController.changePassword);
router.post(
  "/changePasswordViaOTP",
  profileUpdateController.changePasswordViaOTP
);

router.delete("/deletePost", deletePost.deletePost);
module.exports = router;
