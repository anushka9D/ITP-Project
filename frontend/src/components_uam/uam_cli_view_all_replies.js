import NavBar from "./uam_page_navbar";
import Footer from "./uam_page_footer";
import './user_affairs_management.css';

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ClientViewAllTickets () {

    const { id } = useParams();
    const [replyTicket, setReplyTickets] = useState([]);
    const [clientDetails, setClientDetails] = useState({});
    const [supportTicketDetails, setSupportTicketDetails] = useState({});

    // Get support ticket details
    useEffect(() => {
        function getsetReplyTickets() {
            axios.get(`http://localhost:8070/replyticket/reply/all`).then((res) => {
                console.log(res.data);
                setReplyTickets(res.data);

                res.data.forEach(replyTicket => {
                    const clientId = replyTicket.clientId;
                    if (!clientDetails[clientId]) {
                        axios.get(`http://localhost:8070/client/${clientId}`)
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

                    const supportTicketId = replyTicket.supportTicketId;
                    if (!supportTicketDetails[supportTicketId]) {
                        axios.get(`http://localhost:8070/supportticket/${supportTicketId}`)
                            .then(response => {
                                setSupportTicketDetails(prevDetails => ({
                                    ...prevDetails,
                                    [supportTicketId]: response.data
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
        getsetReplyTickets();
    }, [clientDetails, id, supportTicketDetails]);

    return (
        <div>
             <NavBar /> 
            <hr />

            <div className="uam-container">
                <h2 className="uam-header">Client</h2>
                <h1 className="uam-header">All Support Ticket Replies</h1>
        
                <h2>Support Ticket Repliess</h2>
                <table border='1' className="uam-summary-table">
                    <thead>
                        <tr className="uam-summary-table-row">
                            <th className="uam-summary-table-header">Reply Date</th>
                            <th className="uam-summary-table-header">Ticket Type </th>
                            <th className="uam-summary-table-header">Subject</th>
                            <th className="uam-summary-table-header">Reply</th>
                             <th className="uam-summary-table-header">Reply Status</th>
                             <th className="uam-summary-table-header">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            replyTicket.map(replyTicket => {
                                return (
                                    <tr className="uam-summary-table-row" key={replyTicket._id}>
                                        <td className="uam-summary-table-data">{
                                              new Date(replyTicket.replyTicketDate).toISOString().split('T')[0]
                                        }
                                        </td>
                                        <td className="uam-summary-table-data">{supportTicketDetails[replyTicket.supportTicketId]
                                                ? `${supportTicketDetails[replyTicket.supportTicketId].supTicketType} `
                                                : 'Loading...'}
                                        </td> 
                                        <td className="uam-summary-table-data">{supportTicketDetails[replyTicket.supportTicketId]
                                                ? `${supportTicketDetails[replyTicket.supportTicketId].supTicketSubject} `
                                                : 'Loading...'}
                                            </td> 
                                        <td className="uam-summary-table-data">{replyTicket.replyTicketMsg}</td>
                                        <td className="uam-summary-table-data">{replyTicket.replyTicketstatus}</td>                                         
                                        <td className="uam-summary-table-action"><a className="uam-summary-table-button" href={`/support-agent-dashboard/view-support-ticket/${replyTicket._id}`}>View Ticket</a></td>
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