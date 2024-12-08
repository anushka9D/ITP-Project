import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from './Dom_Footer';
import DomNavbar from './Dom_NavBar';
import './document_management.css';
import { useNavigate } from "react-router-dom";

function Dom_Client_Dashboard() {
    const navigate = useNavigate();
    const [documentRequest, setdocumentRequest] = useState([]);


    useEffect(() => {
        async function get_all_document_request() {
            try {
                const res = await axios.get("http://localhost:8070/document_request/get_all_document_request/Request");
                console.log(res.data);
                setdocumentRequest(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                alert(err.message);
            }
        }
        get_all_document_request();
    }, []);

    const documentrequestsubmit = (id) => {
        navigate(`/dom_request/${id}`);
    };

    return (
        <div>
            <br/><br/><br/><br/><br/><br/>
            <h2 className="dom-dashboard-dashboard-title">Document Client Dashboard</h2>
            <br/><br/><br/>
            <div className="dom-dashboard-tables">

                <h3>Received Document Requests from Client</h3><br />
                <table className="dom-dashboard-table">
                    <thead className="dom-dashboard-thead">
                        <tr className="dom-dashboard-tr">
                            <th className="dom-dashboard-th">Request ID</th>
                            <th className="dom-dashboard-th">Lawer ID</th>
                            <th className="dom-dashboard-th">Client ID</th>
                            <th className="dom-dashboard-th">Deadline</th>
                            <th className="dom-dashboard-th">Instruction</th>
                            <th className="dom-dashboard-th">Action</th>
                        </tr>
                    </thead>
                    <tbody className="dom-dashboard-tbody">
                        {Array.isArray(documentRequest) && documentRequest.map((documentrequest) => {
                           const formattedId = `DOR-000${String(documentrequest.documentRequestID)}`;
                           return (
                               <tr  className="dom-dashboard-tr" key={documentrequest._id}>
                                   <td className="dom-dashboard-td">{formattedId}</td>
                                   <td className="dom-dashboard-td">{documentrequest.lawerID}</td>
                                   <td className="dom-dashboard-td">{documentrequest.clientID}</td>
                                   <td className="dom-dashboard-td">{documentrequest.documentDeadline}</td>
                                   <td className="dom-dashboard-td">{documentrequest.instruction}</td>
                                   <td className="dom-dashboard-td">
                                   <button type="button" className="dom-dashboard-dom-call-dashboard-view" onClick={() => documentrequestsubmit(documentrequest._id)}> View </button>
                                   </td>
                               </tr>
                           );
                       })}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default Dom_Client_Dashboard;
