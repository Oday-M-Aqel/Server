const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer")
const add = require("../controller/AddController");

router.post("/product", upload.uploadImage, add.addProduct);

module.exports = router;
