const express = require("express");
const router = express.Router();
const { Shipper } = require("../models/users");
const bcrypt = require("bcrypt");

router
  .route("/signin")
  .get(async (req, res) => {
    res.render("shipperSignin", { message: null });
  })
  .post(async (req, res) => {
    try {
      const { username, password } = req.body;

      const shipper = await Shipper.findOne({ username });

      if (!shipper) {
        return res.render("shipperSignin", {
          message: "Invalid username or password",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, shipper.password);

      if (!isPasswordValid) {
        return res.render("shipperSignin", {
          message: "Invalid username or password",
        });
      }

      res.render("homepage", { username: shipper.username });
    } catch (error) {
      console.error(error);
      res.render("shipperSignin", {
        message: "An error occurred. Please try again later.",
      });
    }
  });
router
  .route("/signup")
  .get(async (req, res) => {
    res.render("shipperSignup", { message: null });
  })
  .post(async (req, res) => {
    try {
      const { username, password, distributionHub } = req.body;

      const existingShipper = await Shipper.findOne({ username });
      if (existingShipper) {
        return res.render("shipperSignup", {
          message: "Shipper username is already taken",
          messageType: "error",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new vendor using the vendor schema
      const shipper = new Shipper({
        username,
        password: hashedPassword,
        distributionHub,
      });

      await shipper.save();

      const message = "Shipper sign up successful!";
      const messageType = "success";

      res.render("shipperSignup", { message, messageType });
    } catch (error) {
      console.error(error);
      const message = "Error signing up as a shipper.";
      const messageType = "error";
      res.render("shipperSignup", { message, messageType });
    }
  });

router.route("/dashboard").get(async (req, res) => {
    res.render('shipperDashboard', { message: null });
})
module.exports = router;
