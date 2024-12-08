import NavBar from "./apm_page_navbar";
import Footer from "./apm_page_footer";


import React, { useState, useEffect } from 'react';
import './appointment_management.css';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

function Apm_View_Appointment() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState(null);
    const [clientDetails, setClientDetails] = useState({});
    const [appointmentManagerDetails, setAppointmentManagerDetails] = useState({});
    const [appointmentRequestDetails, setAppointmentRequestDetails] = useState({});

    useEffect(() => {
        function getAppointment() {
            axios.get(`http://localhost:8070/appointment/view/${id}`)
                .then((res) => {
                    setAppointment(res.data);

                    //appointment request details
                    const appointmentRequestId = res.data.appointmentRequestId;
                    if (!appointmentRequestDetails[appointmentRequestId]) {
                        axios.get(`http://localhost:8070/appointmentrequest/view/${appointmentRequestId}`)
                            .then(response => {
                                setAppointmentRequestDetails(prevDetails => ({
                                    ...prevDetails,
                                    [appointmentRequestId]: response.data
                                }));
                            })
                            .catch(error => {
                                console.error("Error fetching appointment request details:", error);
                            });
                    }

                    //client details
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

                    //appointment manager details
                    const appointmentManagerId = res.data.appointmentManagerId;
                    if (!appointmentManagerDetails[appointmentManagerId]) {
                        axios.get(`http://localhost:8070/appointmentmanager/${appointmentManagerId}`)
                            .then(response => {
                                setAppointmentManagerDetails(prevDetails => ({
                                    ...prevDetails,
                                    [appointmentManagerId]: response.data
                                }));
                            })
                            .catch(error => {
                                console.error("Error fetching appointment manager details:", error);
                            });
                    }
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getAppointment();
    }, [clientDetails, appointmentRequestDetails, appointmentManagerDetails, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.put(`http://localhost:8070/appointment/update/${id}`, appointment)
            .then((response) => {
                alert("Appointment Updated Successfully");
                navigate(`/appointment-manager-dashboard/appointments/${appointment.lawyerId}`);
            })
            .catch((err) => {
                console.error("Error in updating appointment:", err);
                alert("Error in updating appointment");
            });
    };

    const handleDelete = async (id) => {
        try {
          const response = await axios.delete(`http://localhost:8070/appointment/delete/${id}`);
      
          if (response.status === 200) {
            alert("Appointment deleted successfully!");
            navigate(`/appointment-manager-dashboard/appointments/${appointment.lawyerId}`);  
          } else {
            console.error("Unexpected response status:", response.status);
            alert("An error occurred during deletion. Please try again.");
          }
        } catch (err) {
          console.error("Error deleting appointment  :", err);
          alert("An error occurred during deletion. Please try again.");
        }
      };

    if (!appointment) {
        return <div>Loading...</div>;
    }

    return (
        <div className="apm-form-container">

            <NavBar />
        <form className="apm-form" onSubmit={handleSubmit}>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentCreationDate">Appointment Creation Date</label>
                <input className='apm-form-input'
                    type="text"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="appointmentCreationDate"
                    name="appointmentCreationDate"
                    value={new Date(appointment.appointmentCreationDate).toString().split('T')[0]}
                    onChange={handleChange}
                    readOnly
                />
            </div>

            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentTitle">Appointment Title</label>
                <input className='apm-form-input'
                    type="text"
                    id="appointmentTitle"
                    name="appointmentTitle"
                    value={appointment.appointmentTitle}
                    onChange={handleChange}
                />
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentDescription">Description</label>
                <textarea className='apm-form-input-textarea'
                    id="appointmentDescription"
                    name="appointmentDescription"
                    value={appointment.appointmentDescription}
                    onChange={handleChange}
                ></textarea>
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentManagerId">Appointment Manager Id</label>
                <input className='apm-form-input'
                    type="text"
                    id="appointmentManagerId"
                    name="appointmentManagerId"
                    value={appointment.appointmentManagerId}
                    onChange={handleChange}
                />
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentManagerName">Appointment Manager Name</label>
                <input className='apm-form-input'
                    type="text"
                    id="appointmentManagerName"
                    name="appointmentManagerName"
                    style={{ backgroundColor: '#EEEEEE' }}
                    value={appointmentManagerDetails[appointment.appointmentManagerId]
                        ? `${appointmentManagerDetails[appointment.appointmentManagerId].fName} ${appointmentManagerDetails[appointment.appointmentManagerId].lName}`
                        : 'Loading...'}
                    onChange={handleChange}
                    readOnly
                />
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentManagerMobile">Appointment Manager Mobile</label>
                <input className='apm-form-input'
                    type="text"
                    id="appointmentManagerMobile"
                    name="appointmentManagerMobile"
                    style={{ backgroundColor: '#EEEEEE' }}
                    value={appointmentManagerDetails[appointment.appointmentManagerId]
                        ? appointmentManagerDetails[appointment.appointmentManagerId].phoneNumber
                        : 'Loading...'}
                    onChange={handleChange}
                    readOnly
                />
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="lawyerId">Lawyer ID</label>
                <input className='apm-form-input'
                    type="text"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="lawyerId"
                    name="lawyerId"
                    value={appointment.lawyerId}
                    onChange={handleChange}
                    readOnly
                />
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="clientId">Client ID</label>
                <input className='apm-form-input'
                    type="text"
                    id="clientId"
                    name="clientId"
                    value={appointment.clientId}
                    onChange={handleChange}
                />
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="clientName">Client Name</label>
                <input className='apm-form-input'
                    type="text"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="clientName"
                    name="clientName"
                    value={clientDetails[appointment.clientId]
                        ? `${clientDetails[appointment.clientId].fname} ${clientDetails[appointment.clientId].lname}`
                        : 'Loading...'}
                    onChange={handleChange}
                    readOnly
                />
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="clientPhone">Client Phone</label>
                <input className='apm-form-input'
                    type="text"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="clientPhone"
                    name="clientPhone"
                    value={clientDetails[appointment.clientId]
                        ? clientDetails[appointment.clientId].phone
                        : 'Loading...'}
                    onChange={handleChange}
                    readOnly
                />
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentType">Appointment Type</label>
                <input className='apm-form-input'
                    type="text"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="appointmentType"
                    name="appointmentType"
                    value={appointmentRequestDetails[appointment.appointmentRequestId]
                        ? appointmentRequestDetails[appointment.appointmentRequestId].appointmentType
                        : 'Loading...'}
                    onChange={handleChange}
                    readOnly
                />
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentDate">Appointment Date</label>
                <input className='apm-form-input'
                    type="text"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="appointmentDate"
                    name="appointmentDate"
                    value={appointmentRequestDetails[appointment.appointmentRequestId]
                        ? new Date(appointmentRequestDetails[appointment.appointmentRequestId].appointmentDate).toISOString().split('T')[0]
                        : 'Loading...'}
                    onChange={handleChange}
                    readOnly
                />
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentTime">Appointment Time</label>
                <input className='apm-form-input'
                    type="text"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="appointmentTime"
                    name="appointmentTime"
                    value={appointmentRequestDetails[appointment.appointmentRequestId]
                        ? appointmentRequestDetails[appointment.appointmentRequestId].appointmentTime
                        : 'Loading...'}
                    onChange={handleChange}
                    readOnly
                />
            </div> 
           
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentLocation">Location</label>
                <input className='apm-form-input'
                    type="text"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="appointmentLocation"
                    name="appointmentLocation"
                    value={appointmentRequestDetails[appointment.appointmentRequestId]
                        ? appointmentRequestDetails[appointment.appointmentRequestId].appointmentLocation
                        : 'Loading...'}
                    onChange={handleChange}
                    readOnly
                />
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="discussedPoints">Discussed Points</label>
                <textarea className='apm-form-input-textarea'
                    id="discussedPoints"
                    name="discussedPoints"
                    value={appointment.discussedPoints}
                    onChange={handleChange}
                ></textarea>
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="agreedPayment">Agreed Payment</label>
                <input className='apm-form-input'
                    type="text"
                    id="agreedPayment"
                    name="agreedPayment"
                    value={appointment.agreedPayment}
                    onChange={handleChange}
                />
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="requestedDocuments">Requested Documents</label>
                <textarea className='apm-form-input-textarea'
                    id="requestedDocuments"
                    name="requestedDocuments"
                    value={appointment.requestedDocuments}
                    onChange={handleChange}
                ></textarea>
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="nextAppointmentDate">Next Appointment Date</label>
                <input className='apm-form-input'
                    type="date"
                    id="nextAppointmentDate"
                    name="nextAppointmentDate"
                    value={new Date(appointment.nextAppointmentDate).toString().split('T')[0]}
                    onChange={handleChange}
                />
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentStatus">Appointment Status</label>
                <input className='apm-form-input'
                    type="text"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="appointmentStatus"
                    name="appointmentStatus"
                    value={appointment.appointmentStatus}
                    onChange={handleChange}
                    readOnly
                />
            </div>
    
            <div className="apm-button-box">                
                <button type="submit" className="apm-table-link-button">Update Request</button>          
                <button
                    type="button"
                    className="apm-table-negative-button"
                    onClick={() => handleDelete(appointment._id)}>
                    Delete Request
                </button>
            </div>
        </form>

        <Footer/>
    </div>
    
    );
}

export default Apm_View_Appointment;