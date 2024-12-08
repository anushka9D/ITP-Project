import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from './Dom_Footer';
import DomNavbar from './Dom_NavBar';
import './document_management.css';
import Call from '@mui/icons-material/PendingActions';
import Request from '@mui/icons-material/ContentPasteGo';
import Submit from '@mui/icons-material/FilePresent'; 
import Approved from '@mui/icons-material/AssignmentTurnedIn';
import Rejected from '@mui/icons-material/AssignmentLate'; 
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement} from 'chart.js';
import { useParams } from 'react-router-dom';


// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


function Dom_Dashboard() {
    const navigate = useNavigate();
    const [documentCall, setDocumentCall] = useState([]);
    const [documentRequest, setdocumentRequest] = useState([]);
    const [documentSubmitted, setdocumentSubmitteda] = useState([]);

    const [searchCall, setSearchCall] = useState("");
    const [searchRequest, setSearchRequest] = useState("");
    const [searchSubmitted, setSearchSubmitted] = useState("");

    const [FilteredsRejectedApproved, setFilteredsRejectedApproved] = useState([]);
    const [FilteredsApproved, setFilteredsApproved] = useState([]);
    const [FilteredsRejected, setFilteredsRejected] = useState([]);
	
	const { id } = useParams();

    const document_manager_id = {id}; 

    useEffect(() => {
        function get_all_document_request() {
          axios
            .get("http://localhost:8070/document_request/get_all_document_request")
            .then((res) => {
                setFilteredsRejectedApproved(res.data.filter(rejectedapproved => rejectedapproved.docRequestStatues === "Approved" || rejectedapproved.docRequestStatues === "Rejected"));
                setFilteredsApproved(res.data.filter(rejectedapproved => rejectedapproved.docRequestStatues === "Approved"));
                setFilteredsRejected(res.data.filter(rejectedapproved => rejectedapproved.docRequestStatues === "Rejected"));

            })
            .catch((err) => {
              alert(err.message);
            });
        }
        get_all_document_request();
      }, []);
      
    

    useEffect(() => {
        async function get_all_document_call() {
            try {
                const res = await axios.get("http://localhost:8070/document_call/get_all_document_call/Pending");
                setDocumentCall(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                alert(err.message);
            }
        }
        get_all_document_call();
    }, []);

    const document_call_view_page = (id) => {
        navigate(`/Dom_request_dom/${id}/${document_manager_id}`);
    };

    useEffect(() => {
        async function get_all_document_request() {
            try {
                const res = await axios.get("http://localhost:8070/document_request/get_all_document_request/Request");
                setdocumentRequest(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                alert(err.message);
            }
        }
        get_all_document_request();
    }, []);

    const documentrequestView = (id) => {
        navigate(`/Dom_request_view/${id}`);
    };


    useEffect(() => {
      async function get_all_document_submitted() {
          try {
              const res = await axios.get("http://localhost:8070/document_request/get_all_document_request/Submitted");
              setdocumentSubmitteda(Array.isArray(res.data) ? res.data : []); // Ensure it's set as an array
          } catch (err) {
              alert(err.message);
          }
      }
      get_all_document_submitted();
  }, []);

  
  const document_request_submitted_view_page = (id) => {
      navigate(`/dom_request_approval_view/${id}`);
  };

  const dom_request_approval_page = (id) => {
    navigate(`/dom_request_approval/${id}`); 
  };


    // Search functionality
    const filteredDocumentCalls = documentCall.filter(doc =>
        doc.clientID && doc.clientID.toLowerCase().includes(searchCall.toLowerCase()) ||
        doc.lawerID && doc.lawerID.toLowerCase().includes(searchCall.toLowerCase()) ||
        doc.caseNumber && doc.caseNumber.toLowerCase().includes(searchCall.toLowerCase())
    );

    const filteredDocumentRequests = documentRequest.filter(doc =>
        doc.clientID && doc.clientID.toLowerCase().includes(searchCall.toLowerCase()) ||
        doc.lawerID && doc.lawerID.toLowerCase().includes(searchCall.toLowerCase())||
        doc.documentCallID && doc.documentCallID.toLowerCase().includes(searchCall.toLowerCase())
    );

    const filteredDocumentSubmitted = documentSubmitted.filter(doc =>
        doc.clientID && doc.clientID.toLowerCase().includes(searchCall.toLowerCase())||
        doc.documentCallID && doc.documentCallID.toLowerCase().includes(searchCall.toLowerCase())
    );



  // Data for Pie Chart
  const pieData = {
    labels: ['Accept Document', 'Reject Document'],
    datasets: [{
        data: [FilteredsApproved.length, FilteredsRejected.length],
        backgroundColor: ['rgba(76,175,80, 0.9)', 'rgb(163,0,0, 0.6)']
    }]
};

// Data for Bar Chart
const barData = {
    labels: ['Pending', 'Request', 'Submitted'],
    datasets: [{
        label: 'Number of Documents',
        data: [documentCall.length, documentRequest.length, documentSubmitted.length],
        backgroundColor: ['rgba(255,153,34)','rgba(255,153,34)','rgba(255,153,34)'],
        borderWidth: 1
    }]
};



    return (
        <div>
            <DomNavbar />
            <h2 className="dom-dashboard-dashboard-title">Document Manager Dashboard</h2>

            <div className="dom-dashboard-count-btn">
                <div
                    className="dom-dashboard-count-box"
                    style={{ cursor: 'pointer', margin: '10px', padding: '15px', backgroundColor: '#f1f1f1', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                    
                >
                    <Call /> Document Call <span>{documentCall.length}</span>
                </div>
                <div
                    className="dom-dashboard-count-box"
                    style={{ cursor: 'pointer', margin: '10px', padding: '15px', backgroundColor: '#f1f1f1', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                    
                >
                    <Request /> Document Request <span>{documentRequest.length}</span>
                </div>
                <div
                    className="dom-dashboard-count-box"
                    style={{ cursor: 'pointer', margin: '10px', padding: '15px', backgroundColor: '#f1f1f1', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                    
                >
                    <Submit /> Client Submitted Document <span>{documentSubmitted.length}</span>
                </div>
                <div
                    className="dom-dashboard-count-box"
                    style={{ cursor: 'pointer', margin: '10px', padding: '15px', backgroundColor: '#f1f1f1', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                    
                >
                    <Approved /> Approved Document <span>{FilteredsApproved.length}</span>
                </div>
                <div
                    className="dom-dashboard-count-box"
                    style={{ cursor: 'pointer', margin: '10px', padding: '15px', backgroundColor: '#f1f1f1', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                    
                >
                    <Rejected /> Rejected Document <span>{FilteredsRejected.length}</span>
                </div>
            </div>

            <div className="dom-dashboard-Charts">
                
                <div className="dom-dashboard-pie">
                <Pie data={pieData}  />
                </div>

                <div className="dom-dashboard-bar">
                <Bar data={barData} options={{ responsive: true }} /> 
                </div>
            </div>

            <div className="dom-dashboard-tables">
            
                <div className="dom-dashboard-search">
                <h3 className="dom-dashboard-search-title1">Received Document Calls</h3><br />
                <input
                        type="text"
                        className="dom-dashboard-search-bar"
                        placeholder="Search..."
                        value={searchCall}
                        onChange={(e) => setSearchCall(e.target.value)}
                        style={{ borderRadius: '18px', border: '2px solid #7a7a7a', width: '250px' }}
                    />
                </div>
                
                <table className="dom-dashboard-table">
                    <thead className="dom-dashboard-thead">
                        <tr className="dom-dashboard-tr">
                            <th className="dom-dashboard-th">Document Call ID</th>
                            <th className="dom-dashboard-th">Lawyer ID</th>
                            <th className="dom-dashboard-th">Client ID</th>
                            <th className="dom-dashboard-th">Case Number</th>
                            <th className="dom-dashboard-th">Need Document</th>
                            <th className="dom-dashboard-th">Document Status</th>
                            <th className="dom-dashboard-th">Action</th>
                        </tr>
                    </thead>
                    <tbody className="dom-dashboard-tbody">
                    {filteredDocumentCalls.length > 0 ?(
                        filteredDocumentCalls.map((documentcall) => {
                            // Format the Document Call ID
                            const formattedId = `DOC-000${String(documentcall.documentCallID)}`;
                            return (
                                <tr className="dom-dashboard-tr" key={documentcall._id}>
                                    <td className="dom-dashboard-td">{formattedId}</td>
                                    <td className="dom-dashboard-td">{documentcall.lawerID}</td>
                                    <td className="dom-dashboard-td">{documentcall.clientID}</td>
                                    <td className="dom-dashboard-td">{documentcall.caseNumber}</td>
                                    <td className="dom-dashboard-td">{documentcall.needDocument}</td>
                                    <td className="dom-dashboard-td">{documentcall.docCallStatues}</td>
                                    <td className="dom-dashboard-td">
                                        <button 
                                            type="button" 
                                            className="dom-dashboard-dom-call-dashboard-view" 
                                            onClick={() => document_call_view_page(documentcall._id)}>
                                            View
                                        </button>
                                    </td>
                                </tr>
                             );
                            })
                          ) :(
                            <p style={{ fontSize: '1.2rem', textAlign: 'center', margin: '20px 0' }}>No data available</p>
                    
                          )}
                    </tbody>
                </table>
                <br /><br /><br />



                <div className="dom-dashboard-search">
                <h3 className="dom-dashboard-search-title2">Received Document Requests from Client</h3><br />
                <input
                        type="text"
                        hidden
                        className="dom-dashboard-search-bar"
                        placeholder="Search..."
                        value={searchRequest}
                        onChange={(e) => setSearchRequest(e.target.value)}
                        style={{ borderRadius: '18px', border: '2px solid #7a7a7a', width: '250px' }}
                    />
                </div>
                <table className="dom-dashboard-table">
                    <thead className="dom-dashboard-thead">
                        <tr className="dom-dashboard-tr">
                            <th className="dom-dashboard-th">Request ID</th>
                            <th className="dom-dashboard-th">Call ID</th>
                            <th className="dom-dashboard-th">Lawyer ID</th>
                            <th className="dom-dashboard-th">Client ID</th>
                            <th className="dom-dashboard-th">Deadline</th>
                            <th className="dom-dashboard-th">Document Status</th>
                            <th className="dom-dashboard-th">Action</th>
                        </tr>
                    </thead>
                    <tbody className="dom-dashboard-tbody">
                    {filteredDocumentRequests.length > 0 ?(
                    filteredDocumentRequests.map((documentrequest) => {
                        const formattedId = `DOR-000${String(documentrequest.documentRequestID)}`;
                        return (
                            <tr className="dom-dashboard-tr" key={documentrequest._id}>
                                <td className="dom-dashboard-td">{formattedId}</td>
                                <td className="dom-dashboard-td">{documentrequest.documentCallID}</td>
                                <td className="dom-dashboard-td">{documentrequest.lawerID}</td>
                                <td className="dom-dashboard-td">{documentrequest.clientID}</td>
                                <td className="dom-dashboard-td">{documentrequest.documentDeadline}</td>
                                <td className="dom-dashboard-td">{documentrequest.docRequestStatues}</td>
                                <td className="dom-dashboard-td">
                                    <button type="button" className="dom-dashboard-dom-call-dashboard-view" onClick={() => documentrequestView(documentrequest._id)}> View </button>
                                </td>
                            </tr>
                        );
                    })
                  ) :(
                    <p style={{ fontSize: '1.2rem', textAlign: 'center', margin: '20px 0' }}>No data available</p>
            
                  )}
                    </tbody>
                </table><br /><br /><br />


                <div className="dom-dashboard-search">
                <h3 className="dom-dashboard-search-title3">Received Document Submitted from Client</h3><br />
                <input
                        type="text"
                        hidden
                        className="dom-dashboard-search-bar"
                        placeholder="Search..."
                        value={searchSubmitted}
                        onChange={(e) => setSearchSubmitted(e.target.value)}
                        style={{ borderRadius: '18px', border: '2px solid #7a7a7a', width: '250px' }}
                    />
                </div>
                <table className="dom-dashboard-table">
                    <thead className="dom-dashboard-thead">
                        <tr className="dom-dashboard-tr">
                            <th className="dom-dashboard-th">Request ID</th>
                            <th className="dom-dashboard-th">Call ID</th>
                            <th className="dom-dashboard-th">Lawer ID</th>
                            <th className="dom-dashboard-th">Client ID</th>
                            <th className="dom-dashboard-th">Deadline</th>
                            <th className="dom-dashboard-th">Document Statues</th>
                            <th className="dom-dashboard-th">Action</th>
                        </tr>
                    </thead>
                    <tbody className="dom-dashboard-tbody">
                    {filteredDocumentSubmitted.length > 0 ?(
                    filteredDocumentSubmitted.map((documentrequest) => {
                            const formattedId = `DOR-000${String(documentrequest.documentRequestID)}`;
                            return (
                                <tr className="dom-dashboard-tr" key={documentrequest._id}>
                                    <td className="dom-dashboard-td">{formattedId}</td>
                                    <td className="dom-dashboard-td">{documentrequest.documentCallID}</td>
                                    <td className="dom-dashboard-td">{documentrequest.lawerID}</td>
                                    <td className="dom-dashboard-td">{documentrequest.clientID}</td>
                                    <td className="dom-dashboard-td">{documentrequest.documentDeadline}</td>
                                    <td className="dom-dashboard-td">{documentrequest.docRequestStatues}</td>
                                    <td className="dom-dashboard-td">
                                    <button type="button" className="dom-dashboard-dom-call-dashboard-view" onClick={() => dom_request_approval_page(documentrequest._id)}> View </button>
                                </td>
                            </tr>
                             );
                            })
                          ) :(
                            <p style={{ fontSize: '1.2rem', textAlign: 'center', margin: '20px 0' }}>No data available</p>
                    
                          )}
                    </tbody>
                </table><br /><br /><br />


                <h3 className="dom-dashboard-search-title3">Approve or Reject Document</h3><br />
                <table className="dom-dashboard-table">
                    <thead className="dom-dashboard-thead">
                        <tr className="dom-dashboard-tr">
                            <th className="dom-dashboard-th">Request ID</th>
                            <th className="dom-dashboard-th">Call ID</th>
                            <th className="dom-dashboard-th">Lawer ID</th>
                            <th className="dom-dashboard-th">Client ID</th>
                            <th className="dom-dashboard-th">Deadline</th>
                            <th className="dom-dashboard-th">Document Statues</th>
                            <th className="dom-dashboard-th">Action</th>
                        </tr>
                    </thead>
                    <tbody className="dom-dashboard-tbody">
                    {FilteredsRejectedApproved.length > 0 ?(
                    FilteredsRejectedApproved.map((documentrequest) => {
                            const formattedId = `DOR-000${String(documentrequest.documentRequestID)}`;
                            return (
                                <tr className="dom-dashboard-tr" key={documentrequest._id}>
                                    <td className="dom-dashboard-td">{formattedId}</td>
                                    <td className="dom-dashboard-td">{documentrequest.documentCallID}</td>
                                    <td className="dom-dashboard-td">{documentrequest.lawerID}</td>
                                    <td className="dom-dashboard-td">{documentrequest.clientID}</td>
                                    <td className="dom-dashboard-td">{documentrequest.documentDeadline}</td>
                                    <td className="dom-dashboard-td">{documentrequest.docRequestStatues}</td>
                                    <td className="dom-dashboard-td">
                                    <button type="button" className="dom-dashboard-dom-call-dashboard-view" onClick={() => document_request_submitted_view_page(documentrequest._id)}> View </button>
                                </td>
                            </tr>
                            );
                        })
                      ) :(
                        <p style={{ fontSize: '1.2rem', textAlign: 'center', margin: '20px 0' }}>No data available</p>
                
                      )}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default Dom_Dashboard;