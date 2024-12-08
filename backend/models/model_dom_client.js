const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const clientSchema = new Schema({

    userId: { 
        type : String,  
        required : true 
    }, 
     
    fname: { 
        type : String,  
        required : true 
    }, 
     
    lname: { 
        type : String,  
        required : true 
    }, 
     
    nic: { 
        type : Number,  
        required : true 
    }, 
 
    address : { 
        type : String, 
        required : true 
    }, 

    district: { 
        type: String, 
        required: false 
    }, 

    province: { 
        type: String, 
        required: false 
    }, 
        
    email : { 
        type : String, 
        required : true 
    }, 
     
    phone : { 
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

const client = mongoose.model("client", clientSchema);
module.exports = client;