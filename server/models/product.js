const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    name: String,
    minLength: 10,
    maxLength: 20,
  },
  price: {
    type: Number,
    minLength: 0,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  description: {
    type: String,
    minLength: 0,
    maxLength: 500,
  },
  vendor: String,
  category: {
    type: String,
    minLength: 0,
  },
});

module.exports = mongoose.model("Product", productSchema);
