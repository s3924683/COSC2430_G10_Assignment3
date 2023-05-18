const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.error(err));

const { Shipper, Vendor, User } = require("../models/users.js");
const DistributionHub = require('../models/distributionHub.js')
const Product = require('../models/product.js')