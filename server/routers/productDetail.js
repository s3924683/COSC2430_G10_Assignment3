/*
RMIT University Vietnam
 Course: COSC2430 Web Programming
 Semester: 2023A
 Assessment: Assignment 2
 Author: Group 10
 Acknowledgement: Acknowledge the resources that you use here.
*/

const express = require("express");
const router = express.Router();
const categories = require("../database/categories.json");

const productController = require("../controllers/productControllers");
const sessionController = require("../controllers/sessionController");

router.route("/:productId").get(async (req, res) => {
  if (sessionController.hasSession(req)) {
    const productId = req.params.productId;
    const product = await productController.getProductById(productId);

    let cart = req.session.cart || [];
    const user = req.session.user;

    res.render("productDetail", {
      product: product,
      categories: categories,
      user: user,
      cart: cart,
    });
  } else {
    res.redirect("/user/signin");
  }
});

module.exports = router;
