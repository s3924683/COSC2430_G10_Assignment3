const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  username: String,
  password: String,
  profilePicture: String,
  businessName: String,
  businessAddress: String,
});

module.exports = mongoose.model("Vendor", vendorSchema);
