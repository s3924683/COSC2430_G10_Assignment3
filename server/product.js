const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  image: Blob,
  quantity: Number,
  vendor: String,
  description: String,
  ratings: Number,
  categories: Array,
  comments: Object,
});

module.exports = mongoose.model("Product", productSchema);
