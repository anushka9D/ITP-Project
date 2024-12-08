const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const DeedManagerSchema = new Schema({

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
    
    createdDate: { 
        type: String, 
    },

    userStatus: { 
        type: String, 
    }         
})

const DeedManager = mongoose.model("deedManager", DeedManagerSchema);
module.exports = DeedManager;