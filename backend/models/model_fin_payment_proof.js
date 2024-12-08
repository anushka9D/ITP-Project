// created by : Wickramanayake W A C D

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentProofSchema = new Schema({
    
    RequestId: {
        type: String,
        required: true,  // Unique ID for the Request
    },

    lawyerId: {
        type: String,
        required: true,  // Unique ID for the lawyer
    },
    ClientId: {
        type: String,
        required: true,  // Unique ID for the client
    },
    

    PaymentDate: {
        type: String,  // Date when the payment was made
        required: true,
    },
    

    UploadDate: {
        type: String,  // Date when the proof was uploaded
        required: true,
    },

    PhoneNumber: {
        type: Number,  // Type of service provided
        required: true,
    },

    PaymentType: {
        type: String,  // Method or type of payment (e.g., credit card, bank transfer)
       
    },

    Amount: {
        type: Number,  // Payment amount
        required: true,
    }
});

const PaymentProof = mongoose.model("PaymentProof", paymentProofSchema);

module.exports = PaymentProof;