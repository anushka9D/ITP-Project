import React, { useState, useEffect } from 'react';
import './document_management.css';
import axios from "axios";
import Footer from './Dom_Footer';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Dom_Request() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showdocumentRequest, setDocumentRequest] = useState({});
    const [comment, setcomment] = useState("");
    const [file, setFile] = useState("");
    const docRequestStatues = "Submitted";

    useEffect(() => {
        async function get_all_document_request() {
            try {
                const res = await axios.get(`http://localhost:8070/document_request/get/${id}`);
                setDocumentRequest(res.data.documentrequest);
            } catch (err) {
                alert(err.message);
            }
        }
        get_all_document_request();
    }, [id]);

    const sendData = async (e) => {
        e.preventDefault();
    
        // Create a new FormData object
        const formData = new FormData();

        formData.append("showdocumentRequest", showdocumentRequest);
        formData.append("docRequestStatues", docRequestStatues);
        formData.append("comment", comment);
        if (file) formData.append("pdf", file); // Append file only if it exists
    
        try {
          await axios.put(`http://localhost:8070/document_request/update/client/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
          alert("Document request updated successfully");
          navigate('/dom_client_dashboard');
        } catch (err) {
          alert("Not success response received");
          console.error(err);
        }
      };

    return (
        <div>
            <br />
            <div className="dom-dashboard-container">
                <h1 className="dom-dashboard-h1">Document Request Form</h1>
                <form onSubmit={sendData}>
                    <div className="dom-dashboard-not-edit-table">
                        <label className="dom-dashboard-label">Document ID:</label>
                        <input className="dom-dashboard-input" type="text" value={`DOR-000${String(showdocumentRequest.documentRequestID)}`} readOnly />

                        <label className="dom-dashboard-label">Lawer ID:</label>
                        <input className="dom-dashboard-input" type="text" value={showdocumentRequest.lawerID} readOnly />

                        <label className="dom-dashboard-label">Client ID:</label>
                        <input className="dom-dashboard-input" type="text" value={showdocumentRequest.clientID} readOnly />

                        <label className="dom-dashboard-label">Deadline:</label>
                        <input className="dom-dashboard-input" type="text" value={showdocumentRequest.documentDeadline} readOnly />

                        <label className="dom-dashboard-label">Instruction:</label>
                        <textarea className="dom-dashboard-input" value={showdocumentRequest.instruction} readOnly />
                        <br /><br />
                        <hr />
                        <br /><br />

                        <label className="dom-dashboard-label" htmlFor="needDocument">Need Document Upload</label>
                        <input className="dom-dashboard-input dom-dashboard-file-upload" type="file" name="pdf" accept=".pdf" id="file" onChange={(e)=>{setFile(e.target.files[0]);}}/>
                        <br /><br />

                        <label className="dom-dashboard-label" htmlFor="comment">Comment:</label>
                        <textarea className="dom-dashboard-input" id="comment" name="comment" required onChange={(e) => setcomment(e.target.value)} />
                        <br />
                    </div>
                    <button className="dom-dashboard-request-submit-btn" style={{fontSize:'1.2rem',marginLeft:'40%'}} type="submit">Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Dom_Request;
