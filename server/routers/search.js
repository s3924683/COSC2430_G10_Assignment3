const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");
const categories = require("../database/categories.json");

router.route("/").get(async (req, res) => {
  const query = req.query.query;
  const price = req.query.price;

  const products = await productController.searchProducts(query, price);

  res.render("homepage", {
    categories: categories,
    displayBreadcrumb: false,
    products: products,
  });
});
module.exports = router;
