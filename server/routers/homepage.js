const express = require('express');
const router = express.Router();

const categories = require("../database/categories.json");
const productController = require('../controllers/productControllers');


router.route('/').get(async (req, res) => {
    const products = await productController.getAllProducts(req, res)

    res.render("homepage", {
        categories: categories, products: products
    });
})

module.exports = router