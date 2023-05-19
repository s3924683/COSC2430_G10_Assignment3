const express = require("express");
const router = express.Router();
const { User } = require("../models/users");
const bcrypt = require("bcrypt");

const sessionController = require("../controllers/sessionController");
const homepage = require("../routers/homepage");

router
  .route("/signin")
  .get(async (req, res) => {
    if (!(await homepage.renderHomepage(req, res))) {
      res.render("userSignin", { message: null });
    }
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

      sessionController.createSession(req, user);
      // Successful sign-in
      // You can redirect the user to a different page or perform other actions here
      await homepage.renderHomepage(req, res);
    } catch (error) {
      // Handle any errors that occurred during the sign-in process
      console.error(error);
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
      const type = "user";

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.render("userSignup", {
          message: "Username is already taken",
          messageType: "error",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        username,
        password: hashedPassword,
        address,
        name,
        type,
      });

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
