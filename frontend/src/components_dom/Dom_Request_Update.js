import React, { useState, useEffect } from "react";
import './document_management.css';
import axios from "axios";
import Footer from './Dom_Footer';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Dom_Request_Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showdocumentRequest, getdocumentRequest] = useState({});
    const [showdclient, setshowdclient] = useState([]);
    const searchId = Number(showdocumentRequest.clientID);

    useEffect(() => {
        function get_client_details() {
            axios
                .get(`http://localhost:8070/client/getByNic/${searchId}`)
                .then((res) => {
                    setshowdclient(res.data.client);
                })
                .catch((err) => {
                    console.error(err.response ? err.response.data : err.message);
                    alert("Failed to fetch client details.");
                });
        }
    
        if (searchId) {
            get_client_details();
        }
    }, [searchId]);
    
    useEffect(() => {
        async function get_all_document_request() {
            try {
                const res = await axios.get(`http://localhost:8070/document_request/get/${id}`);
                getdocumentRequest(res.data.documentrequest);
            } catch (err) {
                alert(err.message);
            }
        }
        get_all_document_request();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        getdocumentRequest((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8070/document_request/update/${id}`, showdocumentRequest);
            alert("Document updated successfully!");
            navigate('/dom_dashboard');

        } catch (err) {
            alert(err.message);
        }
    };

    return (
    <div>
        <div className="dom-dashboard-container">
            <h1 className="dom-dashboard-h1">Document Request Update Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="dom-dashboard-not-edit-table">
                    <label className="dom-dashboard-label">Document ID:</label>
                    <input className="dom-dashboard-input" type="text" value={`DOR-000${String(showdocumentRequest.documentRequestID)}`} readOnly />

                    <label className="dom-dashboard-label">Document ID:</label>
                    <input className="dom-dashboard-input" type="text" value={showdocumentRequest.documentCallID} readOnly />

                    <label className="dom-dashboard-label">Lawer ID:</label>
                    <input className="dom-dashboard-input" type="text" value={showdocumentRequest.lawerID} readOnly />

                    <label className="dom-dashboard-label"l>Client ID:</label>
                    <input className="dom-dashboard-input" type="text" value={showdocumentRequest.clientID} readOnly />

                    <label className="dom-dashboard-label">Client Name:</label>
                    <input className="dom-dashboard-input" type="text" value={`${showdclient.fname} ${showdclient.lname}`} readOnly />

                    <label className="dom-dashboard-label">Client Phone:</label>
                    <input className="dom-dashboard-input" type="text" value={showdclient.phone} readOnly />
                    <br /><br />
                    <hr />
                    <br /><br />
                    <label className="dom-dashboard-label">Deadline:</label>
                    <input 
                        type="date" 
                        name="documentDeadline" 
                            className="dom-dashboard-input"
                        required 
                        value={showdocumentRequest.documentDeadline} 
                        onChange={handleChange} 
                    />

                    <label className="dom-dashboard-label">Instruction:</label>
                    <textarea 
                        name="instruction" 
                            className="dom-dashboard-input"
                        required 
                        value={showdocumentRequest.instruction} 
                        onChange={handleChange} 
                    />
                </div>
                <button className="dom-dashboard-call-submit-btn" type="submit">Update</button>
            </form>
        </div>
        <Footer />
    </div>
    );
};

export default Dom_Request_Update;
