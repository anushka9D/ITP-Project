import NavBar from "./apm_page_navbar";
import Footer from "./apm_page_footer";

import React, { useState, useEffect } from 'react';
import './appointment_management.css';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

function Apm_View_AppointmentRequest() {
    const { id, apManagerId } = useParams(); 
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

    const [appointmentManagerId] =useState(apManagerId)
    const [appointmentCreationDate, setAppointmentCreationDate] = useState("");
    const [appointmentTitle, setAppointmentTitle] = useState("");
    const [appointmentDescription, setAppointmentDescription] = useState("");
    const [appointmentStatus] = useState("Pending");

    function sendDataAppointment(e) {
        e.preventDefault();
        
        const newAppointment = {
            appointmentRequestId: appointmentrequest.appointmentRequestId,
            appointmentManagerId: apManagerId,
            lawyerId: appointmentrequest.lawyerId,
            clientId: appointmentrequest.clientId,
            appointmentCreationDate,
            appointmentTitle, 
            appointmentDescription,
            appointmentStatus,
          };
        
          axios.post("http://localhost:8070/appointment/add-appointment", newAppointment)
            .then(() => {
              alert("Appointment Added..");
            })
            .catch((err) => {
              alert(err);
            });

            axios.post(`http://localhost:8070/appointmentrequest/update/status/${id}`, newAppointment)
            .then(() => {
              alert("Appointment Added..");
              navigate(`/appointment-manager-dashboard/${apManagerId}`);
            })
            .catch((err) => {
              alert(err);
            });
    }


    if (!appointmentrequest) {
        return <div>Loading...</div>;
    }

    return (
        <div className="apm-form-container">
            <NavBar/>
            <hr />
            <h2 className='apm-header'>Lawyer Appointment Request Details</h2>

            <form className="apm-form">            
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
                <input
                    className="apm-form-input"
                    style={{ backgroundColor: '#EEEEEE' }}
                    type="text"
                    id="appointmentType"
                    name="appointmentType"
                    value={appointmentrequest.appointmentType}
                    readOnly
                />
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
                    readOnly/>
                </div>       
            </form>

            <hr className="form-divider" />
          
            <form className="apm-form" onSubmit={sendDataAppointment}>

            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentrequest">Appointment Request Id</label>
                <input className='apm-form-input'
                    type="text"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="appointmentrequest"
                    name="appointmentrequest"
                    value={appointmentrequest._id}
                    readOnly
                />
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentCreationDate">Appointment Creation Date</label>
                <input className='apm-form-input'
                    type="Date"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="appointmentCreationDate"
                    name="appointmentCreationDate"
                    value={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setAppointmentCreationDate(e.target.value)}
                    readOnly
                />
            </div>

            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="lawyerId">Lawyer Id</label>
                <input className='apm-form-input'
                    type="text"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="lawyerId"
                    name="lawyerId"
                    value={appointmentrequest.lawyerId}
                    readOnly
                />
            </div>

            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="clientId">Client Id</label>
                <input className='apm-form-input'
                    type="text"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="clientId"
                    name="clientId"
                    value={appointmentrequest.clientId}
                    readOnly
                />
            </div>

            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentTitle">Appointment Title</label>
                <input className='apm-form-input'
                    type="text"
                    id="appointmentTitle"
                    name="appointmentTitle"
                    onChange={(e) => setAppointmentTitle(e.target.value)}
                />
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentDescription">Description</label>
                <textarea className='apm-form-input-textarea'
                    id="appointmentDescription"
                    name="appointmentDescription"
                    onChange={(e) => setAppointmentDescription(e.target.value)}
                ></textarea>
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentManagerId">Appointment Manager Id</label>
                <input className='apm-form-input'
                    type="text"
                    id="appointmentManagerId"
                    name="appointmentManagerId"
                    value={apManagerId}
                />
            </div>    
            
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentStatus">Appointment Status</label>
                <input className='apm-form-input'
                    type="text"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="appointmentStatus"
                    name="appointmentStatus"
                    value="Pending"
                    readOnly
                />
            </div>
    
            <div className="apm-button-box">                
                <button type="submit" className="apm-table-link-button">Create Appointment</button>
            </div>    
        </form>
        <Footer/>
        </div>
    );
}

export default Apm_View_AppointmentRequest;