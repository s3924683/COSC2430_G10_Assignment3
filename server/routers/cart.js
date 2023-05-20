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

router
  .route("/")
  .get(async (req, res) => {
    if (sessionController.hasSession(req)) {
      const user = req.session.user;
      let cart = req.session.cart || [];

      let products = [];
      for (let i = 0; i < cart.length; i++) {
        let product = await productController.getProductById(cart[i]);

        if (product) {
          products.push(product);
        }
      }

      res.render("cart", { user: user, cart: cart, products: products });
    } else {
      res.redirect("/user/signin");
    }
  })
  .post(async (req, res) => {
    const products = req.params;
    products.price;
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      total + products[i];
    }

    total;
    res.render("buy", {
      total: total,
      cart: cart,
    });
  });

router.route("/:productId").get(async (req, res) => {
  const product = await productController.getProductById(req.params.productId);

  if (req.session) {
    if (!req.session.cart) {
      req.session.cart = [product];
    } else {
      req.session.cart.push(product);
    }
  }
  res.redirect("/homepage/");
});

module.exports = router;
