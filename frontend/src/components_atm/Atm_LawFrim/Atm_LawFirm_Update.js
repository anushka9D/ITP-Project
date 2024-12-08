import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Atm_LawFirm_Update.css';

function Atm_LawFirm_Update() {
  const [inputs, setInputs] = useState({
    lawFirmId:'',
    name: '',
    address: '',
    contactNumber: '',
    registrationNo: '',
    lawyerId:''
  });
  const [successMessage, setSuccessMessage] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLawFirmDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/lawfirm/lawfirm/${id}`);
        setInputs(response.data || {});
      } catch (error) {
        console.error("Error fetching law firm data", error);
      }
    };
    fetchLawFirmDetails();
  }, [id]);

  const sendUpdateRequest = async () => {
    try {
      const response = await axios.put(`http://localhost:8070/lawfirm/update-lawfirm/${id}`, inputs);
      console.log('Update response:', response.data);
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        navigate('/lawfirms'); // Redirect after success
      }, 3000);
    } catch (error) {
      console.error("Error updating law firm data", error);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendUpdateRequest();
  };

  if (!inputs || Object.keys(inputs).length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="ATM_form-container">

    
      <h1 style={{ textAlign: 'center', color: '#74512D' }}>Update Law Firm</h1>
<br></br>
      {successMessage && <div className="ATM_success-message">Successfully updated!</div>}
      <form onSubmit={handleSubmit}>
        <div className="ATM_form-group">
          <label>Law Firm ID</label>
          <input type="text" name="lawFirmId" value={inputs.lawFirmId || ''} onChange={handleChange} />
        </div>
        <div className="ATM_form-group">
          <label>Firm Name</label>
          <input type="text" name="name" value={inputs.name || ''} onChange={handleChange} />
        </div>
        <div className="ATM_form-group">
          <label>Address</label>
          <input type="text" name="address" value={inputs.address || ''} onChange={handleChange} />
        </div>
        <div className="ATM_form-group">
          <label>Contact Number</label>
          <input type="text" name="contactNumber" value={inputs.contactNumber || ''} onChange={handleChange} />
        </div>
        <div className="ATM_form-group">
          <label>Registration Number</label>
          <input type="text" name="registrationNo" value={inputs.registrationNo || ''} onChange={handleChange} />
        </div>
        <div className="ATM_form-group">
          <label>Lawyer Id</label>
          <input type="text" name="lawyerId" value={inputs.lawyerId || ''} onChange={handleChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Atm_LawFirm_Update;