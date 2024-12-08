// created by : wickramanayake W A C D brew install node


const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const paymentRQSchema = new Schema({

    RequestId : {
        type : String,
        required : true,
    },

    RequestDate: {
        type : String
    },
    
    lawyerId : {
        type : String
    },

    ClientId : {
        type : String
    },

    ServiceID : {
        type : String
    },

    Amount : {
        type : Number
    }
    
   
})

const paymentRQ = mongoose.model("paymentRQ", paymentRQSchema);

module.exports = paymentRQ;