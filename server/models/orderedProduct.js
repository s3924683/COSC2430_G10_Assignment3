/*
RMIT University Vietnam
 Course: COSC2430 Web Programming
 Semester: 2023A
 Assessment: Assignment 2
 Author: Group 10
 Acknowledgement: Acknowledge the resources that you use here.
*/

const mongoose = require("mongoose");

const orderedProductSchema = new mongoose.Schema({
  name: {
    type: String,
    name: String,
    minLength: 10,
    maxLength: 50,
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

module.exports = mongoose.model("OrderedProduct", orderedProductSchema);
