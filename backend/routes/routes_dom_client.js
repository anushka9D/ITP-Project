const express = require('express');
const router = express.Router();
let Client = require("../models/model_dom_client")

router.route("/view-all-clients").get((req,res)=> {

    Client.find().then((clients)=>{
        res.json(clients)
    }).catch((err)=>{
        console.log(err)
    })

});

// Get a client by NIC
router.route("/getByNic/:nic").get(async (req, res) => {
    const nic = req.params.nic; 
    console.log(nic);

    try {
        const clientData = await Client.findOne({ nic }); 
        if (clientData) {
            res.status(200).send({ client: clientData });
        } else {
            res.status(404).send({ message: "Client not found" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with fetching the client", error: err.message });
    }
});


module.exports = router;