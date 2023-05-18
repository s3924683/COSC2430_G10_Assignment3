const mongoose = require("mongoose");
const validator = require('validator').default;

const distributionHubSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isAlphanumeric(value, 'pl-PL')) {
                throw new Error('Name cannot contain special characters.')
            }
        }
    },
    address: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isAlphanumeric(value, 'pl-PL')) {
                throw new Error('Name cannot contain special characters.')
            }
        }
    }
});

module.exports = mongoose.model("DistributionHub", distributionHubSchema);