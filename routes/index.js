const express = require("express");
const router = express.Router();

const signupController = require("../controller/signup");

router.post("/signup", signupController.signup);
router.post("/verifyOTP", signupController.verifyOTP);

module.exports = router;
