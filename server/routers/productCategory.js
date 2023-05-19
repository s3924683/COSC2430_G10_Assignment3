const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers");

router.route("/:categoryName").get(async (req, res) => {
  const categoryName = req.params.categoryName;
  const categories = require("../database/categories.json");

  const products = await productControllers.getAllProductsByCategory(categoryName);

  res.render("productCategory", {
    categories: categories,
    displayBreadcrumb: true,
    categoryName: categories[categoryName],
    products: products,
  });
});

module.exports = router;
