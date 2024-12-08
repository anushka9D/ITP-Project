import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Atm_LawFirm_Details.css';

const URL = "http://localhost:8070/lawfirm/lawfirms";

function Atm_LawFirm_Details() {
  const [lawFirms, setLawFirms] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data from the backend
  const fetchHandler = async () => {
    try {
      const response = await axios.get(URL);
      setLawFirms(response.data);
    } catch (err) {
      console.error("Error fetching data", err);
      setError("Failed to fetch law firms. Please try again later.");
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  // Navigate to the update page
  const handleUpdateClick = (id) => {
    navigate(`/lawfirm/update/${id}`);
  };

  // Navigate back to the previous page
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="ATM_table-container">
        <button className="ATM_back-button" onClick={goBack}>
          ←
        </button>
        <div className="ATM_spacer"></div> {/* Blank line between arrow and title */}
        
        <h1 style={{ textAlign: 'center', color: '#74512D' }}>Law Firm Details</h1>

        {error && <p className="ATM_error-message">{error}</p>}
        <table className="ATM_lawfirm-table">
          <thead>
            <tr>
              <th>Law Firm Id</th>
              <th>Law Firm Name</th>
              <th>Address</th>
              <th>Contact Number</th>
              <th>Registration Number</th>
              <th>Lawyer Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lawFirms.length > 0 ? (
              lawFirms.map((firm, i) => (
                <tr key={i}>
                  <td>{firm.lawFirmId}</td>
                  <td>{firm.name}</td>
                  <td>{firm.address}</td>
                  <td>{firm.contactNumber}</td>
                  <td>{firm.registrationNo}</td>
                  <td>{firm.lawyerId}</td>
                  <td>
                    <button className="ATM_update-button" onClick={() => handleUpdateClick(firm._id)}>
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No law firms found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Atm_LawFirm_Details;
