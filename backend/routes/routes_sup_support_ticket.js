const router = require("express").Router();
let supportTicket = require("../models/model_sup_support_ticket");

router.route("/add-support-ticket").post((req, res) => {
    const supTicketDate = new Date(req.body.supTicketDate);
	const userType = req.body.userType;
    const clientId = req.body.clientId;   
    const supTicketType = req.body.supTicketType;
    const supTicketEmail = req.body.supTicketEmail;
    const supFormPhone = req.body.supFormPhone;
    const supTicketSubject = req.body.supTicketSubject; 
    const supTicketMsg = req.body.supTicketMsg;    
	const supTicketStatus = req.body.supTicketStatus;    


    // creating new object
    const newSupportTicket = new supportTicket({
		 supTicketDate,
	     userType,
	     clientId, 
		 supTicketType,
		 supTicketEmail,
		 supFormPhone,
		 supTicketSubject, 
		 supTicketMsg,    
		 supTicketStatus		
    })

    // creating support Ticket 
    newSupportTicket.save().then(()=>{
        res.json("New Support Ticket Added");
        }).catch((err)=>{
                console.log(err);
            });
})

// Get all support ticket
router.route("/all").get((req, res) => {
        supportTicket.find()
        .then((supportTicket) => {
            if (supportTicket) {
                res.json(supportTicket);
            } else {
                res.status(404).json("Support ticket Not Found"); 
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Support ticket");
        });
});



// Get a specific support ticket  by ID
router.route("/:id").get((req, res) => {
    const supportTicketId = req.params.id;

    supportTicket.findById(supportTicketId)
        .then((supportTicket) => {
            if (supportTicket) {
                res.json(supportTicket);
            } else {
                res.status(404).json("Support ticket Not Found"); 
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Support ticket");
        });
});


// Update support ticket
router.route("/update/:id").put(async (req, res) => {
    const supportTicketId = req.params.id;

    // Object to hold updated fields
    const updatedSupportTicket = {
        supTicketDate: new Date(req.body.supTicketDate),
        userType: req.body.userType,
        clientId: req.body.clientId,
        supTicketType: req.body.supTicketType,
        supTicketEmail: req.body.supTicketEmail,
        supFormPhone: req.body.supFormPhone,
        supTicketSubject: req.body.supTicketSubject,
        supTicketMsg: req.body.supTicketMsg,
        supTicketStatus: req.body.supTicketStatus
    };

    try {
        const result = await supportTicket.findByIdAndUpdate(supportTicketId, updatedSupportTicket, { new: true });

        if (result) {
            res.json("Support Ticket Updated Successfully");
        } else {
            res.status(404).json("Support Ticket Not Found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating Support Ticket");
    }
});

router.route("/update/status/:id").put(async (req, res) => {
    const supportTicketId = req.params.id;

    // Object to hold updated fields
    const updatedSupportTicket = {
        supTicketStatus: "Replied"
    };

    try {
        const result = await supportTicket.findByIdAndUpdate(supportTicketId, updatedSupportTicket, { new: true });

        if (result) {
            res.json("Support Ticket Updated Successfully");
        } else {
            res.status(404).json("Support Ticket Not Found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating Support Ticket");
    }
});




// delete Support Ticket
router.route("/delete/:id").delete(async(req, res)=> {
    let supportTicketId = req.params.id;

    await supportTicket.findByIdAndDelete(supportTicketId).then(()=> {
        res.status(200).send({status:"Support Ticket Deleted"});
    }).catch((err)=> {
        console.log(err.messsage);
        res.status(500).send({status:"Error in Support Ticket Delete", error:err.messsage})
    })
})


// -------- dashboards ------------
//support agent dashboard - all support tickets (for specific support agent)
router.route("/pending/all").get((req, res) => {
 
    supportTicket.find({ supTicketStatus: "Pending" })
    .then((supportTickets) => {
        if (supportTickets.length > 0) {
            res.status(200).json(supportTickets);  
        } else {
            res.status(404).json({ message: "Support Tickets Not Found" });
        }
    })
    .catch((err) => {
        console.error(err); 
        res.status(500).json({ message: "Error in Retrieving Support Tickets", error: err.message });
    });
});


//client dashboard - all  pending Support Tickets (for specific client)
router.route("/pending/client/:id").get((req, res) => {
    const clientId = req.params.id;

    supportTicket.find({ supTicketStatus: "Pending", clientId: clientId })
    .then((supportTickets) => {
        if (supportTickets.length > 0) {
            res.json(supportTickets);
        } else {
            res.status(404).json("Support Tickets Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Support Ticket");
    });
});




//support agent dashboard - all support tickets (for specific support agent)
router.route("/support-agent/:id").get((req, res) => {
    const supportAgentId = req.params.id;

    supportTicket.find({ supportAgentId: supportAgentId })
    .then((supportTickets) => {
        if (supportTickets.length > 0) {
            res.json(supportTickets);
        } else {
            res.status(404).json("Support ticket Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Support ticket");
    });
});




//client dashboard - all support tickets (for specific client)
router.route("/client/:id").get((req, res) => {
    const clientId = req.params.id;

    supportTicket.find({ clientId: clientId })
    .then((supportTickets) => {
        if (supportTickets.length > 0) {
            res.json(supportTickets);
        } else {
            res.status(404).json("Support ticket Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Support ticket");
    });
});


// Support ticket count route
router.get("/count", async (req, res) => {
    try {
        // Count total tickets
        const totalCount = await SupportTicket.countDocuments();
        
        // Count replied tickets
        const repliedCount = await SupportTicket.countDocuments({ supTicketStatus: 'Replied' });

        // Respond with both counts
        res.status(200).json({ total: totalCount, replied: repliedCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//for count (pie chart)
router.route("/pending/count").get((req, res) => {
    supportTicket.countDocuments({ supTicketStatus: "Pending" })
    .then((count) => {
        res.json({ count });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
    });
});

router.route("/replied/count").get((req, res) => {
    supportTicket.countDocuments({ supTicketStatus: "Replied" })
    .then((count) => {
        res.json({ count });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
    });
});



router.post('/supportticket', async (req, res) => {
    try {
        const ticket = new SupportTicket(req.body);
        await ticket.save();
        res.status(201).json({ message: 'Support ticket created successfully', ticket });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;

