const router = require("express").Router();
let replyTicket = require("../models/model_sup_reply_ticket");

// add new support reply ticket
router.route("/add-reply-ticket").post((req, res) => {
    const supportTicketId = req.body.supportTicketId;
    const replyTicketDate = new Date(); // Automatically set the current date
    const userType = req.body.userType;
    const clientId = req.body.clientId;
    const supAgentId = req.body.supAgentId;
    const replyTicketMsg = req.body.replyTicketMsg;
    const replyTicketstatus = req.body.replyTicketstatus;

    // creating new reply ticket object
   
    const newReplyTicket = new replyTicket({
        supportTicketId,
        replyTicketDate,
        userType,
        clientId,
        supAgentId,
        replyTicketMsg,
        replyTicketstatus
    });

    // saving the new reply ticket
    newReplyTicket.save()
        .then(() => {
            res.json("New Support Reply Ticket Added.");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

// view specific reply ticket by ID
router.route("/:id").get((req, res) => {
    const replyTicketId = req.params.id;

    replyTicket.findById(replyTicketId)
        .then((replyTicket) => {
            if (replyTicket) {
                res.json(replyTicket);
            } else {
                res.status(404).json("Reply Ticket Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Reply Ticket");
        });
});

// Update support reply ticket
router.route("/update/:id").put(async (req, res) => {
    const replyTicketId = req.params.id;

    // Object to hold updated fields
    const updatedReplyTicket = {
        supportTicketId:req.body.supportTicketId,
        replyTicketDate: new Date(),
        userType: req.body.userType,
        clientId: req.body.clientId,
        supAgentId: req.body.supAgentId,
        replyTicketMsg: req.body.replyTicketMsg,
        replyTicketstatus: req.body.replyTicketstatus
    };

    try {
        const result = await replyTicket.findByIdAndUpdate(replyTicketId, updatedReplyTicket, { new: true });

        if (result) {
            res.json("Support Reply Ticket Updated Successfully");
        } else {
            res.status(404).json("Reply Ticket Not Found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating Reply Ticket");
    }
});

// delete support reply ticket
router.route("/delete/:id").delete(async (req, res) => {
    const replyTicketId = req.params.id;

    await replyTicket.findByIdAndDelete(replyTicketId)
        .then(() => {
            res.status(200).send({ status: "Support Reply Ticket deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error in deleting reply ticket", error: err.message });
        });
});


// -------- dashboards ------------
//support agent dashboard - all pending reply tickets (for specific support agent)
router.route("/pending/support-agent/:id").get((req, res) => {
    const supAgentId = req.params.id;

    replyTicket.find({ replyTicketstatus: "In Progress", supAgentId: supAgentId})
    .then((replyTicket) => {
        if (replyTicket.length > 0) {
            res.json(replyTicket);
        } else {
            res.status(404).json("Reply Ticket Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving reply ticket");
    });
});


//client dashboard - all pending reply tickets (for specific client)
router.route("/pending/client/:id").get((req, res) => {
    const clientId = req.params.id;

    replyTicket.find({ replyTicketstatus: "In Progress", clientId: clientId})
    .then((replyTicket) => {
        if (replyTicket.length > 0) {
            res.json(replyTicket);
        } else {
            res.status(404).json("Reply Ticket Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Reply Ticket");
    });
});


// client dashboard - all reply tickets for a specific client
router.route("/client/:id").get((req, res) => {
    const clientId = req.params.id;

    replyTicket.find({ clientId: clientId })
        .then((replyTickets) => {
            if (replyTickets.length > 0) {
                res.json(replyTickets);
            } else {
                res.status(404).json("No Reply Tickets Found for Client");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Reply Tickets");
        });
});

// support agent dashboard - all reply tickets for a specific agent
router.route("/support-agent/:id").get((req, res) => {
    const supAgentId = req.params.id;

    replyTicket.find({ supAgentId: supAgentId })
        .then((replyTickets) => {
            if (replyTickets.length > 0) {
                res.json(replyTickets);
            } else {
                res.status(404).json("No Reply Tickets Found for Support Agent");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Reply Tickets");
        });
});

router.post('/reply-tickets', async (req, res) => {
    try {
        const replyTicket = new replyTicket(req.body);
        await replyTicket.save();
        res.status(201).json({ message: 'Reply ticket created successfully', replyTicket });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    } 
});


// Get all ticket reply
router.route("/reply/all").get((req, res) => {
    replyTicket.find()
    .then((replyTicket) => {
        if (replyTicket) {
            res.json(replyTicket);
        } else {
            res.status(404).json("Support ticket reply Not Found"); 
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Support ticket reply");
    });
});



module.exports = router;