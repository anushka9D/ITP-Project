const router = require("express").Router();
const { application } = require("express");
let document_request = require("../models/model_apm_document_request");
const multer = require('multer');
const path = require('path');


// add document
router.route("/add_document_request").post((req, res) => {
    const {documentRequestID, documentCallID, lawerID,  clientID, documentManagerID, docRequestStatues, documentDeadline, instruction} = req.body;

    const newdocument_request = new document_request({
        documentRequestID,
        documentCallID,
        lawerID,
        clientID, 
        documentManagerID,
        docRequestStatues,
        documentDeadline,
        instruction
    });

    newdocument_request.save()
    .then(()=>{
        res.json("Success..!");
        }).catch(()=>{
                console.log("Unsuccess..!");
            });
});

//get document request
router.route("/get_all_document_request").get((req, res) => {
    document_request.find()
        .then((documentrequest) => {
            res.json(documentrequest);
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ error: "An error" });
        });
});

// Get the last document
router.route("/get_last_document_request").get(async (req, res) => {
    try {
        const lastDocument = await document_request.findOne().sort({ createdAt: -1 }); // Descending order
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

router.route("/get_all_document_request/Request").get((req, res) => {
    document_request.find({docRequestStatues: "Request"})
        .then((documentrequest) => {
            if(documentrequest.length > 0){
                res.json(documentrequest);
            }else{
                res.json({message: "No Request document call found"});
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ error: "An error" });
        });
});

router.route("/get_all_document_request/Submitted").get((req, res) => {
    document_request.find({docRequestStatues: "Submitted"})
        .then((documentrequest) => {
            if(documentrequest.length > 0){
                res.json(documentrequest);
            }else{
                res.json({message: "No Submitted document call found"});
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ error: "An error" });
        });
});

router.route("/get_all_document_request/Reviewing").get((req, res) => {
    document_request.find({docRequestStatues: "Reviewing"})
        .then((documentrequest) => {
            if(documentrequest.length > 0){
                res.json(documentrequest);
            }else{
                res.json({message: "No Reviewing document call found"});
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
    const {docRequestStatues, documentDeadline, instruction} = req.body;

    const updateddocument_request = {

        docRequestStatues,
        documentDeadline,
        instruction
    };

    try {
        await document_request.findByIdAndUpdate(callId, updateddocument_request);
        res.status(200).send({ status: "Document request Updated Successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Document call Update Unsuccessful", error: err.message });
    }
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where PDFs will be saved
    },
    filename: function (req, file, cb) {
        // Get the original name and extension
        const originalName = path.parse(file.originalname).name; // Original file name without extension
        const ext = path.extname(file.originalname); // File extension
        // Create a unique filename
        const uniqueName = `${originalName}_${Date.now()}${ext}`;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage: storage });

// update clien side
router.route("/update/client/:id").put(upload.single('pdf'), async (req, res) => {
    let callId = req.params.id;
    const {docRequestStatues, comment} = req.body;
    const uploadDocument = req.file ? req.file.path : null;

    const updateddocument_request = {

        docRequestStatues,
        uploadDocument, 
        comment 
    };

    try {
        await document_request.findByIdAndUpdate(callId, updateddocument_request);
        res.status(200).send({ status: "Document request Updated Successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Document request Update Unsuccessful", error: err.message });
    }
});

// delete
router.route("/delete/:id").delete(async (req, res) => {
    let callId = req.params.id;

    try {
        await document_request.findByIdAndDelete(callId);
        res.status(200).send({ status: "Document call Deleted Successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Document call Deletion Unsuccessful", error: err.message });
    }
});

// get id for request
router.route("/get/:id").get(async(req,res)=>{

    let callid = req.params.id;
    const call = await document_request.findById(callid)
    .then((documentrequest)=>{
        res.status(200).send({documentrequest});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get User", error: err.message});
    })

});

// get pdf
router.route("/get_pdf/:id").get(async (req, res) => {
    const callid = req.params.id;

    try {
        const documentrequest = await document_request.findById(callid);
        if (!documentrequest) {
            return res.status(404).send({ error: "Document request not found" });
        }

        // Send back only the filename
        const uploadedFileUrl = documentrequest.uploadDocument
            ? path.basename(documentrequest.uploadDocument)
            : null;

        res.status(200).send({ documentrequest, uploadedFileUrl });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;