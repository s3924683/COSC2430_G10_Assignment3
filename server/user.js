const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  username: String,
  password: String,
  name: String,
  profilePicture: String,
  address: String,
});

module.exports = mongoose.model("User", userSchema);
