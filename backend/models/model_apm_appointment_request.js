const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentRequestSchema = new Schema({
    appointmentRequestName: {
        type: String,
        required: [true, 'Appointment request name is required'],
        minlength: [3, 'Appointment request name must be at least 3 characters long'],
        maxlength: [100, 'Appointment request name must be less than 100 characters long']
    },
    appointmentRequestDate: {
        type: Date,
        required: true,

    },
    appointmentRequestStatus: {
        type: String,
        enum: ['Pending', 'Replied'],
        default: 'Pending' // 
    },
    lawyerId: {
        type: String,
        required: true,
    },
    clientId: {
        type: String,
        required: true,
    },
    appointmentType: {
        type: String,
        required: true,
        enum: ['Consultation', 'Meeting', 'Other']
    },
    appointmentDate: {
        type: Date,
        required: true,
    },

    appointmentTime: {
        type: String,
       required: true,
    },
    appointmentLocation: {
        type: String,
        required: true,
        minlength: [5, 'Appointment location must be at least 5 characters long'],
        maxlength: [200, 'Appointment location must be less than 200 characters long']
    }
});

const AppointmentRequest = mongoose.model("appointmentrequest", appointmentRequestSchema);
module.exports = AppointmentRequest;
