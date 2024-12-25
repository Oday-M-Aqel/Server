const express = require("express");
const router = express.Router();
const Get = require("../controller/GetController");

router.get("/product", Get.getProduct);

module.exports = router;
