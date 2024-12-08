import React, { useState, useEffect, useRef } from "react";
import './document_management.css';
import axios from "axios";
import Footer from './Dom_Footer';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";


function Dom_Call_View_Requested () {

    const { id } = useParams(); 
    const [showdocumentCall, setDocumentCall] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocumentcall = async() => {
          await axios
            .get(`http://localhost:8070/document_call/get/${id}`)
            .then((res) => {
                setDocumentCall(res.data.documentcall);
            })
            .catch((err) => {
              alert(err.message);
            });
        };
      
        fetchDocumentcall();
        }, [id]);
      
    
          const deleteDocumentcall = async (id) => {
            try {
                await axios.delete(`http://localhost:8070/document_call/delete/${id}`);
                alert("Document Call has been deleted.");
                navigate("/dom_call_dashboard"); // Redirect after deletion
            } catch (err) {
                alert(err.message);
            }
        };
        
      // pdf download
      const ComponenetsRef = useRef();
      const handlePrint = useReactToPrint({
        content: () => ComponenetsRef.current,
        DocumentTitle:"Student Details",
        onafterprint:()=>alert("Report Downloaded..!")
      });


  return (
<div>

    <div className="dom-dashboard-container">
    <h1  className="dom-dashboard-h1">Document Call View Requested</h1>

    <div>
      <div ref={ComponenetsRef}>
          <label className="dom-dashboard-label" htmlFor="caseNo">Document ID:</label>
          <input className="dom-dashboard-input" type="text" value={`DOC-000${String(showdocumentCall.documentCallID)}`}  />

          <label className="dom-dashboard-label" htmlFor="clientId">Lawyer ID:</label>
          <input className="dom-dashboard-input" type="text" value={showdocumentCall.lawerID} />

          <label className="dom-dashboard-label" htmlFor="clientId">Client ID:</label>
          <input className="dom-dashboard-input" type="text" value={showdocumentCall.clientID} />

          <label className="dom-dashboard-label" htmlFor="caseType">Case Number:</label>
          <input className="dom-dashboard-input" type="text" value={showdocumentCall.caseNumber} />

          <label className="dom-dashboard-label" htmlFor="needDocument">Need Document:</label>
          <textarea className="dom-dashboard-input" type="text" value={showdocumentCall.needDocument} />

          <label className="dom-dashboard-label" htmlFor="docCallStatues">Document Status:</label>
          <input className="dom-dashboard-input" type="text" value={showdocumentCall.docCallStatues} />
          </div>
          <button type="button" className="dom-dashboard-btn-delete" onClick={() => deleteDocumentcall(showdocumentCall._id)}>Delete</button>
          <button type="button" className="dom-dashboard-btn-report" onClick={handlePrint} >Report</button>
    </div>
  </div>

<Footer/>

</div>

  );
};

export default Dom_Call_View_Requested;