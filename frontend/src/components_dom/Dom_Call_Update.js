import React, { useState, useEffect } from "react";
import './document_management.css';
import axios from "axios";
import Footer from './Dom_Footer';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Dom_Call_Update () {
    const { id } = useParams(); 
    const [showdocumentCall, setDocumentCall] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocumentcall = async() => {
            try {
                const res = await axios.get(`http://localhost:8070/document_call/get/${id}`);
                setDocumentCall(res.data.documentcall);
            } catch (err) {
                alert(err.message);
            }
        };
        fetchDocumentcall();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDocumentCall((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8070/document_call/update/${id}`, showdocumentCall);
            alert("Document updated successfully!")
            navigate("/dom_call_dashboard");

        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div>
            <div className="dom-dashboard-container">
                <h1  className="dom-dashboard-h1">Document Call Update</h1>

                <form onSubmit={handleSubmit}>

                <input  className="dom-dashboard-input" type="hidden" value={showdocumentCall.docCallStatues} onChange={handleChange} />

                    <label className="dom-dashboard-label">Client ID:</label>
                    <input className="dom-dashboard-input" type="text" name="clientID" readOnly value={showdocumentCall.clientID} onChange={handleChange} />

                    <label className="dom-dashboard-label">Case Number:</label>
                    <input className="dom-dashboard-input" type="text" name="caseNumber" value={showdocumentCall.caseNumber} onChange={handleChange} />

                    <label className="dom-dashboard-label">Need Document:</label>
                    <textarea className="dom-dashboard-input" name="needDocument" value={showdocumentCall.needDocument} onChange={handleChange} />

                    <button className="dom-dashboard-call-submit-btn" type="submit">Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Dom_Call_Update;
