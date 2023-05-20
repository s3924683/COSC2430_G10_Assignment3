/*
RMIT University Vietnam
 Course: COSC2430 Web Programming
 Semester: 2023A
 Assessment: Assignment 2
 Author: Group 10
 Acknowledgement: Acknowledge the resources that you use here.
*/

const Product = require("../models/product");
const path = require("path");
const fs = require("fs");

async function getAllProducts(req, res) {
  try {
    return await Product.find();
  } catch (error) {
    console.log(error);
    return [];
  }
}
async function getProductById(objectId) {
  try {
    return await Product.findOne({ _id: objectId });
  } catch (error) {
    console.log(error);
    return
  }
}
async function getAllProductsByCategory(categoryName) {
  try {
    return await Product.find({
      category: categoryName,
    });
  } catch (error) {
    console.log(error);
    return;
  }
}
const searchProducts = async (name, price) => {
  try {
    const regexPattern = new RegExp(`\\b${name}\\b`, "i");

    if (Number(price) == 0 || isNaN(price)) {
      return await Product.find({ name: { $regex: regexPattern } });
    } else {
      const minPrice = Number(price) - Math.floor(price * (20 / 100)); // Minimum price
      const maxPrice = Number(price) + Math.floor(price * (20 / 100)); // Maximum price

      return await Product.find({
        name: { $regex: regexPattern },
        price: { $gte: minPrice, $lte: maxPrice },
      });
    }
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};
async function createProduct(req, res) {
  const { name, price, description, vendor, category } = req.body;

  if (!req.file) {
    const defaultImagePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "assets",
      "imgs",
      "product-image.png"
    );

    const file = {
      buffer: fs.readFileSync(defaultImagePath),
      originalname: "product-image.png",
      mimetype: "image/png",
    };
    req.file = file;
  }

  try {
    const product = new Product({
      name: name,
      price: price,
      description: description,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      vendor: vendor,
      category: category,
    });

    product.save();
    res.status(201).json({ message: "successfully added the product!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllProducts,
  getAllProductsByCategory,
  getProductById,
  createProduct,
  searchProducts,
};
