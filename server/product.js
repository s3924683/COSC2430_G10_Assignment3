const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  quantity: Number,
  vendor: String,
  category: Array,
});

module.exports = mongoose.model("Product", productSchema);
