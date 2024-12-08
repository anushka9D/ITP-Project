import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from './Dom_Footer';
import './document_management.css';
import { useNavigate } from "react-router-dom";



function Dom_Dashboard () {

  const lawerid = 'L001';

    const navigate = useNavigate();
    const [documentCall, setDocumentCall] = useState([]);
    const [documentCallRequested, setDocumentCallRequested] = useState([]);

    //Pending document call
    useEffect(() => {
        function get_all_document_call() {
          axios
            .get("http://localhost:8070/document_call/get_all_document_call/Pending")
            .then((res) => {
              setDocumentCall(res.data.filter(Pending => Pending.lawerID === lawerid));
              //setDocumentCall(res.data);
            })
            .catch((err) => {
              alert(err.message);
            });
        }
        get_all_document_call();
      }, []);

      useEffect(() => {
        function get_all_document_call() {
          axios
            .get("http://localhost:8070/document_call/get_all_document_call/Requested")
            .then((res) => {
              setDocumentCallRequested(res.data.filter(Requested => Requested.lawerID === lawerid));
              //setDocumentCallRequested(res.data);
            })
            .catch((err) => {
              alert(err.message);
            });
        }
        get_all_document_call();
      }, []);

      const dom_Call_View_Requested = (id) => {
        navigate(`/document_requested_call_view/${id}`); 
      };


      const document_call_view_page = (id) => {
        navigate(`/dom_call_view/${id}`); 
      };


  return (
    <div>

<h2 className="dom-dashboard-dashboard-title">Document Call Dashboard</h2>

<div className="dom-dashboard-tables">
    <h3>All Document Calls</h3><br/>

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
            {Array.isArray(documentCall) && documentCall.map((documentcall) => {
                // Format the Document Call ID
                const formattedId = `DOC-${String(documentcall.documentCallID).padStart(4, '0')}`;
                
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
                                className="dom-dashboard-dom-call-dashboard-view" 
                                onClick={() => document_call_view_page(documentcall._id)}
                            >
                                View
                            </button>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table><br/><br/><br/>

</div>

    <div className="dom-dashboard-tables">
    <h3>All Accept document Call </h3><br/>

    <table className="dom-dashboard-table">
    <thead className="dom-dashboard-thead">
    <tr>
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
    {Array.isArray(documentCallRequested) && documentCallRequested.map((documentcall) => {
    const formattedId = `DOC-${String(documentcall.documentCallID).padStart(4, '0')}`;
                
    return (
        <tr className="dom-dashboard-tr" key={documentcall._id}>
            <td className="dom-dashboard-td">{formattedId}</td>
            <td className="dom-dashboard-td">{documentcall.lawerID}</td>
            <td className="dom-dashboard-td">{documentcall.clientID}</td>
            <td className="dom-dashboard-td">{documentcall.caseNumber}</td>
            <td className="dom-dashboard-td">{documentcall.needDocument}</td>
            <td className="dom-dashboard-td">{documentcall.docCallStatues}</td>
        <td className="dom-dashboard-td"><button className="dom-dashboard-dom-call-dashboard-view" onClick={() => dom_Call_View_Requested(documentcall._id)}>View</button>
        </td>
    </tr>
    );
    })}
    </tbody>
    </table><br/><br/><br/>

    </div>

    <Footer/>

    </div>

  );
};

export default Dom_Dashboard;