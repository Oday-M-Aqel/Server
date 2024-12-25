const express = require('express');
const router = express.Router();
const Delete = require('../controller/deleteController');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

router.delete('/user/:user_id', Delete.deleteUser);
router.delete('/user/:product', Delete.deleteProduct);

module.exports = router;