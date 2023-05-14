const mongoose = require("mongoose");

const distributionHubSchema = new mongoose.Schema({
    name: {
        type: String,
        name: String,
        unique: true,
    },
    address: {
        type: String,
        name: String,
        unique: true,
    }
});

module.exports = mongoose.model("DistributionHub", distributionHubSchema);