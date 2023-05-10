const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
  profilePicture: Blob,
  businessName: String,
  businessAddress: String,
});

module.exports = mongoose.model("User", userSchema);
