const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userRegistrationSchema = new Schema({

    userId: {
        type : String, 
        required : true
    },
    
    fName: {
        type : String, 
        required : true
    },
    
    lName: {
        type : String, 
        required : true
    },
    
    nic: {
        type : String, 
        required : true
    },

    address : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },
    
    userType : {
        type : String,
        required : true
    },

    phoneNumber : {
        type : String,
        required : true
    },

    education : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    createDate : {
        type : String,
        required : true
    },

    userStatus : {
        type : String,
        required : true
    }
})

const userRegistration = mongoose.model("userRegistration", userRegistrationSchema);

module.exports = userRegistration;