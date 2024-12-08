const router = require("express").Router();
let userRegistration = require("../models/model_atm_attorney_manager"); // Update model name (might need adjustment)

// Add a new userRegistration
router.route("/add-attorney-manager").post((req, res) => {

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

  // Creating new object
  const newUserRegistration = new userRegistration({
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
    userStatus,
  });

  // Creating userRegistration
  newUserRegistration.save().then(() => {
    res.json("Attorney Manager Added"); // Updated message
  }).catch((err) => {
    console.log(err);
    res.status(400).json("Error: " + err);
  });
});


// View all userRegistrations
router.route("/").get((req, res) => {
  userRegistration.find().then((userRegistration) => {
    res.json(userRegistration);
  }).catch((err) => {
    console.log(err);
  });
});


// Get a specific userRegistration by ID
router.route("/:id").get((req, res) => {
  const userId = req.params.id;

  userRegistration.findOne({ userId: userId })
    .then((userRegistration) => {
      if (userRegistration) {
        res.json(userRegistration);
      } else {
        res.status(404).json("Attorney Manager Not Found"); // Updated message
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Error in Retrieving Attorney Manager"); // Updated message
    });
});

// Update userRegistration
router.route("/update/:id").put(async (req, res) => {
  const userRegistrationId = req.params.id;

  // Object to hold updated fields
  const updateduserRegistration = {

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
    const result = await userRegistration.findByIdAndUpdate(userRegistrationId, updateduserRegistration, { new: true });

    if (result) {
      res.json("Attorney Manager Updated Successfully"); // Updated message
    } else {
      res.status(404).json("Attorney Manager Not Found"); // Updated message
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Error in Updating Attorney Manager"); // Updated message
  }
});

// Delete userRegistration
router.route("/delete/:id").delete(async (req, res) => {
  let userRegistrationId = req.params.id;

  await userRegistration.findByIdAndDelete(userRegistrationId)
    .then(() => {
      res.status(200).send({ status: "Attorney Manager Deleted" }); // Updated message
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error in deleting Attorney Manager", error: err.message }); // Updated message
    });
});

// Login
router.route("/login").post(async (req, res) => {
    const { userId, password } = req.body;
  
    try {
      const attorneyManager = await userRegistration.findOne({ userId, password });
  
      if (!attorneyManager) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      res.status(200).json({ attorneyManager: attorneyManager });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;