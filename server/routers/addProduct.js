const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const upload = require('../middleware/upload')

router.route('/').get((req, res) => {
    res.render('addProduct', { isSubmitted: false });
}).post(upload.single('image'), productController.createProduct)

module.exports = router