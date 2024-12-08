import NavBar from "./uam_page_navbar";
import Footer from "./uam_page_footer";
import './user_affairs_management.css';

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ClientViewAllTickets () {

    const { id } = useParams();
    const [supportTicket, setSupportTickets] = useState([]);
    const [clientDetails, setClientDetails] = useState({});

    // Get support ticket details
    useEffect(() => {
        function getsetSupportTickets() {
            axios.get(`http://localhost:8070/supportticket/all`).then((res) => {
                console.log(res.data);
                setSupportTickets(res.data);

                res.data.forEach(supportTicket => {
                    const clientId = supportTicket.clientId;
                    if (!clientDetails[clientId]) {
                        axios.get(`http://localhost:8070/client/v/${clientId}`)
                            .then(response => {
                                setClientDetails(prevDetails => ({
                                    ...prevDetails,
                                    [clientId]: response.data
                                }));
                            })
                            .catch(error => {
                                console.error("Error fetching client details:", error);
                            });
                    }
                });
            }).catch((err) => {
                alert(err.message);
            });
        }
        getsetSupportTickets();
    }, [clientDetails, id]);

    return (
        <div>
             <NavBar /> 
            <hr />

            <div className="uam-container">
                <h1 className="uam-header">All Support Tickets</h1>
        
                <h2>Support Tickets</h2>
                <table border='1' className="uam-summary-table">
                    <thead>
                        <tr className="uam-summary-table-row">
                            <th className="uam-summary-table-header">Ticket Date</th>
                            <th className="uam-summary-table-header">UserType</th>                            
                            <th className="uam-summary-table-header">Client ID</th>
                            <th className="uam-summary-table-header">Ticket Type </th>
                            <th className="uam-summary-table-header">Name</th>
                            <th className="uam-summary-table-header">Subject</th>
                             <th className="uam-summary-table-header">Request Status</th>
                             <th className="uam-summary-table-header">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            supportTicket.map(supportTicket => {
                                return (
                                    <tr className="uam-summary-table-row" key={supportTicket._id}>
                                        <td className="uam-summary-table-data">{
                                              new Date(supportTicket.supTicketDate).toISOString().split('T')[0]
                                        }
                                        </td>
                                        <td className="uam-summary-table-data">{supportTicket.userType}</td> 
                                        <td className="uam-summary-table-data">{supportTicket.clientId}</td> 
                                        <td className="uam-summary-table-data">{supportTicket.supTicketType}</td>                                      
                                        <td className="uam-summary-table-data">
                                            {clientDetails[supportTicket.clientId]
                                                ? `${clientDetails[supportTicket.clientId].fname} `
                                                : 'Loading...'}
                                        </td>
                                        
                                        <td className="uam-summary-table-data">{supportTicket.supTicketSubject}</td>
                                        <td className="uam-summary-table-data">{supportTicket.supTicketStatus}</td>                                         
                                        <td className="uam-summary-table-action"><a className="uam-summary-table-button" href={`/support-agent-dashboard/view-support-ticket/${supportTicket._id}/${id}`}>View Ticket</a></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>        
            </div>
             <Footer />

        </div>
    )
}

export default ClientViewAllTickets;