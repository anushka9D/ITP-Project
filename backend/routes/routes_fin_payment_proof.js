// created by : Wickramanayake W A C D

const router = require("express").Router();
let PaymentProof = require("../models/model_fin_payment_proof");

// Add a new payment proof
router.route("/add_paymentProof").post((req, res) => {
    const RequestId = req.body.RequestId;
    const lawyerId = req.body.lawyerId;
    const ClientId = req.body.ClientId;
    const PaymentDate = req.body.PaymentDate;
    const UploadDate = req.body.UploadDate;
    const PhoneNumber = req.body.PhoneNumber;
    const PaymentType = req.body.PaymentType;
    const Amount = req.body.Amount; // New field added

    // Creating new payment proof object
    const newPaymentProof = new PaymentProof({
        RequestId,
        lawyerId,
        ClientId,
        PaymentDate,
        UploadDate,
        PhoneNumber,
        PaymentType,
        Amount, // Include the Amount field
    });

    // Saving payment proof to database
    newPaymentProof
        .save()
        .then(() => {
            res.json("New Payment Proof Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

// View all payment proofs
router.route("/paymentProofs").get((req, res) => {
    PaymentProof.find()
        .then((paymentProofs) => {
            res.json(paymentProofs);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error: " + err);
        });
});

// Get a specific payment proof by ID
router.route("/paymentProof/:id").get((req, res) => {
    const paymentProofId = req.params.id;

    PaymentProof.findById(paymentProofId)
        .then((paymentProof) => {
            if (paymentProof) {
                res.json(paymentProof);
            } else {
                res.status(404).json("Payment Proof Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Payment Proof");
        });
});

// Get payment proofs by a specific ClientId
router.route("/paymentProofsByClient/:clientId").get((req, res) => {
    const clientId = req.params.clientId;

    PaymentProof.find({ ClientId: clientId })
        .then((paymentProofs) => {
            if (paymentProofs.length > 0) {
                res.json(paymentProofs);
            } else {
                res.status(404).json("No Payment Proofs Found for the Client");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Payment Proofs");
        });
});

router.route("/updatePaymentProofByClient/:clientId").put(async (req, res) => {
    const clientId = req.params.clientId;

    // Object to hold updated fields
    const updatedPaymentProof = {
        RequestId: req.body.RequestId,
        lawyerId: req.body.lawyerId,
        ClientId: req.body.ClientId,
        PaymentDate: req.body.PaymentDate,
        UploadDate: req.body.UploadDate,
        PhoneNumber: req.body.PhoneNumber,
        PaymentType: req.body.PaymentType,
        Amount: req.body.Amount, // Include the Amount field
    };

    try {
        const result = await PaymentProof.updateMany(
            { ClientId: clientId }, // Ensure this matches your field name in the database
            updatedPaymentProof,
            { new: true }
        );

        if (result.nModified > 0) {
            res.json(`${result.nModified} Payment Proof(s) Updated Successfully`);
        } else {
            res.status(404).json("No Payment Proofs Found to Update for the Client");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating Payment Proofs");
    }
});

// Update a specific payment proof
router.route("/update_paymentProof/:id").put(async (req, res) => {
    const paymentProofId = req.params.id;

    // Object to hold updated fields
    const updatedPaymentProof = {
        RequestId: req.body.RequestId,
        lawyerId: req.body.lawyerId,
        ClientId: req.body.ClientId,
        PaymentDate: req.body.PaymentDate,
        UploadDate: req.body.UploadDate,
        PhoneNumber: req.body.PhoneNumber,
        PaymentType: req.body.PaymentType,
        Amount: req.body.Amount, // Include the Amount field
    };

    try {
        const result = await PaymentProof.findByIdAndUpdate(paymentProofId, updatedPaymentProof, { new: true });

        if (result) {
            res.json("Payment Proof Updated Successfully");
        } else {
            res.status(404).json("Payment Proof Not Found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating Payment Proof");
    }
});

// Delete a specific payment proof
router.route("/delete_paymentProof/:id").delete(async (req, res) => {
    const paymentProofId = req.params.id;

    await PaymentProof.findByIdAndDelete(paymentProofId)
        .then(() => {
            res.status(200).send({ status: "Payment Proof Deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error in Deleting Payment Proof", error: err.message });
        });
});

module.exports = router;