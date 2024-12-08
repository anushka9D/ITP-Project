import NavBar from "./uam_page_navbar";
import Footer from "./uam_page_footer";
import './user_affairs_management.css';

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

function SupportTicketView() {

  const { id, agentId } = useParams();
  const navigate = useNavigate();
  const [supportTicket, setSupportTicket] = useState(null);

  useEffect(() => {
    function getSupportTicket() {
      axios.get(`http://localhost:8070/supportticket/${id}`)
        .then((res) => {
          setSupportTicket(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getSupportTicket();
  }, [id]);


  const [supportTicketId] = useState(id); // New state for support ticket ID
  const [replyTicketDate] = useState(new Date()); // New state for reply ticket date
  const [userType] = useState("Client");
  const [supAgentId] = useState(agentId); // New state for support agent ID
  const [replyTicketMsg, setReplyTicketMsg] = useState(""); // New state for reply ticket message
  const [replyTicketStatus] = useState("Pending"); // Status set to "Pending"


  function sendData(e) {
    e.preventDefault();

    const newReplyTicket = {
      supportTicketId,  // Assuming you have logic to set this ID
      replyTicketDate,
      userType,
      clientId : supportTicket.clientId,
      supAgentId,
      replyTicketMsg,
      replyTicketStatus,
    };

    axios.post("http://localhost:8070/replyticket/add-reply-ticket", newReplyTicket).then(() => {
      alert("Reply Ticket Added..");      
    }).catch((err) => {
      alert(err);
    });

    axios.put(`http://localhost:8070/supportticket/update/status/${id}`, supportTicket)
    .then((response) => {
      alert("Support Ticket Updated Successfully");
      navigate(`/support-agent-dashboard/${agentId}`);
    })
    .catch((err) => {
      console.error("Error in updating support ticket:", err);
      alert("Error in updating support ticket");
    });
    
  }

  

  if (!supportTicket) {
    return <div>Loading...</div>;
  }

    return (
        <div className="uam-form-container">
        <NavBar />
        <hr/>

        <h2 className='uam-header'>Client Support Ticket View Form</h2>

        <form className="uam-form" >
            <div className="uam-form-group">
                <label className="uam-form-label" htmlFor="supTicketDate">
                Support Ticket Date
                </label>
                <input
                className="uam-form-input"
                type="text"
                id="supTicketDate"
                name="supTicketDate"
                value={new Date(supportTicket.supTicketDate).toISOString().split('T')[0]}

                readOnly
                />
            </div>

            <div className="uam-form-group">
                <label className="uam-form-label" htmlFor="userType">
                User Type
                </label>
                <input
                className="uam-form-input"
                style={{ backgroundColor: '#EEEEEE' }}
                type="text"
                id="userType"
                name="userType"
                value={supportTicket.userType}
                readOnly
                />
            </div>

            <div className="uam-form-group">
                <label className="uam-form-label" htmlFor="clientId">
                Client ID
                </label>
                <input
                className="uam-form-input"
                style={{ backgroundColor: '#EEEEEE' }}
                type="text"
                id="clientId"
                name="clientId"
                value={supportTicket.clientId}
                readOnly
                />
            </div>

            <div className="uam-form-group">
                <label className="uam-form-label" htmlFor="supTicketType">
                Support Ticket Type
                </label>
                <select
                className="uam-form-input-select"
                id="supTicketType"
                name="supTicketType"
                value={supportTicket.supTicketType}
                readOnly
                >
                <option value="{supportTicket.supTicketType}">{supportTicket.supTicketType}</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Billing Issue">Billing Issue</option>
                <option value="Account Access">Account Access</option>
                <option value="General Inquiry">General Inquiry</option>
                </select>
            </div>

            <div className="uam-form-group">
                <label className="uam-form-label" htmlFor="supTicketEmail">
                Client Email
                </label>
                <input
                className="uam-form-input"
                type="email"
                id="supTicketEmail"
                name="supTicketEmail"
                value={supportTicket.supTicketEmail}
                readOnly
                />
            </div>

            <div className="uam-form-group">
                <label className="uam-form-label" htmlFor="supFormPhone">
                Client Phone
                </label>
                <input
                className="uam-form-input"
                type="text"
                id="supFormPhone"
                name="supFormPhone"
                value={supportTicket.supFormPhone}
                readOnly
                />
            </div>

            <div className="uam-form-group">
                <label className="uam-form-label" htmlFor="supTicketSubject">
                Ticket Subject
                </label>
                <input
                className="uam-form-input"
                type="text"
                id="supTicketSubject"
                name="supTicketSubject"
                value={supportTicket.supTicketSubject}
                readOnly
                />
            </div>

            <div className="uam-form-group">
                <label className="uam-form-label-2" htmlFor="supTicketMsg">
                Ticket Message
                </label>
                <textarea
                className="uam-form-input-textarea-2"
                id="supTicketMsg"
                name="supTicketMsg"
                value={supportTicket.supTicketMsg}
                readOnly
                />
            </div>

            <div className="uam-form-group" hidden>
                <label className="uam-form-label" htmlFor="supTicketStatus">
                Ticket Status
                </label>
                <input
                style={{ backgroundColor: '#EEEEEE' }}
                className="uam-form-input"
                type="text"
                id="supTicketStatus"
                name="supTicketStatus"
                value="Pending"
                readOnly
                />
            </div>

           
        </form>

        <hr className="form-divider" />

       <h3 className="uam-sub-topic">Create Reply Ticket</h3>

        <form className="uam-form"  id="replyTicketForm" onSubmit={sendData}>
            <div className="uam-form-group" hidden>
                <label className='uam-form-label' htmlFor="supportTicketId">Support Ticket ID:</label>
                <input className='uam-form-input'
                    type="text"
                    id="supportTicketId"
                    name="supportTicketId"
                    required
                    value={id}
                    readOnly
                />
            </div>

            <div className="uam-form-group">
                <label className='uam-form-label' htmlFor="replyTicketDate">Reply Ticket Date:</label>
                <input className='uam-form-input'
                    type="date"
                    style={{ backgroundColor: 'var(--read-only-color)' }}
                    id="replyTicketDate"
                    name="replyTicketDate"
                    required
                    value={new Date().toISOString().split('T')[0]}
                    readOnly
                />
            </div>

            <div className="uam-form-group">
                <label className='uam-form-label' htmlFor="userType">User Type:</label>
                <input className='uam-form-input'
                    style={{ backgroundColor: 'var(--read-only-color)' }}
                    type="text"
                    id="userType"
                    name="userType"
                    required
                    value={supportTicket.userType}
                    readOnly
                />
            </div>

            <div className="uam-form-group">
                <label className='uam-form-label' htmlFor="clientId">Client ID:</label>
                <input className='uam-form-input'
                    style={{ backgroundColor: 'var(--read-only-color)' }}
                    type="text"
                    id="clientId"
                    name="clientId"
                    required
                    value={supportTicket.clientId}
                    readOnly
                />
            </div>

            <div className="uam-form-group">
                <label className='uam-form-label' htmlFor="supAgentId">Support Agent ID:</label>
                <input className='uam-form-input'
                    type="text"
                    id="supAgentId"
                    style={{ backgroundColor: 'var(--read-only-color)' }}
                    name={agentId}
                    value={agentId}
                    readOnly
                    required
                />
            </div>

            <div className="uam-form-group">
                <label className='uam-form-label-2' htmlFor="replyTicketMsg">Reply Ticket Message:</label>
                <textarea className='uam-form-input-textarea-2'
                    id="replyTicketMsg"
                    name="replyTicketMsg"
                    rows="4"
                    required
                    onChange={(e) => setReplyTicketMsg(e.target.value)} // Handle change to update state
                ></textarea>
            </div>

            <div className="uam-form-group">
                <label className='uam-form-label' htmlFor="replyTicketStatus">Reply Ticket Status:</label>
                 <input className='uam-form-input'
                    style={{ backgroundColor: 'var(--read-only-color)' }}
                    type="text"
                    id="supAgentId"
                    name="replyTicketStatus"
                    value="Pending"
                    readOnly
                />
            </div>

            <div className="uam-button-box">
                <button type="submit" className="uam-table-link-button">Submit Reply Ticket</button>
            </div>
     </form>
        <Footer />
        </div>
    );
}

export default SupportTicketView;