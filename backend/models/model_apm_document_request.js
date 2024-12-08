const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const documentRequestSchema = new Schema({
    documentRequestID: { 
        type: Number, 
        required: true 
    },

    documentCallID : {
        type : String,
        required : true,  
    },

    lawerID : {
        type : String,
        required : true,
    },

    clientID : {
        type : String,
        required : true, 
    },

    documentManagerID : {
        type : String,
        required : true,
    },

    docRequestStatues : {
        type : String,
        required : true,
    },

    documentDeadline : {
        type : String,
        required : true,  
    },

    instruction : {
        type : String,
        required : true,
    },
    
    uploadDocument : {
        type : String,
        
    },

    comment : {
        type : String,
         
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
    },

});

const documentRequest = mongoose.model('documentRequest',documentRequestSchema);

module.exports = documentRequest;