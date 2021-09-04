const mongoose = require('mongoose');
const { DonorModelName } = require('../constants/modelNames');

const DonorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Donor Name must be provided"]
    },
    email: {
        type: String,
        required: [true, "Please Provide Donor's Email"]
    },
    amount: {
        type: Number,
        required: [true, "Please Provide Amount Donated"]
    },
    reference: {
        type: String,
        required: [true, "Please provide unique ref id from paystack"]
    }
});

module.exports = mongoose.model(DonorModelName, DonorSchema);