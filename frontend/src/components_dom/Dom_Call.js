import React, { useState, useEffect } from 'react';
import './document_management.css';
import axios from "axios";
import Footer from './Dom_Footer';
import DomNavbar from './Dom_NavBar';
import { useNavigate } from "react-router-dom";

function Dom_Request() {
    const lawerID = "L001";
    const docCallStatues = "Pending";

    const [clientID, setclientID] = useState("");
    const [caseNumber, setcaseNumber] = useState("");
    const [needDocument, setneedDocument] = useState("");
    const [documentCallID, setDocumentCallID] = useState("1");

    const [client, setClient] = useState({});
    const [searchId, setSearchId] = useState("");
    const [error, setError] = useState(false); // Error state
    const [success, setSuccess] = useState(false); // Success state
    const [phoneError, setPhoneError] = useState(false); // Phone number error state

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch last documentCallID from the database
        axios.get("http://localhost:8070/document_call/get_last_document_call")
            .then(res => {
                const lastID = res.data.documentCallID; // Get last ID from response
                console.log("Last Document Call ID:", lastID);

                // Generate new ID based on lastID
                const newID = lastID ? generateNewDocumentCallID(Number(lastID)) : "1"; // Start from 1 if no lastID
                setDocumentCallID(newID);
            })
            .catch(err => {
                console.error("Error fetching last documentCallID", err);
                // Fallback to default ID on error
                setDocumentCallID("1");
            });
    }, []);

    const generateNewDocumentCallID = (lastID) => {
        return (lastID + 1).toString(); // Increment the last ID and return as a string
    };

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

        const newRequest = {
            documentCallID,
            lawerID,
            clientID: String(client.nic),
            caseNumber, 
            needDocument, 
            docCallStatues
        };
        console.log(newRequest);

        axios.post("http://localhost:8070/document_call/add_document_call", newRequest)
            .then(() => {
                console.log("Success response received");
                alert("Document call added successfully");
                navigate("/dom_call_dashboard");
            })
            .catch((err) => {
                console.log("Not Success response received");
                alert("Document call added Unsuccessfully");
            });
    }

    // Search client details
    function searchClient() {
        axios.get(`http://localhost:8070/client/search/nic/${searchId}`)
            .then((res) => {
                setClient(res.data.client);
                setError(false); // Reset error state
                setSuccess(true); // Set success state if client is found
            })
            .catch((err) => {
                console.error(err);
                setError(true); // Set error state if client is not found
                setSuccess(false); // Reset success state
            });
    }

    return (
        <div>
            <DomNavbar/>
            <div className="dom-dashboard-container">
                <h1 className="dom-dashboard-h1">Document Call Form</h1>

                {/* Client Search and Details Form */}

                <div className="dom-dashboard-form-group search_">
                    <label className="dom-dashboard-label" htmlFor="searchNic">Search Client</label>
                    <input className="dom-dashboard-input" type="text" id="searchNic" placeholder="Enter Client NIC" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                    <button type="button" onClick={searchClient} className={`dom-dashboard-search-call-form ${error ? 'error' : success ? 'success' : ''}`} > Search </button>
                </div>
                {error && <p style={{ color: 'red',fontSize:'20px' }}>Client not availabel. Please find another Client</p>}
                {success && <p style={{ color: 'green',fontSize:'20px' }}>Client is availabel</p>}
                <br/><br/>
                <hr/><br/>

                <div className="dom-dashboard-form-group">
                    <label className="dom-dashboard-label" htmlFor="client-name">Name</label>
                    <input className="dom-dashboard-input" type="text" id="client-name" value={`${client.fname || ''} ${client.lname || ''}`} readOnly />
                </div>

                <div className="dom-dashboard-form-group">
                    <label className="dom-dashboard-label" htmlFor="client-address">Address</label>
                    <input className="dom-dashboard-input" type="text" id="client-address" value={client.address}readOnly />
                </div>

                <div className="dom-dashboard-form-group">
                    <label className="dom-dashboard-label" htmlFor="client-phone">Phone Number</label>
                    <input className="dom-dashboard-input" type="text" id="client-phone" value={client.phone} readOnly/>
                    {phoneError && <p style={{ color: 'red' }}>Invalid phone number. Please enter a valid 10-digit number.</p>}
                </div>

                <form onSubmit={sendData}>
                    <label className="dom-dashboard-label">Client ID:</label>
                    <input className="dom-dashboard-input" type="text" readOnly value={client.nic} onChange={(e) => setclientID(e.target.value)} />
                    <br/>

                    <label className="dom-dashboard-label">Case Number:</label>
                    <input className="dom-dashboard-input" type="text" required onChange={(e) => setcaseNumber(e.target.value)} />
                    <br/>

                    <label className="dom-dashboard-label">Need Document:</label>
                    <textarea className="dom-dashboard-input" required onChange={(e) => setneedDocument(e.target.value)} />
                    <br/>

                    <button className="dom-dashboard-call-submit-btn" type="submit">Submit</button>
                </form>
            </div>

            <Footer/>
        </div>
    );
};

export default Dom_Request;

