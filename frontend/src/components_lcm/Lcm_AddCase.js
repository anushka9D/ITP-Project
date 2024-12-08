import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import LcmNavbar from "./Lcm_NavBar";
import Footer from "./Lcm_Footer";

function AddCase() {

    const { lawyerid } = useParams();

    const [caseNumber, setCaseNumber] = useState("CN-2024-00");
    const [procedure, setProcedure] = useState("");
    const [courtType, setCourtType] = useState("");
    const [courtArea, setCourtArea] = useState("");
    const [monetaryValue, setMonetaryValue] = useState("");
    const [caseCreatedDate, setcaseCreatedDate] = useState("");
    const [initialCaseDate, setinitialCaseDate] = useState("");
    const [neededDocuments, setNeededDocuments] = useState("");
    const [nature, setNature] = useState("land");
    const [searchId, setSearchId] = useState("");
    const [client, setClient] = useState({});
    const status = "Pending";
    const lawyerId = lawyerid;
    const navigate = useNavigate();
    const [phoneError, setPhoneError] = useState(false); // Phone number error state

 /*   useEffect(() => {
    // Fetch last caseNumber from the database
    axios.get("http://localhost:8070/case/get_last_case_id")
        .then(res => {
            const lastcase = Number(res.data.caseNumber); // Get last ID from response
            
            console.log("Last Document Call ID:", lastcase);

            // Generate new ID based on lastcase
            const newID = lastcase ? generateNewcaseNumber(Number(lastcase)) : "1"; // Start from 1 if no lastcase
            setCaseNumber(newID);
        })
        .catch(err => {
            console.error("Error fetching last caseNumber", err);
            // Fallback to default ID on error
            setCaseNumber("1");
        });
}, []);

const generateNewcaseNumber = (lastcase) => {
    return (lastcase + 1).toString(); // Increment the last ID and return as a string
};*/



    function sendData(e) {
        e.preventDefault();

        

// Validate phone number format (simple validation)
const phonePattern = /^\d{10}$/; // Assuming a 10-digit phone number
if (!phonePattern.test(client.phone)) {
    setPhoneError(true);
    return; // Prevent form submission
} else {
    setPhoneError(false); // Reset phone error
}

        const newCase = {
            caseNumber,
            procedure,
            courtType,
            courtArea,
            monetaryValue,
            caseCreatedDate,
            initialCaseDate,
            neededDocuments,
            nature,
            lawyerId,
            status,
            clientId: String(client.nic),
            stepsToBeTaken: "Not Yet",
            previousDate: "Not Yet",
            stepsTaken: "Not Yet",
            nextCourtDate: "Not Yet"
        };

        console.log(newCase);
        

        axios.post("http://localhost:8070/case/add_new_case", newCase)
            .then(() => {
                alert("Case added successfully");
                navigate("/Lcm_Dashboard");
            })
            .catch((err) => {
                console.error(err);
                alert("Case added unsuccessfully");
            });
    }

    function searchClient() {
        axios.get(`http://localhost:8070/client/search/nic/${searchId}`)
            .then((res) => {
                setClient(res.data.client);
                console.log("law",lawyerId);
            })
            .catch((err) => {
                console.error(err);
                alert("Client not found");
            });
    }

    function updateClient() {
        if (!client.clientId) return;

        axios.put(`http://localhost:8070/client/update/${client.clientId}`, client)
            .then(() => {
                alert("Client updated successfully");
            })
            .catch((err) => {
                console.error(err);
                alert("Error updating client");
            });
    }

    return (
        <div>
            <LcmNavbar />
            <div className="lcm-addcase-container">
                <div className="lcm-addcase-container-add">
                    <h2 className="lcm-addcase-case-title">Add New Case</h2>
                    <form onSubmit={sendData}>
                        {/* Case Form */}
                        <label htmlFor="lcm-addcase-case-type">Case Type</label>
                        <div className="radio-group">
                            <input 
                                type="radio" 
                                id="land" 
                                name="nature" 
                                value="land" 
                                checked={nature === "land"} 
                                onChange={(e) => setNature(e.target.value)}
                            />
                            <label htmlFor="land">Land</label>
                            <input 
                                type="radio" 
                                id="money-matter" 
                                name="nature" 
                                value="money-matter" 
                                checked={nature === "money-matter"} 
                                onChange={(e) => setNature(e.target.value)}
                            />
                            <label htmlFor="money-matter">Money Matter</label>
                            <input 
                                type="radio" 
                                id="divorce" 
                                name="nature" 
                                value="divorce" 
                                checked={nature === "divorce"} 
                                onChange={(e) => setNature(e.target.value)}
                            />
                            <label htmlFor="divorce">Divorce</label>
                            <input 
                                type="radio" 
                                id="name-change" 
                                name="nature" 
                                value="name-change" 
                                checked={nature === "name-change"} 
                                onChange={(e) => setNature(e.target.value)}
                            />
                            <label htmlFor="name-change">Name Change</label>
                        </div>

                        <div className="lcm-addcase-form-group">
                            <label htmlFor="case-number">Case Number</label>
                            <input 
                                type="text" 
                                id="case-number" 
                                placeholder="e.g. Case Number"
                                value={caseNumber}
                                
                                onChange={(e) => setCaseNumber(e.target.value)} 
                            />
                        </div>

                        <div className="lcm-addcase-form-group">
                            <label htmlFor="procedure">Procedure</label>
                            <input 
                                type="text" 
                                id="procedure" 
                                placeholder="e.g. Procedure (N/A, Normal)"
                                value={procedure}
                                onChange={(e) => setProcedure(e.target.value)} 
                            />
                        </div>

                        <div className="lcm-addcase-form-group">
                            <label htmlFor="court-type">Court Type</label>
                            <select 
                                id="court-type" 
                                value={courtType}
                                onChange={(e) => setCourtType(e.target.value)}
                            >
                                <option value="">Select..</option>
                                <option value="supreme-court">Supreme Court</option>
                                <option value="high-court">High Court</option>
                                <option value="district">District</option>
                                <option value="magistrates-court">Magistrates Court</option>
                            </select>
                        </div>

                        <div className="lcm-addcase-form-group">
                            <label htmlFor="court-area">Court Area</label>
                            <input 
                                type="text" 
                                id="court-area" 
                                placeholder="e.g. Court Area"
                                value={courtArea}
                                onChange={(e) => setCourtArea(e.target.value)} 
                            />
                        </div>

                        <div className="lcm-addcase-form-group">
                            <label htmlFor="monetary-value">Monetary Value</label>
                            <input
                                type="text"
                                id="monetary-value"
                                placeholder="e.g. Monetary Value"
                                value={monetaryValue}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (!isNaN(value)) {
                                        setMonetaryValue(value);
                                    }
                                }}
                            />
                        </div>

                        <div className="lcm-addcase-form-group">
                            <label htmlFor="date">Case Created Date</label>
                            <input 
                                type="date" 
                                id="date" 
                                value={caseCreatedDate}
                                onChange={(e) => setcaseCreatedDate(e.target.value)} 
                            />
                        </div>

                        <div className="lcm-addcase-form-group">
                            <label htmlFor="date">Initial Case Date</label>
                            <input 
                                type="date" 
                                id="date" 
                                value={initialCaseDate}
                                onChange={(e) => setinitialCaseDate(e.target.value)} 
                            />
                        </div>

                        <div className="lcm-addcase-form-group">
                            <label htmlFor="needed-documents">Needed Documents</label>
                            <textarea 
                                id="needed-documents" 
                                rows="4" 
                                placeholder="Police complaint"
                                value={neededDocuments}
                                onChange={(e) => setNeededDocuments(e.target.value)} 
                            />
                        </div>

                        {/* Client Search and Details Form */}
                        <h2 className="lcm-addcase-case-title">Search Client</h2>
                        <div className="form-group search_">
                            <label htmlFor="searchNic">Client NIC</label>
                            <input 
                                type="text" 
                                id="searchNic" 
                                placeholder="Enter Client NIC" 
                                value={searchId} 
                                onChange={(e) => setSearchId(e.target.value)} 
                            />
                            <button type="button" onClick={searchClient} className="lcm-addcase-form-submit">Search</button>
                        </div>

                        <div className="lcm-addcase-form-group">
                            <label htmlFor="client-name">Name</label>
                            <input 
                                type="text" 
                                id="client-name" 
                                value={client.fname} 
                                
                                readOnly 
                            />
                        </div>

                        <div className="lcm-addcase-form-group">
                            <label htmlFor="client-address">Address</label>
                            <input 
                                type="text" 
                                id="client-address" 
                                value={client.address} 
                                
                                readOnly 
                            />
                        </div>

                        <div className="lcm-addcase-form-group">
                            <label htmlFor="client-phone">Phone Number</label>
                            <input 
                                type="text" 
                                id="client-phone" 
                                value={client.phone} 
                                 
                                readOnly 
                            />
                            {phoneError && <p style={{ color: 'red' }}>Invalid phone number. Please enter a valid 10-digit number.</p>}
                        </div>

                        <div className="lcm-addcase-form-group">
                            <label htmlFor="client-nic">NIC</label>
                            <input 
                                type="text" 
                                id="client-nic" 
                                value={client.nic} 
                                
                                readOnly 
                            />
                        </div>

                        <div className="lcm-addcase-buttons">
                            <button type="button" onClick={updateClient} className="lcm-add_new_client">Add New Client</button>
                            <button type="submit" className="lcm-addcase-submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AddCase;