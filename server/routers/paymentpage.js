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

const orderedProductController = require("../controllers/orderedProductController");
const sessionController = require("../controllers/sessionController");

router.route("/").get(async (req, res) => {
  if (sessionController.hasSession(req)) {
    const user = req.session.user;
    let cart = req.session.cart || [];

    await orderedProductController.createProduct(req, res, cart);

    delete req.session.cart;
    res.redirect("/thankyou/");
  } else {
    res.redirect("/user/signin");
  }
});

module.exports = router;
