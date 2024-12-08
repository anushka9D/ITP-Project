const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replyTicketSchema = new Schema({
    supportTicketId: {
        type: String,
        required: [true, 'Support ticket ID is required'], // Make it required
    },
    replyTicketDate: {
        type: Date,
        required: [true, 'Reply ticket date is required'], // Make it required
        validate: {
            validator: function(value) {
                return value instanceof Date && !isNaN(value);
            },
            message: 'Invalid date format for reply ticket date'
        }
    },
    userType: {
        type: String,
        required: [true, 'User type is required'], // Make it required
        enum: ['Admin', 'Support Agent', 'User'], // Example of enum validation
    },
    clientId: {
        type: String,
        required: [true, 'Client ID is required'], // Make it required
    },
    supAgentId: {
        type: String,
        required: [true, 'Support agent ID is required'], // Make it required
    },
    replyTicketMsg: {
        type: String,
        required: [true, 'Reply message is required'], // Make it required
        minlength: [5, 'Reply message must be at least 5 characters long'], // Minimum length validation
        maxlength: [500, 'Reply message must be less than 500 characters long'], // Maximum length validation
    },
    replyTicketStatus: {
        type: String,
        enum: ['Pending', 'Resolved', 'Closed'], // Example of enum validation
        default: 'Pending' // Default status
    }
});

const ReplyTicket = mongoose.model("replyTicket", replyTicketSchema);
module.exports = ReplyTicket;
