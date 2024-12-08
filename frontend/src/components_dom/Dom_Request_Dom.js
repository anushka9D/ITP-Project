import React, { useState, useEffect } from "react";
import './document_management.css';
import axios from "axios";
import Footer from './Dom_Footer';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Dom_RequestDom () {
    const { id } = useParams();
    const { document_manager_id } = useParams();
    const setDocumentCallStatues = "Requested";
    const [showdocumentCall, setDocumentCall] = useState({});
    const navigate = useNavigate();

    const [documentRequestID, setdocumentRequestID] = useState("1");
    const documentCallID = `DOC-000${String(showdocumentCall.documentCallID)}`;
    const lawerID = showdocumentCall.lawerID;
    const clientID = showdocumentCall.clientID;
    const caseNumber = showdocumentCall.caseNumber;
    const needDocument = showdocumentCall.needDocument;
    const documentManagerID = document_manager_id;
    const docRequestStatues = "Request";
    const [documentDeadline, setdocumentDeadline] = useState("");
    const [instruction, setinstruction] = useState("");



    useEffect(() => {
        // Fetch last documentCallID from the database
        axios.get("http://localhost:8070/document_request/get_last_document_request")
            .then(res => {
                const lastID = res.data.documentRequestID; // Get last ID from response
                console.log("Last Document Call ID:", lastID);

                // Generate new ID based on lastID
                const newID = lastID ? generateNewdocumentRequestID(Number(lastID)) : "1"; // Start from 1 if no lastID
                setdocumentRequestID(newID);
            })
            .catch(err => {
                console.error("Error fetching last documentCallID", err);
                // Fallback to default ID on error
                setdocumentRequestID("1");
            });
    }, []);

    const generateNewdocumentRequestID = (lastID) => {
        return (lastID + 1).toString(); // Increment the last ID and return as a string
    };


    function handleSubmit(e) {
        e.preventDefault();

        const newRequest = {
            documentRequestID,
            documentCallID,
            lawerID,
            clientID, 
            documentManagerID,
            docRequestStatues,
            documentDeadline,
            instruction
        };

        const docCallStatues = setDocumentCallStatues;

        const statuesUpdate = {
            clientID,
            caseNumber, 
            needDocument,
            docCallStatues
        };

        console.log(newRequest);
        console.log(statuesUpdate);
        
        axios.post("http://localhost:8070/document_request/add_document_request", newRequest)
            .catch((err) => {
                console.log("not Success response received");
                alert("Document Requested added Unsuccessfully");
            })

            .then(()=>{
                axios.put(`http://localhost:8070/document_call/update/${id}`, statuesUpdate)
                alert("Document Requested added Successfully");
                navigate("/dom_dashboard");
            })

            
    }

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




    return (
        <div>
            <div className="dom-dashboard-container">
                <h1 className="dom-dashboard-h1">Document Request Form</h1>

                <form onSubmit={handleSubmit}>
                    <div className="dom-dashboard-not-edit-table">
                    <label className="dom-dashboard-label">Document ID:</label>
                    <input className="dom-dashboard-input" readOnly type="text" value={`DOC-000${String(showdocumentCall.documentCallID)}`} /> 

                    <label className="dom-dashboard-label">Lawer ID:</label>
                    <input className="dom-dashboard-input" readOnly type="text" value={showdocumentCall.lawerID} />

                    <label className="dom-dashboard-label">Client ID:</label>
                    <input className="dom-dashboard-input" readOnly type="text" value={showdocumentCall.clientID} />

                    <label className="dom-dashboard-label">Case Number:</label>
                    <input className="dom-dashboard-input" readOnly type="text" value={showdocumentCall.caseNumber} />

                    <label className="dom-dashboard-label">Need Document:</label>
                    <textarea className="dom-dashboard-input" readOnly value={showdocumentCall.needDocument}  />
                    <br/><br/>
                    <hr></hr>
                    <br/><br/>

                    <label className="dom-dashboard-label">Deadline:</label>
                    <input className="dom-dashboard-input" type="date" name="deadline" required  onChange={(e)=>{setdocumentDeadline(e.target.value);}} />

                    <label className="dom-dashboard-label">Instruction:</label>
                    <textarea className="dom-dashboard-input" name="instruction" required onChange={(e)=>{setinstruction(e.target.value);}} />

                    </div>
                    <button className="dom-dashboard-call-submit-btn" type="submit">Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Dom_RequestDom;
