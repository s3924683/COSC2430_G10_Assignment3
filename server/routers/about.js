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

const sessionController = require("../controllers/sessionController");

router.route("/").get(async (req, res) => {
  if (sessionController.hasSession(req)) {

    let cart = req.session.cart || [];

    const user = req.session.user;
    res.render("about", { user: user, cart: cart });
  } else {
    res.redirect("/user/signin");
  }
});

module.exports = router;
