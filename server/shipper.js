const mongoose = require("mongoose");

const shipperSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model("User", userSchema);
