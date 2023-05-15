const mongoose = require("mongoose");
const validator = require("validator").default;

const usernameRules = {
  type: String,
  unique: true,
  required: true,
  trim: true,
  maxLength: 15,
  minLength: 8,
  match: /^[a-zA-Z0-9]+$/,
  validate(value) {
    if (!validator.isAlphanumeric(value, "pl-PL")) {
      throw new Error("Name cannot contain special characters.");
    }
  },
};
const passwordRules = {
  type: String,
  required: true,
  validate(value) {
    console.log(value);
    if (value !== this.password2) {
      throw new Error("Passwords don't match. Try again.");
    }

    if (value.length < 8) {
      throw new Error("Passwords is too short. At least 8 characters.");
    }
  },
};
const pfpRules = {
  data: Buffer,
  contentType: String,
};

const userSchema = new mongoose.Schema({
  username: usernameRules,
  password: passwordRules,
  pfp: pfpRules,
  name: String,
  address: String,
});
const shipperSchema = new mongoose.Schema({
  username: usernameRules,
  password: passwordRules,
  pfp: pfpRules,
  distributionHub: String,
});
const vendorSchema = new mongoose.Schema({
  username: usernameRules,
  password: passwordRules,
  pfp: pfpRules,
  businessName: String,
  businessAddress: String,
});

module.exports = {
  User: mongoose.model("User", userSchema),
  Shipper: mongoose.model("Shipper", shipperSchema),
  Vendor: mongoose.model("Vendor", vendorSchema),
};
