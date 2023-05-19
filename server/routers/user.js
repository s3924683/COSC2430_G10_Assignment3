const express = require("express");
const router = express.Router();
const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const categories = require("../database/categories.json");

router
  .route("/signin")
  .get(async (req, res) => {
    res.render("userSignin", { message: null });
  })
  .post(async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await User.findOne({ username });

      if (!user) {
        // User not found, render the userSignin template with an error message
        return res.render("userSignin", {
          message: "Invalid username or password",
        });
      }

      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        // Password does not match, render the userSignin template with an error message
        return res.render("userSignin", {
          message: "Invalid username or password",
        });
      }

      // Successful sign-in
      // You can redirect the user to a different page or perform other actions here
      res.render("about", { user: username, categories: categories }); // Render the dashboard template with the username
    } catch (error) {
      // Handle any errors that occurred during the sign-in process
      res.render("userSignin", {
        message: "An error occurred. Please try again later.",
      });
    }
  });

router
  .route("/signup")
  .get(async (req, res) => {
    res.render("userSignup", { message: null });
  })
  .post(async (req, res) => {
    try {
      // Process signup...
      const { username, password, address, name } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        password: hashedPassword,
        address,
        name,
      });

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.render("userSignup", {
          message: "Username is already taken",
          messageType: "error",
        });
      }

      // Save the user to the database
      await user.save();

      // Set the message for successful signup
      const message = "Sign up successful!";
      const messageType = "success";

      // Render the user_signup template with the message and message type
      res.render("userSignup", { message, messageType });
    } catch (error) {
      console.error(error);
      // Set the message for signup error
      const message = "Error signing up.";
      const messageType = "error";

      // Render the user_signup template with the message and message type
      res.render("userSignup", { message, messageType });
    }
  });

module.exports = router;
