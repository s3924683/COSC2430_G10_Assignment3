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
  minlength: 8,
  maxlength: 20,
  match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
  validate(value) {
    if (
      !value.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/
      )
    ) {
      throw new Error(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
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
  businessName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  businessAddress: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = {
  User: mongoose.model("User", userSchema),
  Shipper: mongoose.model("Shipper", shipperSchema),
  Vendor: mongoose.model("Vendor", vendorSchema),
};
