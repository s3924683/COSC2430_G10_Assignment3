/*
RMIT University Vietnam
 Course: COSC2430 Web Programming
 Semester: 2023A
 Assessment: Assignment 2
 Author: Group 10
 Acknowledgement: Acknowledge the resources that you use here.
*/


const mongoose = require("mongoose");
const validator = require('validator').default;

const distributionHubSchema = new mongoose.Schema({
    name: {
        type: String,
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