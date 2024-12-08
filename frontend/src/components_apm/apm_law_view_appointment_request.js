import NavBar from "../components_lcm/Lcm_NavBar";
import Footer from "../components_lcm/Lcm_Footer";
import './appointment_management.css';

import React, { useState, useEffect } from 'react';
import './appointment_management.css';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

function Apm_View_AppointmentRequest() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [appointmentrequest, setAppointmentRequests] = useState(null);
    const [clientDetails, setClientDetails] = useState({});

    useEffect(() => {
        function getAppointmentRequests() {
            axios.get(`http://localhost:8070/appointmentrequest/${id}`)
                .then((res) => {
                    setAppointmentRequests(res.data);

                    const clientId = res.data.clientId;
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
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getAppointmentRequests();
    }, [clientDetails, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointmentRequests(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.put(`http://localhost:8070/appointmentrequest/update/${id}`, appointmentrequest)
            .then((response) => {
                alert("Appointment Request Updated Successfully");
                navigate(`/lawyer-dashboard/appointments/${appointmentrequest.lawyerId}`);
            })
            .catch((err) => {
                console.error("Error in updating appointment:", err);
                alert("Error in updating appointment");
            });
    };

    const handleDelete = async (id) => {
        try {
          const response = await axios.delete(`http://localhost:8070/appointmentrequest/delete/${id}`);
      
          if (response.status === 200) {
            alert("Appointment request deleted successfully!");
            navigate(`/lawyer-dashboard/appointments/${appointmentrequest.lawyerId}`);  
          } else {
            console.error("Unexpected response status:", response.status);
            alert("An error occurred during deletion. Please try again.");
          }
        } catch (err) {
          console.error("Error deleting appointment request:", err);
          alert("An error occurred during deletion. Please try again.");
        }
      };

    if (!appointmentrequest) {
        return <div>Loading...</div>;
    }

    return (
        <div className="apm-form-container">

        <NavBar />
            <hr />
            <h2 className='apm-header'>Lawyer Appointment Request Details</h2>

            <form className="apm-form" onSubmit={handleSubmit}>
            
                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentRequestName">
                    Request Name
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="appointmentRequestName"
                    name="appointmentRequestName"
                    value={appointmentrequest.appointmentRequestName || ''}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentRequestDate">
                    Request Date
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="appointmentRequestDate"
                    name="appointmentRequestDate"
                    value={new Date(appointmentrequest.appointmentRequestDate).toISOString().split('T')[0]}
                    onChange={handleChange}
                    required
                />
                </div>
                
                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="lawyerId">
                    Lawyer ID
                </label>
                <input
                    className="apm-form-input"
                    style={{ backgroundColor: '#EEEEEE' }}
                    type="text"
                    id="lawyerId"
                    name="lawyerId"
                    value={appointmentrequest.lawyerId || ''}
                    onChange={handleChange}
                    readOnly
                />
                </div>

                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="clientId">
                    Client ID
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="clientId"
                    name="clientId"
                    value={appointmentrequest.clientId || ''}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="clientName">
                    Client Name
                </label>
                <input
                    className="apm-form-input"
                    style={{ backgroundColor: '#EEEEEE' }}
                    type="text"
                    id="clientName"
                    name="clientName"
                    value={clientDetails[appointmentrequest.clientId]
                        ? `${clientDetails[appointmentrequest.clientId].fname} ${clientDetails[appointmentrequest.clientId].lname}`
                        : 'Loading...'}
                    readOnly
                />
                </div>

                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="clientPhone">
                    Client Phone
                </label>
                <input
                    className="apm-form-input"
                    style={{ backgroundColor: '#EEEEEE' }}
                    type="text"
                    id="clientPhone"
                    name="clientPhone"
                    value={clientDetails[appointmentrequest.clientId]?.phone || ''}
                    readOnly
                />
                </div>

                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentType">
                    Appointment Type
                </label>
                <select
                    className="apm-form-input-select"
                    id="appointmentType"
                    name="appointmentType"
                    value={appointmentrequest.appointmentType}
                    onChange={handleChange}
                    required
                >
                    <option value={appointmentrequest.appointmentType}>{appointmentrequest.appointmentType}</option>
                    <option value="consultation">Consultation</option>
                    <option value="meeting">Meeting</option>
                    <option value="other">Other</option>
                </select>
                </div>

                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentDate">
                    Appointment Date
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="appointmentDate"
                    name="appointmentDate"
                    value={new Date(appointmentrequest.appointmentDate).toISOString().split('T')[0]}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentTime">
                    Appointment Time
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="appointmentTime"
                    name="appointmentTime"
                    value={appointmentrequest.appointmentTime}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentLocation">
                    Appointment Location
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="appointmentLocation"
                    name="appointmentLocation"
                    value={appointmentrequest.appointmentLocation || ''}
                    onChange={handleChange}
                    required
                />
                </div>         

                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentRequestStatus">
                    Request Status
                </label>
                <input
                    className="apm-form-input"
                    style={{ backgroundColor: '#EEEEEE' }}
                    type="text"
                    id="appointmentRequestStatus"
                    name="appointmentRequestStatus"
                    value={appointmentrequest.appointmentRequestStatus}
                    onChange={handleChange}
                    readOnly/>
                </div>       

                <div className="apm-button-box">
                    <button type="submit" className="apm-table-link-button">Update Request</button>
                    <button 
                        type="button" 
                        className="apm-table-negative-button" 
                        onClick={() => handleDelete(appointmentrequest._id)}> 
                        Delete Request 
                    </button>
                </div> 
            </form>

            <Footer/>
        </div>
    );
}

export default Apm_View_AppointmentRequest;