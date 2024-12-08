const router = require("express").Router();
let appointment = require("../models/model_apm_appointment");

// add new appointment
router.route("/add-appointment").post((req, res) => {
    const appointmentRequestId = req.body.appointmentRequestId;
    const appointmentManagerId = req.body.appointmentManagerId;
    const lawyerId = req.body.lawyerId;
    const clientId = req.body.clientId;
    const appointmentCreationDate = new Date(); 
    const appointmentTitle = req.body.appointmentTitle;
    const appointmentDescription = req.body.appointmentDescription;
    const appointmentStatus = req.body.appointmentStatus;

    // creating new object
    const newAppointment = new appointment({
        appointmentRequestId,
        appointmentManagerId,                
        lawyerId,
        clientId,
        appointmentCreationDate,
        appointmentTitle,
        appointmentDescription,
        appointmentStatus
    })

    // creating appointment request
    newAppointment.save().then(()=>{
        res.json("New Appointment Added..");
        }).catch((err)=>{
                console.log(err);
                res.status(400).json("Error: " + err);
            })
})


// view specific appointment by ID
router.route("/view/:id").get((req, res) => {
    const appointmentId = req.params.id;
        
    appointment.findById(appointmentId)
        .then((appointment) => {
            if (appointment) {
                res.json(appointment);
            } else {
                res.status(404).json("Appointment Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Appointment");
        }); 
});


// Update appointment request
router.route("/update/:id").put(async (req, res) => {
    const appointmentId = req.params.id;

    // Object to hold updated fields
    const updatedAppointment = {
        appointmentRequestId: req.body.appointmentRequestId,
        appointmentManagerId: req.body.appointmentManagerId,        
        lawyerId: req.body.lawyerId,
        clientId: req.body.clientId,
        appointmentCreationDate: new Date(),
        appointmentTitle: req.body.appointmentTitle,
        appointmentDescription: req.body.appointmentDescription,
        appointmentStatus: req.body.appointmentStatus
    };

    try {
        const result = await appointment.findByIdAndUpdate(appointmentId, updatedAppointment, { new: true });

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


// delete appointment request
router.route("/delete/:id").delete(async(req, res)=> {
    let appointmentId = req.params.id;

    await appointment.findByIdAndDelete(appointmentId).then(()=> {
        res.status(200).send({status:"Appointment deleted"});
    }).catch((err)=> {
        console.log(err.messsage);
        res.status(500).send({status:"Error in delete appointment", error:err.messsage})
    })
});


// -------- dashboards ------------
//appointment manager dashboard - all pending appointments (for specific appointment manager)
router.route("/pending/appointment-manager/:id").get((req, res) => {
    const appointmentManagerId = req.params.id;

    appointment.find({ appointmentStatus: "Pending", appointmentManagerId: appointmentManagerId})
    .then((appointment) => {
        if (appointment.length > 0) {
            res.json(appointment);
        } else {
            res.status(404).json("Appointment Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Appointment");
    });
});


//lawyer dashboard - all pending appointments (for specific lawyer)
router.route("/pending/lawyer/:id").get((req, res) => {
    const lawyerId = req.params.id;

    appointment.find({ appointmentStatus: "Pending", lawyerId: lawyerId})
    .then((appointment) => {
        if (appointment.length > 0) {
            res.json(appointment);
        } else {
            res.status(404).json("Appointment Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Appointment");
    });
});


//client dashboard - all pending appointments (for specific client)
router.route("/pending/client/:id").get((req, res) => {
    const clientId = req.params.id;

    appointment.find({ appointmentStatus: "Pending", clientId: clientId})
    .then((appointment) => {
        if (appointment.length > 0) {
            res.json(appointment);
        } else {
            res.status(404).json("Appointment Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Appointment");
    });
});


//appointment manager dashboard - all appointments (for specific appointment manager)
router.route("/appointment-manager/:id").get((req, res) => {
    const appointmentManagerId = req.params.id;

    appointment.find({ appointmentManagerId: appointmentManagerId })
    .then((appointment) => {
        if (appointment.length > 0) {
            res.json(appointment);
        } else {
            res.status(404).json("Appointment Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Appointment");
    });
});


//lawyer dashboard - all appointments (for specific lawyer)
router.route("/lawyer/:id").get((req, res) => {
    const lawyerId = req.params.id;

    appointment.find({ lawyerId: lawyerId })
    .then((appointment) => {
        if (appointment.length > 0) {
            res.json(appointment);
        } else {
            res.status(404).json("Appointment Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Appointment");
    });
});


//client dashboard - all appointments (for specific client)
router.route("/client/:id").get((req, res) => {
    const clientId = req.params.id;

    appointment.find({ clientId: clientId })
    .then((appointment) => {
        if (appointment.length > 0) {
            res.json(appointment);
        } else {
            res.status(404).json("Appointment Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Appointment");
    });
});

router.post('/appointments', async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json({ message: 'Appointment created successfully', appointment });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;