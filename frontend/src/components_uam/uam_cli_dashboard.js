import NavBar from "./uam_page_navbar";
import Footer from "./uam_page_footer";
import './user_affairs_management.css';

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {

  const { id } = useParams();
  const [supportTickets, setSupportTickets] = useState([]); 
  
  const [replyTickets, setReplyTickets] = useState([]); 
  const [supportAgent, setSupportAgent] = useState({}); 
  const [clientDetails, setClientDetails] = useState({});
  const [supportTickeDetail, setSupportTicketDetails] = useState([]); 

  // Get support ticket details
  useEffect(() => {
    function getSupportTickets() {
      axios.get(`http://localhost:8070/supportticket/pending/client/${id}`).then((res) => { 
        console.log(res.data);
        setSupportTickets(res.data);         
      }).catch((err) => {
        alert(err.message);
      });
    }
    getSupportTickets();
  }, [clientDetails, id]);


  // get all pending replies (for specific client)
  useEffect(() => {
    function getReplyTickets(){
      axios.get(`http://localhost:8070/replyticket/pending/client/${id}`).then((res) => {
        console.log(res.data);
        setReplyTickets(res.data);

        res.data.forEach(replyTickets => {
            const userId = replyTickets.supAgentId;
                    if (!supportAgent[userId]) {
                        axios.get(`http://localhost:8070/supportagent/${userId}`)
                            .then(response => {
                              setSupportAgent(prevDetails => ({
                                    ...prevDetails,
                                    [userId]: response.data
                                  }));
                                })
                                .catch(error => {
                                  console.error("Error fetching support agent details:", error);
                        });
                }

                const _id = replyTickets.supportTicketId;
                        if (!supportTickeDetail[_id]) {
                            axios.get(`http://localhost:8070/supportticket/${_id}`)
                                .then(response => {
                                    setSupportTicketDetails(prevDetails => ({
                                        ...prevDetails,
                                        [_id]: response.data
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
                      getReplyTickets();
    }, [supportAgent, supportTickeDetail, id]);


  //get details related to client 
  useEffect(() => { 
    function getClient(){
      axios.get(`http://localhost:8070/client/v/${id}`).then((res) => {
        console.log(res.data);
        setClientDetails(res.data); 
      }).catch((err) => {
        alert(err.message);
      })
    }
    getClient();
  }, [id])
 
  return (
    <div>
        <NavBar />
        <hr />

        <div className="uam-container">
        <h1 className="uam-header">Client Support Dashboard</h1>

        <p className="uam-user-welcome">Welcome {clientDetails.fname} {clientDetails.lname}</p>
        <p className="uam-user-welcome">User ID : {clientDetails.clientId}</p>

        <h2>My Support Tickets..</h2>
        <table border='1' className="uam-summary-table">
        <thead>
            <tr className="uam-summary-table-row">
                <th className="uam-summary-table-header">Ticket Date</th>
                <th className="uam-summary-table-header">Ticket Type</th> 
                <th className="uam-summary-table-header">Subject</th>
                <th className="uam-summary-table-header">Status</th>
                <th className="uam-summary-table-header">Action</th>
            </tr>
        </thead>
        <tbody>
            {
            supportTickets.map(supportTicket => {
                return (
                <tr className="uam-summary-table-row" key={supportTicket._id}>
                    <td className="uam-summary-table-data">{
                    new Date(supportTicket.supTicketDate).toISOString().split('T')[0]
                    }
                    </td>
                    <td className="uam-summary-table-data">{supportTicket.supTicketType}</td>
                    <td className="uam-summary-table-data">{supportTicket.supTicketSubject}</td>
                    <td className="uam-summary-table-data">{supportTicket.supTicketStatus}</td>
                    <td className="uam-summary-table-action">
                        <a className="uam-summary-table-button" href={`/client-portal/view-support-ticket/${supportTicket._id}`}>View Ticket</a>
                    </td>
                </tr>
                )
            })
            }
        </tbody>
        </table>

        <div className="uam-button-box">
                    <a className="uam-table-link-button" href={`/client-portal/create-support-ticket/${id}`}>Create New Ticket</a>
                    <a className="uam-table-link-button" href={`/client-portal/view-all-support-tickets/${id}`}>View Previous Tickets</a>
                </div>

            <h2>My Ticket Replies..</h2>
            <table border='1' className="uam-summary-table">
            <thead>
                <tr className="uam-summary-table-row">
                    <th className="uam-summary-table-header">Reply Date</th>
                    <th className="uam-summary-table-header">Ticket Type</th> 
                    <th className="uam-summary-table-header">Subject</th>
                    <th className="uam-summary-table-header">Agent Name</th>
                    <th className="uam-summary-table-header">Agent Mobile</th>
                    <th className="uam-summary-table-header">Status</th>
                    <th className="uam-summary-table-header">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                replyTickets.map(replyTicket => {
                    return (
                    <tr className="uam-summary-table-row" key={replyTicket._id}>
                        <td className="uam-summary-table-data">{
                          new Date(replyTicket.replyTicketDate).toISOString().split('T')[0]
                        }</td>
                        <td className="uam-summary-table-data">
                        {supportTickeDetail[replyTicket.supportTicketId]
                            ? supportTickeDetail[replyTicket.supportTicketId].supTicketType
                            : 'Loading...'}
                        </td>
                        <td className="uam-summary-table-data">
                        {supportTickeDetail[replyTicket.supportTicketId]
                            ? supportTickeDetail[replyTicket.supportTicketId].supTicketSubject
                            : 'Loading...'}
                        </td>
                        <td className="uam-summary-table-data">
                        {supportAgent[replyTicket.supAgentId]
                            ? `${supportAgent[replyTicket.supAgentId].fName} ${supportAgent[replyTicket.supAgentId].lName}`
                            : 'Loading...'}
                        </td>
                        <td className="uam-summary-table-data">
                        {supportAgent[replyTicket.supAgentId]
                            ? supportAgent[replyTicket.supAgentId].phoneNumber
                            : 'Loading...'}
                        </td>
                        <td className="uam-summary-table-data">{replyTicket.replyTicketstatus}</td>
                        <td className="uam-summary-table-action"><a className="uam-summary-table-button" href={`/client-portal/view-ticket-reply/${replyTicket._id}/${id}`}>View Reply</a></td>
                    </tr>
                    )
                })
                }
            </tbody>
            </table>

            <a className="apm-view-button" href={`/client-portal/view-all-ticket-replies/${id}`}>View Previous Replies</a>

        </div>
        <Footer />
    </div>
  )
}

export default Dashboard;