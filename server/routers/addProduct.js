const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const upload = require('../middleware/upload')
const categories = require("../database/categories.json");

router.route('/').get((req, res) => {
    res.render('addProduct', { isSubmitted: false , categories: categories});
}).post(upload.single('image'), productController.createProduct)

module.exports = router