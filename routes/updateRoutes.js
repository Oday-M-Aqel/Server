const express = require("express");
const router = express.Router();
const multer = require('../middleware/multer');
const Updated = require("../controller/updateController");

router.put('/user', multer.uploadUserAvatar, Updated.updateUser);
router.put('/password', Updated.updatePassword);
router.put('/product', Updated.updateProduct);

module.exports = router;
