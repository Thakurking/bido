const express = require("express");
const router = express.Router();
const redis = require("redis");
const client = redis.createClient();

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
const todayAcceptedBids = require("../controller/todayAcceptedBids");

//User JWT Middleware
const isUser = require("../middleware/userAuth");
//Multer Middleware
const photo = require("../middleware/multer");

//#region signup and otp verificationn router
router.post("/signup", signupController.signup);
router.post("/verifyOTP", signupController.verifyOTP);
//#endregion

//#region Login router
router.post("/login", loginController.login);
//#endregion

//#region Bid post create router
router.post(
  "/createPost",
  // isUser,
  photo.upload.array("photo"),
  postController.createPost
);
//#endregion

//#region Give Bids and accept Bids Router
router.post("/bidsIn", isUser, bidsController.bidsIn);
router.post("/acceptBids", isUser, bidsController.acceptBids);
//#endregion

//#region Post Accepted Bids And Post Not Accepted bids
router.get("/acceptedPost", isUser, postHistoryController.acceptedPost);
router.get("/ongoingPost", isUser, postHistoryController.ongoingPost);
//#endregion

//#region Bids Accepted and Bids not Accepted
router.get("/acceptedBids", isUser, bidHistoryController.acceptedBids);
router.get("/ongoingBids", isUser, bidHistoryController.ongoingBids);
//#endregion

//#region Bids Notification
router.get("/bidNotify", isUser, bidNotify.bidNotify);
//#endregion

//#region Show all post
router.post("/showAllPost", isUser, showAllPost.showAllPost);
//#endregion

//#region Update Address
router.post("/updateAddress", isUser, profileUpdateController.updateAddress);
//#endregion

//#region Update Profile Photo
router.post(
  "/profileUpdate",
  photo.upload.single("profile"),
  profileUpdateController.profileUpdate
);
//#endregion

//#region Change Password Router
router.post("/changePassword", isUser, profileUpdateController.changePassword);
//#endregion

//#region Change Passowrd Via Otp
router.post(
  "/changePasswordViaOTP",
  profileUpdateController.changePasswordViaOTP
);
//#endregion

//#region Delete Bis Post
router.delete("/deletePost", isUser, deletePost.deletePost);
//#endregion

//#region Show All The Bids Accepted Today
router.get("/todayBids", isUser, todayAcceptedBids.todayBids);
//#endregion

module.exports = router;
