const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.error(err));

const User = require("../user.js");
const Shipper = require("../shipper.js");
const Vendor = require("../vendor.js");

const Product = require("../product.js");