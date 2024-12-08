const router = require("express").Router();
let appointmentRequest = require("../models/model_apm_appointment_request");

router.route("/add-appointment-request").post((req, res) => {
    const appointmentRequestName = req.body.appointmentRequestName;
    const appointmentRequestDate = new Date(req.body.appointmentRequestDate);
    const appointmentRequestStatus = req.body.appointmentRequestStatus;
    const lawyerId = req.body.lawyerId;
    const clientId = req.body.clientId;   
    const appointmentType = req.body.appointmentType;
    const appointmentDate = new Date(req.body.appointmentDate);
    const appointmentTime = req.body.appointmentTime;
    const appointmentLocation = req.body.appointmentLocation;    

    // creating new object
    const newAppointmentRequest = new appointmentRequest({
        appointmentRequestName,
        appointmentRequestDate,
        appointmentRequestStatus,
        lawyerId,
        clientId,
        appointmentType,
        appointmentDate,
        appointmentTime,
        appointmentLocation
    })

    // creating appointment request
    newAppointmentRequest.save().then(()=>{
        res.json("New Appointment Request Added");
        }).catch((err)=>{
                console.log(err);
            })
})


// view all appointment request
router.route("/").get((req, res)=> {
    appointmentRequest.find().then((appointmentrequests) => {
        res.json(appointmentrequests)
    }).catch((err) => {
        console.log(err);
    })
})


// Get a specific appointment request by ID
router.route("/:id").get((req, res) => {
    const appointmentRequestId = req.params.id;

    appointmentRequest.findById(appointmentRequestId)
        .then((appointmentRequest) => {
            if (appointmentRequest) {
                res.json(appointmentRequest);
            } else {
                res.status(404).json("Appointment Request Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Appointment Request");
        });
});


router.route("/view/:id").get((req, res) => {
    const appointmentRequestId = req.params.id;

    appointmentRequest.findById(appointmentRequestId)
        .then((appointmentRequest) => {
            if (appointmentRequest) {
                res.json(appointmentRequest);
            } else {
                res.status(404).json("Appointment Request Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Appointment Request");
        });
});

// Update appointment request
router.route("/update/:id").put(async (req, res) => {
    const appointmentRequestId = req.params.id;

    // Object to hold updated fields
    const updatedAppointmentRequest = {
        appointmentRequestName: req.body.appointmentRequestName,
        appointmentRequestDate: new Date(req.body.appointmentRequestDate),
        appointmentRequestStatus: req.body.appointmentRequestStatus,
        lawyerId: req.body.lawyerId,
        clientId: req.body.clientId,              
        appointmentType: req.body.appointmentType,
        appointmentDate: new Date(req.body.appointmentDate), 
        appointmentTime: req.body.appointmentTime,
        appointmentLocation: req.body.appointmentLocation,
    };

    try {
        const result = await appointmentRequest.findByIdAndUpdate(appointmentRequestId, updatedAppointmentRequest, { new: true });

        if (result) {
            res.json("Appointment Request Updated Successfully");
        } else {
            res.status(404).json("Appointment Request Not Found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating Appointment Request");
    }
});


// delete appointment request
router.route("/delete/:id").delete(async(req, res)=> {
    let appointmentRequestId = req.params.id;

    await appointmentRequest.findByIdAndDelete(appointmentRequestId).then(()=> {
        res.status(200).send({status:"Appointment Request Deleted"});
    }).catch((err)=> {
        console.log(err.messsage);
        res.status(500).send({status:"Error in Appointment Request Delete", error:err.messsage})
    })
})


// -------- dashboards ------------
//appointment manager dashboard - all pending appointments (for any appointment manager)
router.route("/pending/all").get((req, res) => {
 
    appointmentRequest.find({ appointmentRequestStatus: "Pending" })
    .then((appointmentRequests) => {
        if (appointmentRequests.length > 0) {
            res.status(200).json(appointmentRequests);  
        } else {
            res.status(404).json({ message: "Appointment Request Not Found" });
        }
    })
    .catch((err) => {
        console.error(err); 
        res.status(500).json({ message: "Error in Retrieving Appointment Request", error: err.message });
    });
});



//appointment manager dashboard - all pending appointments (for specific appointment manager)
router.route("/pending/appointment-manager/:id").get((req, res) => {
    const appointmentManagerId = req.params.id;

    appointmentRequest.find({ appointmentRequestStatus: "Pending", appointmentManagerId: appointmentManagerId })
    .then((appointmentRequests) => {
        if (appointmentRequests.length > 0) {
            res.json(appointmentRequests);
        } else {
            res.status(404).json("Appointment Request Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Appointment Request");
    });
});


//lawyer dashboard - all pending appointments (for specific lawyer)
router.route("/pending/lawyer/:id").get((req, res) => {
    const lawyerId = req.params.id;

    appointmentRequest.find({ appointmentRequestStatus: "Pending", lawyerId: lawyerId })
    .then((appointmentRequests) => {
        if (appointmentRequests.length > 0) {
            res.json(appointmentRequests);
        } else {
            res.status(404).json("Appointment Request Not Found");
        } 
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Appointment Request");
    });
});


//client dashboard - all pending appointments (for specific client)
router.route("/pending/client/:id").get((req, res) => {
    const clientId = req.params.id;

    appointmentRequest.find({ appointmentRequestStatus: "Pending", clientId: clientId })
    .then((appointmentRequests) => {
        if (appointmentRequests.length > 0) {
            res.json(appointmentRequests);
        } else {
            res.status(404).json("Appointment Request Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Appointment Request");
    });
});


//appointment manager dashboard - all appointments (for specific appointment manager)
router.route("/appointment-manager/:id").get((req, res) => {
    const appointmentManagerId = req.params.id;

    appointmentRequest.find({ appointmentManagerId: appointmentManagerId })
    .then((appointmentRequests) => {
        if (appointmentRequests.length > 0) {
            res.json(appointmentRequests);
        } else {
            res.status(404).json("Appointment Request Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Appointment Request");
    });
});


//lawyer dashboard - all appointments (for specific lawyer)
router.route("/lawyer/:id").get((req, res) => {
    const lawyerId = req.params.id;

    appointmentRequest.find({ lawyerId: lawyerId })
    .then((appointmentRequests) => {
        if (appointmentRequests.length > 0) {
            res.json(appointmentRequests);
        } else {
            res.status(404).json("Appointment Request Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Appointment Request");
    });
});


//client dashboard - all appointments (for specific client)
router.route("/client/:id").get((req, res) => {
    const clientId = req.params.id;

    appointmentRequest.find({ clientId: clientId })
    .then((appointmentRequests) => {
        if (appointmentRequests.length > 0) {
            res.json(appointmentRequests);
        } else {
            res.status(404).json("Appointment Request Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Appointment Request");
    });
});


// count for chart data
router.route("/pending/count").get((req, res) => {
    appointmentRequest.countDocuments({ appointmentRequestStatus: "Pending" })
    .then((count) => {
        res.json({ count });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
    });
});

router.route("/created/count").get((req, res) => {
    appointmentRequest.countDocuments({ appointmentRequestStatus: "Created" })
    .then((count) => {
        res.json({ count });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
    });
});

// bar chart
router.route("/graph/appointments-by-date").get((req, res) => {
    appointmentRequest.aggregate([
        {
            $match: { appointmentRequestStatus: "Pending" } // Match only pending appointment requests
        },
        {
            $group: {
                _id: { 
                    $dateToString: { format: "%Y-%m-%d", date: "$appointmentDate", timezone: "Asia/Colombo" }
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ])
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(500).json({ error: err.message });
    });
});


router.post('/appointmentrequest', async (req, res) => {
    try {
        const appointmentRequest = new AppointmentRequest(req.body);
        await appointmentRequest.save();
        res.status(201).json({ message: 'Appointment request created successfully', appointmentRequest });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.route("/update/status/:id").put(async (req, res) => {
    const appointmentRequest = req.params.id;

    // Object to hold updated fields
    const updatedAppointmentRequest = {
        appointmentRequestStatus: "Replied"
    };

    try {
        // Assuming you have imported the AppointmentRequest model
        const result = await AppointmentRequest.findByIdAndUpdate(appointmentRequestId, updatedAppointmentRequest, { new: true });

        if (result) {
            res.json("Appointment Updated Successfully");
        } else {
            res.status(404).json("Appointment Not Found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating Appointment");
    }
});


module.exports = router;