const router = require("express").Router();
let lawfirm = require("../models/model_atm_lawfirm");

// Add new lawfirm
router.route("/add-lawfirm").post((req, res) => {
    const { lawFirmId,name, address, contactNumber, registrationNo,lawyerId } = req.body;

    const newlawfirm = new lawfirm({
        lawFirmId,
        name,
        address,
        contactNumber,
        registrationNo,
        lawyerId
    });

    newlawfirm.save()
        .then(() => res.json("LawFrim Added"))
        .catch((err) => res.status(400).json("Error: " + err));
});

// View all lawfirms
router.route("/lawfirms").get((req, res) => {
    lawfirm.find()
        .then(lawfirms => res.json(lawfirms))
        .catch(err => res.status(400).json("Error: " + err));
});

// Get a specific lawfirm by ID
router.route("/lawfirm/:id").get((req, res) => {
    lawfirm.findById(req.params.id)
        .then(lawfirm => {
            if (lawfirm) {
                res.json(lawfirm);
            } else {
                res.status(404).json("Lawfirm Not Found");
            }
        })
        .catch(err => res.status(500).json("Error: " + err));
});

router.route("/update-lawfirm/:id").put((req, res) => {
    lawfirm.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(lawfirm => {
        if (lawfirm) {
          res.json("Lawfirm Updated Successfully");
        } else {
          res.status(404).json("Lawfirm Not Found");
        }
      })
      .catch(err => res.status(500).json("Error: " + err));
  });
  
// Delete lawfirm
router.route("/delete-lawfirm/:id").delete((req, res) => {
    lawfirm.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json("Lawfirm deleted"))
        .catch(err => res.status(500).json("Error: " + err));
});

module.exports = router;