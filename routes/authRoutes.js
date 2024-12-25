const express = require("express");
const router = express.Router();
const auth = require("../controller/authController");
const multer = require("../middleware/multer");

router.post("/register", auth.signup);
router.post("/login", auth.login);
router.post("/logout", auth.logout);

module.exports = router;


//  multer.uploadUserAvatar,