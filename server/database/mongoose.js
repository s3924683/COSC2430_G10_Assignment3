const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.error(err));

const { Shipper, Vendor, User } = require("../users.js");
const DistributionHub = require('../distributionHub.js')
const Product = require('../product.js')