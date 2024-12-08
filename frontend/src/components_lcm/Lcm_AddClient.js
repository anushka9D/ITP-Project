import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LcmNavbar from "./Lcm_NavBar";
import Footer from "./Lcm_Footer";

function AddClient() {
    const [clientId, setClientId] = useState("");
    const [clientName, setClientName] = useState("");
    const [clientAddress, setClientAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [caseAssigned, setCaseAssigned] = useState("");
    const [nic, setNic] = useState("");
    const navigate = useNavigate();

    function sendData(e) {
        e.preventDefault();

        const newClient = {
            clientId,
            name: clientName,
            phone: phoneNumber,
            email,
            address: clientAddress,
            caseAssigned,
            nic
        };

        axios.post("http://localhost:8070/client/add", newClient)
            .then(() => {
                alert("Client added successfully");
                navigate("/Lcm_Dashboard");
            })
            .catch((err) => {
                console.error(err);
                alert("Error adding client: " + (err.response?.data?.error || "Unknown error"));
            });
    }

    return (
        <div>
            <LcmNavbar />
            <div className="container-add">
                <h2 className="client-title">Add New Client</h2>
                <form onSubmit={sendData}>
                    <div className="form-group">
                        <label htmlFor="client-id">Client ID</label>
                        <input 
                            type="text" 
                            id="client-id" 
                            placeholder="Enter client ID"
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="client-name">Client Name</label>
                        <input 
                            type="text" 
                            id="client-name" 
                            placeholder="Enter client name"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="client-address">Client Address</label>
                        <input 
                            type="text" 
                            id="client-address" 
                            placeholder="Enter client address"
                            value={clientAddress}
                            onChange={(e) => setClientAddress(e.target.value)} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone-number">Phone Number</label>
                        <input 
                            type="text" 
                            id="phone-number" 
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="case-assigned">Case Assigned</label>
                        <input 
                            type="text" 
                            id="case-assigned" 
                            placeholder="Enter case assigned"
                            value={caseAssigned}
                            onChange={(e) => setCaseAssigned(e.target.value)} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nic">NIC</label>
                        <input 
                            type="text" 
                            id="nic" 
                            placeholder="Enter NIC"
                            value={nic}
                            onChange={(e) => setNic(e.target.value)} 
                        />
                    </div>

                    <div className="buttons">
                    <button
            type="button"
            className="btn-btn-view-previous-case"
            onClick={() => navigate("/Lcm_ClientCDashboard")}
          >
            View my Cases
          </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default AddClient;
