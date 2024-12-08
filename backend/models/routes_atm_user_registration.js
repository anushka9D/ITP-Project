
const router = require("express").Router();
let userRegistration = require("../models/model_atm_user_registration");

// add new userRegistration
router.route("/add-userRegistration").post((req, res)=> {
    
    const userId = req.body.userId;
    const fName = req.body.fName;
    const lName = req.body.lName;
    const nic = req.body.nic;
    const address= req.body.address;
    const email= req.body.email;
    const userType= req.body.userType;
    const phoneNumber= req.body.phoneNumber;
    const education= req.body.education;
    const password= req.body.password;
    const createDate= req.body.createDate;
    const userStatus= req.body.userStatus;
 

     // creating new object
    const newuserRegistration = new userRegistration({
        userId,
        fName,
        lName,
        nic,
        address,
        email,
        userType,
        phoneNumber,
        education,
        password,
        createDate,
        userStatus
    })

 // creating userRegistration 
    newuserRegistration.save().then(()=>{
        res.json("User Registration Added")
    }).catch((err)=>{
        console.log(err);
        res.status(400).json("Error: " + err);
    })
})

// view all userRegistrations 
router.route("/userRegistrations").get((req, res)=> {
    userRegistration.find().then((userRegistration) => {
        res.json(userRegistration)
    }).catch((err) => {
        console.log(err);
    })
})


// Get a specific userRegistration by ID
router.route("/userRegistration/:id").get((req, res) => {
    const userRegistrationId = req.params.id;

    userRegistration.findById(userRegistrationId)
        .then((userRegistration) => {
            if (userRegistration) {
                res.json(userRegistration);
            } else {
                res.status(404).json("userRegistration Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving userRegistration");
        });
});

// Update userRegistration 
router.route("/update-userRegistration/:id").put(async (req, res) => {
    const userRegistrationId = req.params.id;

    // Object to hold updated fields
    const updateduserRegistration = {
       
        userId : req.body.userId,
        fName : req.body.fName,
        lName : req.body.lName,
        nic : req.body.nic,
        address : req.body.address,
        email : req.body.email,
        userType : req.body.userType,
        phoneNumber : req.body.phoneNumber,
        education : req.body.education,
        password : req.body.password,
        createDate : req.body.createDate,
        userStatus : req.body.userStatus
    };

    try {
        const result = await userRegistration.findByIdAndUpdate(userRegistrationId, updateduserRegistration, { new: true });

        if (result) {
            res.json("User Registration Updated Successfully");
        } else {
            res.status(404).json("userRegistration Not Found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating userRegistration");
    }
});

//change user status
router.route("/update-user-status/:id").put(async (req, res) => {
    const userRegistrationId = req.params.id;

    // Object to hold updated fields
    const updateduserRegistration = {
       
        userId : req.body.userId,
        fName : req.body.fName,
        lName : req.body.lName,
        nic : req.body.nic,
        address : req.body.address,
        email : req.body.email,
        userType : req.body.userType,
        phoneNumber : req.body.phoneNumber,
        education : req.body.education,
        password : req.body.password,
        createDate : req.body.createDate,
        userStatus : "Inactive"
    };

    try {
        const result = await userRegistration.findByIdAndUpdate(userRegistrationId, updateduserRegistration, { new: true });

        if (result) {
            res.json("User Registration Updated Successfully");
        } else {
            res.status(404).json("userRegistration Not Found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating userRegistration");
    }
});



// delete userRegistration 
router.route("/delete-userRegistration/:id").delete(async (req, res) => {
    let userRegistrationId = req.params.id;

    await userRegistration.findByIdAndDelete(userRegistrationId)
        .then(() => {
            res.status(200).send({ status: "userRegistration deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error in delete userRegistration", error: err.message });
        });
});


module.exports = router;
