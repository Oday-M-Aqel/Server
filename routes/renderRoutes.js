const express = require("express")
const router = express.Router();
const rend = require("../controller/renderPages");
router.get('/register', rend.signup);
router.get('/login', rend.login);
router.get('/addProduct', rend.addProduct);
router.get('/admin-dashboard', rend.adminDashboard);
router.get('/dashboard', rend.userDashboard);
router.get('/details', rend.details);
router.get('/checkout', rend.checkOut);
router.get('/cart', rend.cartPage);
router.get('/product', rend.product);
router.get('/subscription', rend.subscription);
router.get('/consultation', rend.consultation);
router.get('/homepage', rend.homepage);

module.exports = router;