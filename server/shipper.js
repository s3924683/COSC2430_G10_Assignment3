const mongoose = require("mongoose");

const shipperSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  username: String,
  password: String,
  profilePicture: String,
  distributionHub: String,
});

module.exports = mongoose.model("Shipper", shipperSchema);
