import React, { useState } from 'react';
import './Atm_LawFrim_Add.css';

import Nav from './Atm_LawFrim_Nav';
import Footer from "./Atm_LawFirm_Footer";

function Atm_LawFrim_Add() {
  
  const [formData, setFormData] = useState({
    lawFirmId:'',
    name: '',
    address: '',
    contactNumber: '',
    registrationNo: '',
    lawyerId:''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8070/lawfirm/add-lawfirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Law firm added successfully!');
        setFormData({ lawFirmId:'',name: '', address: '', contactNumber: '', registrationNo: '', lawyerId:'' });
      } else {
        alert('Error adding law firm.');
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  };

  return (
    <div>
      <Nav />
      <br /><br /><br /><br />
      <div className="ATM_form-container">
        <h2 className="ATM_h2">Add Law Firm</h2>
        <form onSubmit={handleSubmit}>
          <div className="ATM_form-group">
            <label className="ATM_label" htmlFor="lawFirmId">Law Firm ID</label>
            <input
              className="ATM_input"
              type="text"
              id="lawFirmId"
              name="lawFirmId"
              value={formData.lawFirmId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ATM_form-group">
            <label className="ATM_label" htmlFor="name">Law Firm Name</label>
            <input
              className="ATM_input"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ATM_form-group">
            <label className="ATM_label" htmlFor="address">Address</label>
            <input
              className="ATM_input"
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ATM_form-group">
            <label className="ATM_label" htmlFor="contactNumber">Contact Number</label>
            <input
              className="ATM_input"
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ATM_form-group">
            <label className="ATM_label" htmlFor="registrationNo">Registration Number</label>
            <input
              className="ATM_input"
              type="text"
              id="registrationNo"
              name="registrationNo"
              value={formData.registrationNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ATM_form-group">
            <label className="ATM_label" htmlFor="lawyerId">Lawyer Id</label>
            <input
              className="ATM_input"
              type="text"
              id="lawyerId"
              name="lawyerId"
              value={formData.lawyerId}
              onChange={handleChange}
              required
            />
          </div>
          <button className="ATM_button" type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Atm_LawFrim_Add;