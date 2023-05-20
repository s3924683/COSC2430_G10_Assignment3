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
const productController = require("../controllers/productControllers");
const sessionController = require("../controllers/sessionController");

const categories = require("../database/categories.json");

router.route("/").get(async (req, res) => {
  if (sessionController.hasSession(req)) {
    const user = req.session.user;

    let cart = req.session.cart || [];

    const query = req.query.query;
    const price = req.query.price;

    const products = await productController.searchProducts(query, price);

    res.render("homepage", {
      categories: categories,
      displayBreadcrumb: false,
      products: products,
      user: user,
      cart: cart
    });
  } else {
    res.redirect("/user/signin");
  }
});
module.exports = router;
