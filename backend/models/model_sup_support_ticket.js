const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supportTicketSchema = new Schema({
    supTicketDate: {
        type: Date,
        required: [true, 'Ticket date is required'],
        validate: {
            validator: function(value) {
                return value instanceof Date && !isNaN(value);
            },
            message: 'Invalid date format'
        }
    },
    userType: {
        type: String,
        required: [true, 'User type is required'],
        enum: ['Client', 'Support Agent'], // Example of enum validation
    },
    clientId: {
        type: String,
        required: [true, 'Client ID is required'],
    },
    supTicketType: {
        type: String,
        required: [true, 'Ticket type is required'],
        enum: ['General Inquiry', 'Technical Support', 'Billing Issue'], // Example of enum validation
    },
    supTicketEmail: {
        type: String,
        required: [true, 'Email is required'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Regex for email validation
    },
    supFormPhone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); // Example: only 10 digit numbers allowed
            },
            message: 'Phone number must be 10 digits long'
        }
    },
    supTicketSubject: {
        type: String,
        required: [true, 'Subject is required'],
        maxlength: [100, 'Subject must be less than 100 characters']
    },
    supTicketMsg: {
        type: String,
        required: [true, 'Message is required'],
        maxlength: [500, 'Message must be less than 500 characters']
    },
    supTicketStatus: {
        type: String,
        required: [true, 'Ticket status is required'],
        enum: ['Pending', 'Replied', 'Closed'], // Example of enum validation
    },
});

const SupportTicket = mongoose.model("supportTicket", supportTicketSchema);
module.exports = SupportTicket;
