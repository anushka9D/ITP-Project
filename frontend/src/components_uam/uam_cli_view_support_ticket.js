import NavBar from "./uam_page_navbar";
import Footer from "./uam_page_footer";
import './user_affairs_management.css';

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

function SupportTicketView() {
  const { id } = useParams();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupportTicket(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8070/supportticket/update/${id}`, supportTicket)
      .then((response) => {
        alert("Support Ticket Updated Successfully");
        navigate(`/client-portal/support/${supportTicket.clientId}`);
      })
      .catch((err) => {
        console.error("Error in updating support ticket:", err);
        alert("Error in updating support ticket");
      });
      
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8070/supportticket/delete/${id}`);

      if (response.status === 200) {
        alert("Support ticket deleted successfully!");
        navigate(`/client-portal/support/${supportTicket.clientId}`);
      } else {
        console.error("Unexpected response status:", response.status);
        alert("An error occurred during deletion. Please try again.");
      }
    } catch (err) {
      console.error("Error deleting support ticket request:", err);
      alert("An error occurred during deletion. Please try again.");
    }
  };

  if (!supportTicket) {
    return <div>Loading...</div>;
  }

    return (
        <div className="uam-form-container">
        <NavBar />
        <hr/>

        <h2 className='uam-header'>Client Support Ticket View Form</h2>

        <form className="uam-form" onSubmit={handleSubmit}>
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
                onChange={handleChange}
                required
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
                onChange={handleChange}
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
                onChange={handleChange}
                required
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
                onChange={handleChange}
                required
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
                onChange={handleChange}
                required
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
                onChange={handleChange}
                required
                />
            </div>

            <div className="uam-form-group">
                <label className="uam-form-label" htmlFor="supTicketMsg">
                Ticket Message
                </label>
                <textarea
                className="uam-form-input-textarea"
                id="supTicketMsg"
                name="supTicketMsg"
                value={supportTicket.supTicketMsg}
                onChange={handleChange}
                required
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

            <div className="uam-button-box">                
                <button className="uam-table-link-button" type="submit">Update Ticket</button>
                <button className="uam-table-negative-button" type="button" onClick={() => handleDelete(id)}>
                    Delete Ticket
                </button>
            </div>
        </form>

        <Footer />
        </div>
    );
}

export default SupportTicketView;