import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Atm_Lawyer_Details/Atm_Lawyer_Display.css';

const URL = "http://localhost:8070/userRegistration/userRegistrations"; 

function Atm_Lawyer_Display() {
  const [lawyers, setLawyers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchHandler = async () => {
    try {
      const response = await axios.get(URL);
      setLawyers(response.data);
    } catch (err) {
      console.error("Error fetching data", err);
      setError("Failed to fetch lawyers. Please try again later.");
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const goToUpdate = (id) => {
    navigate(`/update-lawyer/${id}`);
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/userRegistration/delete-userRegistration/${id}`);
      setLawyers(lawyers.filter((lawyer) => lawyer._id !== id));
    } catch (error) {
      console.error('Error deleting lawyer:', error);
      setError('Failed to delete the lawyer. Please try again later.');
    }
  };

  return (
    <div>
      <div className="ATM_table-container">
        <button className="ATM_back-button" onClick={goBack}>
          ←
        </button>
        <div className="ATM_spacer"></div>
        <h1>Lawyer Details</h1>
        {error && <p className="ATM_error-message">{error}</p>}
        <table className="ATM_lawyer-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>NIC</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>User Type</th>
              <th>Education</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lawyers.length > 0 ? (
              lawyers.map((lawyer) => (
                <tr key={lawyer._id}>
                  <td>{lawyer.fullName}</td>
                  <td>{lawyer.nic}</td>
                  <td>{lawyer.email}</td>
                  <td>{lawyer.phoneNumber}</td>
                  <td>{lawyer.address}</td>
                  <td>{lawyer.userType}</td>
                  <td>{lawyer.education}</td>
                  <td>
                    <button 
                      className="ATM_update-button" 
                      onClick={() => goToUpdate(lawyer._id)}
                    >
                      Update
                    </button>
                    <button 
                      className="ATM_remove-button" 
                      onClick={() => deleteHandler(lawyer._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No lawyers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Atm_Lawyer_Display;
