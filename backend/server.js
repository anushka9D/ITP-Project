const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// port number
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

// database link
const URL = process.env.MONGODB_URL;

// connect to mongoDB
mongoose.connect(URL);

// opening connection
const connection = mongoose.connection; 
connection.once("open", () => {
    console.log("Mongodb Connection Success!!..");
});

// runnung on port
app.listen(PORT, () => {
    console.log(`Server is up and running on port : ${PORT}`);
});


//appointment management
const appointmentRequestRouter = require("./routes/routes_apm_appointment_request.js");
app.use("/appointmentrequest", appointmentRequestRouter);

const appointmentRouter = require("./routes/routes_apm_appointment.js");
app.use("/appointment", appointmentRouter);


//support agent
const supportTicketRouter = require("./routes/routes_sup_support_ticket.js");
app.use("/supportticket", supportTicketRouter);

const replyTicketRouter = require("./routes/routes_sup_reply_ticket.js");
app.use("/replyticket", replyTicketRouter); 


// Route for new cases
const newcaseRouter = require("./routes/routes_lcm_newcase.js");
app.use("/case", newcaseRouter);


//access to route for document
const documentRequestRouter = require("./routes/routes_apm_document_request.js");
app.use("/document_request", documentRequestRouter);

//access to route for document
const documentCallRouter = require("./routes/routes_apm_document_call.js");
app.use("/document_call", documentCallRouter);


//client
const clientRouter = require("./routes/routes_cli_clients.js");
app.use("/client", clientRouter);

//access to route for messages
const messageRouter = require("./routes/routes_message.js");
app.use("/message", messageRouter);

//route to search case & deed in client_portal
const searchRoutes = require("./routes/routes_cli_search.js");
app.use("/api/search", searchRoutes);


//finance management
const paymentRQRouter = require("./routes/routes_fin_Payement_form.js");
app.use("/paymentRQ", paymentRQRouter);

const paymentProofRouter = require("./routes/routes_fin_payment_proof.js");
app.use("/paymentProof", paymentProofRouter);


//deed management
const deedsRouter = require("./routes/routes_deed");
app.use("/deeds", deedsRouter);
app.use("/client", deedsRouter);
app.use("/deedmanager", deedsRouter);

//users - attorney management
const appointmentManagerRouter = require("./routes/routes_atm_user_appointment_manager.js");
app.use("/appointmentmanager", appointmentManagerRouter);

const supportAgentRouter = require("./routes/routes_atm_user_support_agent.js");
app.use("/supportagent", supportAgentRouter);

const documentManagerRouter = require("./routes/routes_atm_user_document_manager.js");
app.use("/documentmanager", documentManagerRouter);

const legalCaseManagerRouter = require("./routes/routes_atm_user_legal_case_manager.js");
app.use("/legalcasemanager", legalCaseManagerRouter);

const financeManagerRouter = require("./routes/routes_atm_user_finance_manager.js");
app.use("/financemanager", financeManagerRouter);

const deedManagerRouter = require("./routes/routes_atm_user_deed_manager.js");
app.use("/deedmanager", deedManagerRouter);

const attorneyManagerRouter = require("./routes/routes_atm_user_attorney_manager.js");
app.use("/attorneymanager", attorneyManagerRouter);

const userRegistrationRouter = require("./routes/routes_atm_user_registration.js");
// Using routes
app.use("/userRegistration", userRegistrationRouter);

const lawfirmRouter = require("./routes/routes_atm_lawfirm.js");
app.use("/lawfirm", lawfirmRouter);