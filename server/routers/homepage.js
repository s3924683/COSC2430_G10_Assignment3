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

router.route("/").get(async (req, res) => {
  const products = await productController.getAllProducts(req, res);
  if (sessionController.hasSession(req)) {
    const user = req.session.user;
    let cart = req.session.cart || 0;
    res.render("homepage", {
      categories: categories,
      displayBreadcrumb: false,
      products: products,
      user: user,
      cart: cart,
    });
  } else {
    res.redirect("/user/signin");
  }
});

async function renderHomepage(req, res) {
  if (sessionController.hasSession(req)) {
    res.redirect("/homepage/");
    return true;
  } else {
    return false;
  }
}

module.exports = {
  router,
  renderHomepage,
};
