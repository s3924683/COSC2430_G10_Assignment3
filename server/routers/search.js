const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');

// Other routes

// Search route
router.route('/').get(async (req, res) => {
    const query = req.query.query;
    const price = req.query.price;

    const products = await productController.searchProducts(query, price)
    res.render("homepage", {
        categories: categories, products: products, searchResults: products
    });
})
module.exports = router;
