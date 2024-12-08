const router = require("express").Router();
let userRegistration = require("../models/model_atm_deed_manager");

// add new userRegistration
router.route("/add-deed-manager").post((req, res)=> {
    
    const userId = req.body.userId;
    const fName = req.body.fName;
    const lName = req.body.lName;
    const nic = req.body.nic;
    const address= req.body.address;
    const email= req.body.email;
    const phoneNumber= req.body.phoneNumber;
    const education= req.body.education;
    const password= req.body.password;
    const createdDate= req.body.createdDate;
    const userStatus= req.body.userStatus;    
    

     // creating new object
    const newuserRegistration = new userRegistration({
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
    })

 // creating userRegistration 
    newuserRegistration.save().then(()=>{
        res.json("Deed Manager Added")
    }).catch((err)=>{
        console.log(err);
        res.status(400).json("Error: " + err);
    })
})


// view all userRegistrations 
router.route("/view-all-deed-managers").get((req, res)=> {
    userRegistration.find().then((userRegistration) => {
        res.json(userRegistration)
    }).catch((err) => {
        console.log(err);
    })
})


// Get a specific userRegistration by ID
router.route("/view-deed-manager/:id").get((req, res) => {
    const userId = req.params.id;

    userRegistration.findOne({userId : userId})
        .then((userRegistration) => {
            if (userRegistration) {
                res.json(userRegistration);
            } else {
                res.status(404).json("Deed Manager Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Deed Manager");
        });
});

// Update userRegistration 
router.route("/update-deed-manager/:id").put(async (req, res) => {
    const userRegistrationId = req.params.id;

    // Object to hold updated fields
    const updateduserRegistration = {
       
        userId : req.body.userId,
        fName : req.body.fName,
        lName : req.body.lName,
        nic : req.body.nic,
        address : req.body.address,
        email : req.body.email,
        phoneNumber : req.body.phoneNumber,
        education : req.body.education,
        password : req.body.password,
        createdDate : req.body.createdDate,
        userStatus : req.body.userStatus
    };

    try {
        const result = await userRegistration.findByIdAndUpdate(userRegistrationId, updateduserRegistration, { new: true });

        if (result) {
            res.json("Deed Manager Updated Successfully");
        } else {
            res.status(404).json("Deed Manager Not Found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating Deed Manager");
    }
});

// delete userRegistration 
router.route("/delete-deed-manager/:id").delete(async (req, res) => {
    let userRegistrationId = req.params.id;

    await userRegistration.findByIdAndDelete(userRegistrationId)
        .then(() => {
            res.status(200).send({ status: "Deed Manager Deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error in delete Deed Manager", error: err.message });
        });
});


//login
router.route("/login").post(async (req, res) => {
    const { userId, password } = req.body;

    try {
        const deedManager = await userRegistration.findOne({ userId, password });

        if (!deedManager) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ deedManager: deedManager });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;