import React, { useState } from 'react';
import './Atm_LawyerRegForm.css'; // Reusing the CSS for styling
import Footer from './Atm_LawyerReg_Footer';
import Nav from './Atm_LawyerReg_Nav';

function Atm_LawyerRegForm() {
  const [formData, setFormData] = useState({
    userId: '', 
    fName: '',
    lName: '',
    nic: '',
    email: '',
    phoneNumber: '',
    address: '',
    userType: '',
    education: '',
    password: '',
    createDate: '',
    userStatus: '',
  });
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = () => {
    if (!formData.email.includes('@')) {
      setEmailError('Email must contain @');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePhoneNumber = () => {
    if (formData.phoneNumber.length !== 10 || !/^\d+$/.test(formData.phoneNumber)) {
      setPhoneError('Phone number must be 10 digits');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const validateForm = () => {
    // Checking if all fields are filled
    for (let key in formData) {
      if (formData[key] === '') {
        setFormError('Please fill all the fields');
        return false;
      }
    }
    setFormError('');
    return validateEmail() && validatePhoneNumber();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Prevent form submission if validation fails
    }

    try {
      const response = await fetch('http://localhost:8070/userRegistration/add-userRegistration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Lawyer added successfully!'); // Set success message
        setFormData({
          userId: '', 
          fName: '',
          lName: '',
          nic: '',
          email: '',
          phoneNumber: '',
          address: '',
          userType: '',
          education: '',
          password: '',
          createDate: '',
          userStatus: '',
        });
        setFormError(''); 
      } else {
        alert('Error adding user registration.');
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
        <h2>Lawyer Registration Form</h2>

        {/* Success message display */}
        {successMessage && <div className="ATM_success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          {/* Input fields for the form */}
          <div className="ATM_form-group">
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ATM_form-group">
            <label htmlFor="fName">First Name:</label>
            <input
              type="text"
              id="fName"
              name="fName"
              value={formData.fName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ATM_form-group">
            <label htmlFor="lName">Last Name:</label>
            <input
              type="text"
              id="lName"
              name="lName"
              value={formData.lName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ATM_form-group">
            <label htmlFor="nic">NIC:</label>
            <input
              type="text"
              id="nic"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ATM_form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={validateEmail}
              required
            />
            {emailError && <span className="ATM_error-message">{emailError}</span>}
          </div>
          <div className="ATM_form-group">
            <label htmlFor="phoneNumber">Mobile Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={validatePhoneNumber}
              required
            />
            {phoneError && <span className="ATM_error-message">{phoneError}</span>}
          </div>
          <div className="ATM_form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ATM_form-group">
            <label className="ATM_form-label" htmlFor="userType">User Type:</label>
            <select
              className="ATM_form-input-select"
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
            >
              <option value="">Select User Type</option>
              <option value="Deed Manager">Deed Manager</option>
              <option value="Legal Manager">Legal Manager</option>
              <option value="Support Agent">Support Agent</option>
              <option value="Document Manager">Document Manager</option>
              <option value="Finance Manager">Finance Manager</option>
              <option value="Appointment Management">Appointment Management</option>
            </select>
          </div>
          <div className="ATM_form-group">
            <label htmlFor="education">Education:</label>
            <input
              type="text"
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ATM_form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ATM_form-group">
            <label htmlFor="createDate">Create Date:</label>
            <input
              type="date"
              id="createDate"
              name="createDate"
              value={formData.createDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* User Status Radio Buttons */}
          <div className="ATM_form-group">
            <label>User Status:</label>
            <div className="ATM_radio-group">
              <label>
                <input
                  type="radio"
                  name="userStatus"
                  value="Active"
                  checked={formData.userStatus === 'Active'}
                  onChange={handleChange}
                />
                Active
              </label>
              <label>
                <input
                  type="radio"
                  name="userStatus"
                  value="Inactive"
                  checked={formData.userStatus === 'Inactive'}
                  onChange={handleChange}
                />
                Inactive
              </label>
            </div>
          </div>

          {formError && <span className="ATM_error-message">{formError}</span>}
          <button type="submit">Register</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Atm_LawyerRegForm;
