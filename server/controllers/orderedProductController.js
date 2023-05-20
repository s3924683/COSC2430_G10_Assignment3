/*
RMIT University Vietnam
 Course: COSC2430 Web Programming
 Semester: 2023A
 Assessment: Assignment 2
 Author: Group 10
 Acknowledgement: Acknowledge the resources that you use here.
*/

const OrderedProduct = require("../models/orderedProduct");

async function createProduct(req, res, products) {
  for (let i = 0; i < products.length; i++) {
    const { name, price, description, vendor, category, image } = products[0];

    try {
      const product = new OrderedProduct({
        name,
        price,
        description,
        vendor,
        category,
        image,
      });

      product.save();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

async function getAllProducts() {
  try {
    return await OrderedProduct.find();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getProductById(objectId) {
  try {
    return await OrderedProduct.findOne({ _id: objectId });
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function removeProductById(objectId) {
  try {
    // Find the product by ID and remove it
    const removedProduct = await OrderedProduct.findByIdAndRemove(objectId);

    if (removedProduct) {
      console.log('Product removed successfully:', removedProduct);
    } else {
      console.log('Product not found.');
    }
  } catch (error) {
    console.log('Error removing product:', error);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  removeProductById
};
