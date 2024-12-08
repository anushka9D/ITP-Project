import React, { useState, useEffect,useRef } from "react";
import './document_management.css';
import axios from "axios";
import Footer from './Dom_Footer';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";


function Dom_Request_View () {

  const { id } = useParams();
  const [documentRequest, setdocumentRequest] = useState([]);

  const [showdocumentRequest, getdocumentRequest] = useState({});
  const [showdclient, setshowdclient] = useState([]);
  const searchId = showdocumentRequest.clientID;

  const navigate = useNavigate();


  useEffect(() => {
    function get_client_details() {
        axios
            .get(`http://localhost:8070/client/search/nic/${showdocumentRequest.clientID}`)
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
    function get_all_document_request() {
        axios
            .get(`http://localhost:8070/document_request/get/${id}`)
            .then((res) => {
                getdocumentRequest(res.data.documentrequest);
            })
            .catch((err) => {
                console.error(err.response ? err.response.data : err.message);
                alert("Failed to fetch document request.");
            });
    }

    if (id) {
        get_all_document_request();
    }
}, [id]);


  const document_request_update_page = (id) => {
    navigate(`/Dom_request_update/${id}`); // Redirect to update page with id
  };

  const deleteDocumentrequest = (id) => {
    axios
      .delete(`http://localhost:8070/document_request/delete/${id}`)
      .then((res) => {
        setdocumentRequest(documentRequest.filter(documentrequest => documentrequest._id !== id));
        alert("Document Request has been deleted.");
        navigate(`/dom_dashboard/`);
      })
      .catch((err) => {
        alert(err.message);
      });
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

    <div class="dom-dashboard-container">
    <h1 className="dom-dashboard-h1">Document Request View</h1>

      <div className="dom-dashboard-not-edit-table" ref={ComponenetsRef}>
      <label className="dom-dashboard-label">Document Request ID:</label>
      <input className="dom-dashboard-input" type="text" value={`DOR-000${String(showdocumentRequest.documentRequestID)}`} readOnly />

      <label className="dom-dashboard-label">Document Call ID:</label>
      <input className="dom-dashboard-input" type="text" value={showdocumentRequest.documentCallID} readOnly/>

      <label className="dom-dashboard-label">Lawer ID:</label>
      <input className="dom-dashboard-input" type="text" value={showdocumentRequest.lawerID} readOnly/>

      <label className="dom-dashboard-label">Client ID:</label>
      <input className="dom-dashboard-input" type="text" value={showdocumentRequest.clientID} readOnly/>

      <label className="dom-dashboard-label">Client Name:</label>
      <input className="dom-dashboard-input" type="text" value={showdclient.fname} readOnly />

      <label className="dom-dashboard-label">Client Phone:</label>
      <input className="dom-dashboard-input" type="text" value={showdclient.phone} readOnly />

      <br/><br/>
      <hr></hr>
      <br/><br/>
      <label className="dom-dashboard-label">Deadline:</label>
      
      <input className="dom-dashboard-input" type="date"  value={showdocumentRequest.documentDeadline} />

      <label className="dom-dashboard-label">Instruction:</label>
      <textarea className="dom-dashboard-input" value={showdocumentRequest.instruction} />

      </div>
      <button type="button" className="dom-dashboard-btn-edit" onClick={() => document_request_update_page(showdocumentRequest._id)}>Edit</button>
          <button type="button" className="dom-dashboard-btn-delete" onClick={() => deleteDocumentrequest(showdocumentRequest._id)}>Delete</button>
          <button type="button" className="dom-dashboard-btn-report" onClick={handlePrint} >Report</button>
  </div>

<Footer/>

</div>

  );
};

export default Dom_Request_View;