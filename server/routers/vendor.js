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
const { Vendor } = require("../models/users");
const bcrypt = require("bcrypt");

const sessionController = require("../controllers/sessionController");
const homepage = require("../routers/homepage");
const productController = require("../controllers/productControllers");
const upload = require("../middleware/upload");
const categories = require("../database/categories.json");

router
  .route("/signin")
  .get(async (req, res) => {
    if (!(await homepage.renderHomepage(req, res))) {
      res.render("vendorSignin", { message: null });
    }
  })
  .post(async (req, res) => {
    try {
      const { username, password } = req.body;

      const vendor = await Vendor.findOne({ username });

      if (!vendor) {
        return res.render("vendorSignin", {
          message: "Invalid username or password",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, vendor.password);

      if (!isPasswordValid) {
        return res.render("vendorSignin", {
          message: "Invalid username or password",
        });
      }

      sessionController.createSession(req, vendor);
      await homepage.renderHomepage(req, res);
    } catch (error) {
      console.error(error);
      res.render("vendorSignin", {
        message: "An error occurred. Please try again later.",
      });
    }
  });
router
  .route("/signup")
  .get(async (req, res) => {
    res.render("vendorSignup", { message: null });
  })
  .post(async (req, res) => {
    try {
      const { username, password, businessName, businessAddress } = req.body;
      const type = "vendor";

      // Check if the username already exists in either the user or vendor collection
      let existingVendor = await Vendor.findOne({ username });

      if (existingVendor) {
        // Username is already taken, render the vendor_signup template with an error message
        return res.render("vendorSignup", {
          message: "Vendor username is already taken",
          messageType: "error",
        });
      }

      existingVendor = await Vendor.findOne({ businessAddress });

      if (existingVendor) {
        return res.render("vendorSignup", {
          message: "Vendor business address is already taken",
          messageType: "error",
        });
      }

      existingVendor = await Vendor.findOne({ businessName });

      if (existingVendor) {
        return res.render("vendorSignup", {
          message: "Vendor business name is already taken",
          messageType: "error",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new vendor using the vendor schema
      const vendor = new Vendor({
        username,
        password: hashedPassword,
        businessName,
        businessAddress,
        type,
        // other vendor-specific fields
      });

      // Save the vendor to the database
      await vendor.save();

      // Set the message for successful vendor signup
      const message = "Vendor sign up successful!";
      const messageType = "success";

      // Render the vendor_signup template with the message and message type
      res.render("vendorSignup", { message, messageType });
    } catch (error) {
      // Handle vendor signup error
      console.error(error);
      const message = "Error signing up as a vendor.";
      const messageType = "error";
      res.render("vendorSignup", { message, messageType });
    }
  });

router.route("/myProduct").get(async (req, res) => {
  if (sessionController.hasSession(req)) {
    res.render("vendorProduct");
  } else {
    res.redirect("/vendor/signin/");
  }
});

router
  .route("/addProduct")
  .get(async (req, res) => {
    if (sessionController.hasSession(req)) {
      const user = req.session.user;

      let cart = req.session.cart || [];
      res.render("addProduct", {
        isSubmitted: false,
        categories: categories,
        user: user,
        cart,
      });
    } else {
      res.redirect("/vendor/signin/");
    }
  })
  .post(upload.single("image"), productController.createProduct);

module.exports = router;
