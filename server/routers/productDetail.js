const express = require("express");
const router = express.Router();
const categories = require("../database/categories.json");

const productController = require("../controllers/productControllers");

router.route("/:productId").get(async (req, res) => {
    const productId = req.params.productId
    const product = await productController.getProductById(productId)
   
    res.render("productDetail", {
        product: product, categories: categories
    });
});

module.exports = router;
