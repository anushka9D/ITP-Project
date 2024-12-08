const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const documentCallSchema = new Schema({
    documentCallID : {
        type : Number,
        required : true,
        unique: true,
    },

    lawerID : {
        type : String,
        required : true,
    },

    clientID : {
        type : String,
        required : true, 
    },

    caseNumber : {
        type : String,
        required : true, 
    },

    needDocument : {
        type : String,
        required : true,
    },

    docCallStatues : {
        type : String,
        required : true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
    },

});

const documentCall = mongoose.model('documentCall',documentCallSchema);

module.exports = documentCall;