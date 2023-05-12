const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  username: String,
  password: String,
  name: String,
  profilePicture: String,
  address: String,
});
const shipperSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  username: String,
  password: String,
  profilePicture: String,
  distributionHub: String,
});
const vendorSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  username: String,
  password: String,
  profilePicture: String,
  businessName: String,
  businessAddress: String,
});

module.exports = {
  User: mongoose.model("User", userSchema),
  Shipper: mongoose.model("Shipper", shipperSchema),
  Vendor: mongoose.model("Vendor", vendorSchema)
}