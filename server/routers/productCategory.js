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
const productControllers = require("../controllers/productControllers");

const sessionController = require("../controllers/sessionController");

router.route("/:categoryName").get(async (req, res) => {
  if (sessionController.hasSession(req)) {
    const categoryName = req.params.categoryName;
    const categories = require("../database/categories.json");

    const user = req.session.user;
    let cart = req.session.cart || [];

    const products = await productControllers.getAllProductsByCategory(
      categoryName
    );

    res.render("productCategory", {
      categories: categories,
      displayBreadcrumb: true,
      categoryName: categories[categoryName],
      products: products,
      cart: cart,
      user: user,
    });
  } else {
    res.redirect("/user/signin");
  }
});

module.exports = router;
