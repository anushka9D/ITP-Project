const router = require("express").Router();
let paymentRQ = require("../models/model_fin_Payment_form");

// Add new paymentRQ
router.route("/add_paymentRQ").post((req, res) => {
    const RequestId = req.body.RequestId;
    const RequestDate = req.body.RequestDate;
    const lawyerId = req.body.lawyerId;
    const ClientId = req.body.ClientId;
    const ServiceID = req.body.ServiceID;
    const Amount = Number(req.body.Amount);

    const newpaymentRQ = new paymentRQ({
        RequestId,
        RequestDate,
        lawyerId,
        ClientId,
        ServiceID,
        Amount
    });

    newpaymentRQ.save()
        .then(() => res.json("New paymentRQ Added.."))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

// View all paymentRQ requests
router.route("/paymentRQ").get((req, res) => {
    paymentRQ.find()
        .then((paymentRQ) => res.json(paymentRQ))
        .catch((err) => console.log(err));
});

// Get a specific paymentRQ request by ID
router.route("/paymentRQ/:id").get((req, res) => {
    const paymentRQId = req.params.id;

    paymentRQ.findById(paymentRQId)
        .then((paymentRQ) => {
            if (paymentRQ) {
                res.json(paymentRQ);
            } else {
                res.status(404).json("paymentRQ Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving paymentRQ");
        });
});

// Update paymentRQ request by ID
router.route("/update_paymentRQ/:id").put(async (req, res) => {
    const paymentRQId = req.params.id;

    const updatedpaymentRQ = {
        RequestId: req.body.RequestId,
        RequestDate: req.body.RequestDate,
        lawyerId: req.body.lawyerId,
        ClientId: req.body.ClientId,
        ServiceID: req.body.ServiceID,
        Amount: Number(req.body.Amount)
    };

    try {
        const result = await paymentRQ.findByIdAndUpdate(paymentRQId, updatedpaymentRQ, { new: true });

        if (result) {
            res.json("paymentRQ Updated Successfully");
        } else {
            res.status(404).json("paymentRQ Not Found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating paymentRQ");
    }
});

// Delete paymentRQ request by ID
router.route("/delete_paymentRQ/:id").delete(async (req, res) => {
    let paymentRQId = req.params.id;

    await paymentRQ.findByIdAndDelete(paymentRQId)
        .then(() => res.status(200).send({ status: "paymentRQ deleted" }))
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error in delete paymentRQ", error: err.message });
        });
});

// Get all paymentRQ requests for a specific lawyerId
router.route("/paymentRQByLawyer/:lawyerId").get((req, res) => {
    const lawyerId = req.params.lawyerId;

    paymentRQ.find({ lawyerId: lawyerId })
        .then((paymentRQList) => {
            if (paymentRQList.length > 0) {
                res.json(paymentRQList);
            } else {
                res.status(404).json("No paymentRQ found for the specified lawyerId");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving paymentRQ for the specified lawyerId");
        });
});

// Update paymentRQ requests for a specific lawyerId
router.route("/update_paymentRQByLawyer/:lawyerId").put(async (req, res) => {
    const lawyerId = req.params.lawyerId;

    const updatedFields = {
        RequestId: req.body.RequestId,
        RequestDate: req.body.RequestDate,
        lawyerId: req.body.lawyerId,
        ClientId: req.body.ClientId,
        ServiceID: req.body.ServiceID,
        Amount: Number(req.body.Amount)
    };

    try {
        const result = await paymentRQ.updateMany({ lawyerId: lawyerId }, updatedFields, { new: true });

        if (result.nModified > 0) {
            res.json("paymentRQ Updated Successfully for the specified lawyerId");
        } else {
            res.status(404).json("No paymentRQ found for the specified lawyerId to update");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating paymentRQ for the specified lawyerId");
    }
});

// Get all paymentRQ requests for a specific ClientId
router.route("/paymentRQByClient/:ClientId").get((req, res) => {
    const ClientId = req.params.ClientId;

    paymentRQ.find({ ClientId: ClientId })
        .then((paymentRQList) => {
            if (paymentRQList.length > 0) {
                res.json(paymentRQList);
            } else {
                res.status(404).json("No paymentRQ found for the specified ClientId");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving paymentRQ for the specified ClientId");
        });
});

module.exports = router;