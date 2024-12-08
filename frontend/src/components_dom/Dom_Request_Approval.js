import React, { useState, useEffect } from 'react';
import './document_management.css';
import axios from "axios";
import Footer from './Dom_Footer';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { pdfjs } from "react-pdf"; // Removed GlobalWorkerOptions

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function Dom_Request_Approval() {
    const { id } = useParams();
    const [showdocumentRequest, setDocumentRequest] = useState({});
    const [uploadedFileUrl, setUploadedFileUrl] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function get_all_document_request() {
            try {
                const res = await axios.get(`http://localhost:8070/document_request/get_pdf/${id}`);
                setDocumentRequest(res.data.documentrequest);
                if (res.data.documentrequest.uploadDocument) {
                    setUploadedFileUrl(res.data.documentrequest.uploadDocument);
                }
            } catch (err) {
                alert(err.message);
            }
        }
        get_all_document_request();
    }, [id]);

    function sendData(e, status) {
        e.preventDefault();

        const docRequestStatues = status;
        const instruction = showdocumentRequest.instruction;
        const documentDeadline = showdocumentRequest.documentDeadline;
        const needDocument = showdocumentRequest.needDocument;
        const comment = showdocumentRequest.comment;

        const newRequest = {
            docRequestStatues,
            documentDeadline,
            instruction,
            needDocument,
            comment
        };

        console.log(newRequest);

        // Use PUT instead of POST for updating the document
        axios.put(`http://localhost:8070/document_request/update/${id}`, newRequest)
            .then(() => {
                alert("Document request updated successfully");
                navigate('/dom_dashboard');
            })
            .catch((err) => {
                console.log("Not success response received");
                alert("Document request update unsuccessful");
            });
    }

    const handleViewDocument = () => {
        const baseUrl = "http://localhost:8070/";
        const fullUrl = uploadedFileUrl ? baseUrl + uploadedFileUrl : null;
    
        if (fullUrl) {
            window.open(fullUrl, '_blank', 'noopener,noreferrer');
        } else {
            alert("No document uploaded.");
        }
    };

    return (
        <div>
            <br />
            <div className="dom-dashboard-container">
                <h1 className="dom-dashboard-h1">Document Request Approval</h1>
                <form>
                    <div className="dom-dashboard-not-edit-table">
                        <label className="dom-dashboard-label">Document Request ID:</label>
                        <input className="dom-dashboard-input" type="text" value={`DOC-000${String(showdocumentRequest.documentRequestID)}`} readOnly />

                        <label className="dom-dashboard-label">Document Call ID:</label>
                        <input className="dom-dashboard-input" type="text" value={showdocumentRequest.documentCallID} readOnly />

                        <label className="dom-dashboard-label">Lawer ID:</label>
                        <input className="dom-dashboard-input" type="text" value={showdocumentRequest.lawerID} readOnly />

                        <label className="dom-dashboard-label">Client ID:</label>
                        <input className="dom-dashboard-input" type="text" value={showdocumentRequest.clientID} readOnly />

                        <label className="dom-dashboard-label">Document Manager ID:</label>
                        <input className="dom-dashboard-input" type="text" value={showdocumentRequest.documentManagerID} readOnly />

                        <label className="dom-dashboard-label">Deadline:</label>
                        <input className="dom-dashboard-input" type="text" value={showdocumentRequest.documentDeadline} readOnly />

                        <label className="dom-dashboard-label">Instruction:</label>
                        <textarea className="dom-dashboard-input" value={showdocumentRequest.instruction} readOnly />
                        <br /><br />
                        <hr />
                        <br /><br />

                        <label className="dom-dashboard-label" htmlFor="needDocument">Need Document Submitted Date</label>
                        <input className="dom-dashboard-input" type="text" value={showdocumentRequest.documentDeadline} readOnly />
                        <br /><br />

                        <label className="dom-dashboard-label" htmlFor="comment">Comment:</label>
                        <textarea className="dom-dashboard-input" id="comment" value={showdocumentRequest.comment} readOnly />
                        <br />
                    </div>
                    <br /><br />
                    <div className='dom-dashboard-approve-reject'>
                    <button className="dom-dashboard-approve-btn" type="button" onClick={(e) => sendData(e, 'Approved')}>Approve</button>
                    <button className="dom-dashboard-reject-btn" type="button" onClick={(e) => sendData(e, 'Rejected')}>Reject</button>
                    </div>
                </form>
                <br />
                        {uploadedFileUrl && (
                        <button onClick={handleViewDocument} className="dom-dashboard-btn-report" style={{fontSize:'1.2rem',marginLeft:'30%'}} >View Document</button>
                        )}
                

            </div>
            <Footer />
        </div>
    );
};

export default Dom_Request_Approval;