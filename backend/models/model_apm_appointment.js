const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    appointmentRequestId: {
        type: String,
        rrequired: true,
    },
    appointmentManagerId: {
        type: String,
        required: true,
    },
    lawyerId: {
        type: String,
        required: true,
    },
    clientId: {
        type: String,
        required: true,
    },
    appointmentCreationDate: {
        type: Date,
        required: true,
    },
    appointmentTitle: {
        type: String,
        required: true,
        minlength: [3, 'Appointment title must be at least 3 characters long'],
        maxlength: [100, 'Appointment title must be less than 100 characters long']
    },
    appointmentDescription: {
        type: String,
        required: true,
        minlength: [3, 'Appointment description must be at least 10 characters long'],
        maxlength: [500, 'Appointment description must be less than 500 characters long']
    },
    appointmentStatus: {
        type: String,
        enum: ['Pending', 'Completed'], 
        default: 'Pending'
    }
});

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;
