const router = require("express").Router();
let document_call = require("../models/model_apm_document_call");

// add call
router.route("/add_document_call").post((req, res) => {
    const {lawerID, clientID, caseNumber, needDocument, docCallStatues} = req.body;
    const documentCallID = Number(req.body.documentCallID);
    
    const newdocument_call = new document_call({
        documentCallID,
        lawerID,
        clientID, 
        caseNumber, 
        needDocument, 
        docCallStatues
    });

    newdocument_call.save()
    .then(()=>{
        res.json("Success..!");
        }).catch(()=>{
                console.log(err);
                res.status(400).json({ error: "Error saving document call." });
            });
});

// get all call
router.route("/get_all_document_call").get((req, res) => {
    document_call.find()
        .then((documentcall) => {
            res.json(documentcall);
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ error: "An error" });
        });
});


// Get the last document
router.route("/get_last_document_call").get(async (req, res) => {
    try {
        const lastDocument = await document_call.findOne().sort({ createdAt: -1 }); // Descending order
        if (lastDocument) {
            res.status(200).json(lastDocument);
        } else {
            res.status(404).json({ message: "No documents found." });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to fetch the last document." });
    }
});


router.route("/get_all_document_call/Pending").get((req, res) => {
    document_call.find({docCallStatues: "Pending"})
        .then((documentcall) => {
            if(documentcall.length > 0){
                res.json(documentcall);
            }else{
                res.json({message: "No pending document call found"});
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ error: "An error" });
        });
});


router.route("/get_all_document_call/Requested").get((req, res) => {
    document_call.find({docCallStatues: "Requested"})
        .then((documentcall) => {
            if(documentcall.length > 0){
                res.json(documentcall);
            }else{
                res.json({message: "No Requested document call found"});
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ error: "An error" });
        });
});

// update
router.route("/update/:id").put(async (req, res) => {
    let callId = req.params.id;
    const {clientID, docCallStatues, caseNumber, needDocument} = req.body;

    const updateddocument_call = {
        clientID,
        caseNumber, 
        needDocument,
        docCallStatues
    };

    try {
        await document_call.findByIdAndUpdate(callId, updateddocument_call);
        res.status(200).send({ status: "Document call Updated Successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Document call Update Unsuccessful", error: err.message });
    }
});


// delete
router.route("/delete/:id").delete(async (req, res) => {
    let callId = req.params.id;

    try {
        await document_call.findByIdAndDelete(callId);
        res.status(200).send({ status: "Document call Deleted Successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Document call Deletion Unsuccessful", error: err.message });
    }
});

// get one call
router.route("/get/:id").get(async(req,res)=>{

    let callid = req.params.id;
    const call = await document_call.findById(callid)
    .then((documentcall)=>{
        res.status(200).send({documentcall});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get User", error: err.message});
    })

});


module.exports = router;