const router = require("express").Router();
let SupportAgent = require("../models/model_atm_support_agent"); 

// Add new Support Agent
router.route("/add-support-agent").post((req, res) => {
    
    const userId = req.body.userId;
    const fName = req.body.fName;
    const lName = req.body.lName; 
    const nic = req.body.nic;
    const address = req.body.address;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const education = req.body.education;
    const password = req.body.password;
    const createdDate = req.body.createdDate;
    const userStatus = req.body.userStatus;

    // Creating new Support Agent object
    const newSupportAgent = new SupportAgent({
        userId,
        fName,
        lName,
        nic,
        address,
        email,
        phoneNumber,
        education,
        password,
        createdDate,
        userStatus
    });

    // Saving Support Agent
    newSupportAgent.save()
        .then(() => {
            res.json("Support Agent Added Successfully");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

// View all Support Agents
router.route("/").get((req, res) => {
    SupportAgent.find()
        .then((supportAgents) => {
            res.json(supportAgents);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Get a specific Support Agent by ID
router.route("/:id").get((req, res) => {
    const userId = req.params.id;

    SupportAgent.findOne({ userId: userId })
        .then((supportAgent) => {
            if (supportAgent) {
                res.json(supportAgent);
            } else {
                res.status(404).json("Support Agent Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Support Agent");
        });
});

// Update Support Agent
router.route("/update/:id").put(async (req, res) => {
    const supportAgentId = req.params.id;

    // Object to hold updated fields
    const updatedSupportAgent = {
        userId: req.body.userId,
        fName: req.body.fName,
        lName: req.body.lName,
        nic: req.body.nic,
        address: req.body.address,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        education: req.body.education,
        password: req.body.password,
        createdDate: req.body.createdDate,
        userStatus: req.body.userStatus
    };

    try {
        const result = await SupportAgent.findByIdAndUpdate(supportAgentId, updatedSupportAgent, { new: true });

        if (result) {
            res.json("Support Agent Updated Successfully");
        } else {
            res.status(404).json("Support Agent Not Found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating Support Agent");
    }
});

// Delete Support Agent
router.route("/delete/:id").delete(async (req, res) => {
    let supportAgentId = req.params.id;

    await SupportAgent.findByIdAndDelete(supportAgentId)
        .then(() => {
            res.status(200).send({ status: "Support Agent Deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error in Deleting Support Agent", error: err.message });
        });
});

// Login Support Agent
router.route("/login").post(async (req, res) => {
    const { userId, password } = req.body;

    try {
        const supportAgent = await SupportAgent.findOne({ userId, password });

        if (!supportAgent) {
            return res.status(400).json({ message: "Invalid userId or password" });
        }

        res.status(200).json({ supportAgent: supportAgent });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;