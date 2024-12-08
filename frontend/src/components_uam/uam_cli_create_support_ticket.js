import NavBar from "./uam_page_navbar";
import Footer from "./uam_page_footer";
import './user_affairs_management.css';

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

function Uam_Create_Ticket() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [supTicketDate, setSupTicketDate] = useState("");
  const [userType] = useState("Client");
  const [clientId, setClientId] = useState(id);
  const [supTicketType, setSupTicketType] = useState("");
  const [supTicketEmail, setSupTicketEmail] = useState("");
  const [supFormPhone, setSupFormPhone] = useState("");
  const [supTicketSubject, setSupTicketSubject] = useState("");
  const [supTicketMsg, setSupTicketMsg] = useState("");
  const [supTicketStatus] = useState("Pending");

  const [errors, setErrors] = useState({});

  // Set the current date as the default date and prevent editing
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setSupTicketDate(currentDate);
  }, []);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePhone = (phone) => {
    return /^0\d{9}$/.test(phone);
  };

  const validateFields = () => {
    const newErrors = {};

    if (!validateEmail(supTicketEmail)) {
      newErrors.supTicketEmail = "Invalid email format. Must contain @.";
    }

    if (!validatePhone(supFormPhone)) {
      newErrors.supFormPhone = "Phone number must start with 0 and have 10 digits.";
    }

    if (!supTicketSubject) {
      newErrors.supTicketSubject = "Subject is required.";
    }

    if (!supTicketMsg) {
      newErrors.supTicketMsg = "Message is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function sendData(e) {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const newSupportTicket = {
      supTicketDate,
      userType,
      clientId,
      supTicketType,
      supTicketEmail,
      supFormPhone,
      supTicketSubject,
      supTicketMsg,
      supTicketStatus,
    };

    axios.post("http://localhost:8070/supportticket/add-support-ticket", newSupportTicket).then(() => {
      alert("Support Ticket Added..");
      navigate(`/client-portal/support/${id}`);
    }).catch((err) => {
      alert(err);
    });
  }

  return (
    <div className="uam-form-container">
      <NavBar />
      <hr />

      <h2 className='uam-header'>Client Support Ticket Creation Form</h2>

      <form className="uam-form" onSubmit={sendData}>
        <div className="uam-form-group">
          <label className="uam-form-label" htmlFor="supTicketDate">
            Support Ticket Date
          </label>
          <input
            className="uam-form-input"
            style={{ backgroundColor: '#EEEEEE' }}
            type="date"
            id="supTicketDate"
            name="supTicketDate"
            value={supTicketDate}
            readOnly
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
            value={userType}
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
            value={id}
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
            value={supTicketType}
            onChange={(e) => setSupTicketType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
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
            value={supTicketEmail}
            onChange={(e) => setSupTicketEmail(e.target.value)}
            required
          />
          {errors.supTicketEmail && <p className="error-message">{errors.supTicketEmail}</p>}
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
            value={supFormPhone}
            onChange={(e) => setSupFormPhone(e.target.value)}
            required
          />
          {errors.supFormPhone && <p className="error-message">{errors.supFormPhone}</p>}
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
            value={supTicketSubject}
            onChange={(e) => setSupTicketSubject(e.target.value)}
            required
          />
          {errors.supTicketSubject && <p className="error-message">{errors.supTicketSubject}</p>}
        </div>

        <div className="uam-form-group">
          <label className="uam-form-label" htmlFor="supTicketMsg">
            Ticket Message
          </label>
          <textarea
            className="uam-form-input-textarea"
            id="supTicketMsg"
            name="supTicketMsg"
            value={supTicketMsg}
            onChange={(e) => setSupTicketMsg(e.target.value)}
            required
          />
          {errors.supTicketMsg && <p className="error-message">{errors.supTicketMsg}</p>}
        </div>

        <button className="uam-form-button" type="submit">Submit</button>
      </form>

      <Footer />
    </div>
  );
}

export default Uam_Create_Ticket;
