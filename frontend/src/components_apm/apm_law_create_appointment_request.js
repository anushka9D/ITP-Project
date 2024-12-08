import NavBar from "../components_lcm/Lcm_NavBar";
import Footer from "../components_lcm/Lcm_Footer";
import './appointment_management.css';

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

function Apm_Create_AppointmentRequest() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [legalcaseManager, setLegalcaseManager] = useState([]);
    const [nic, setNic] = useState('');
    const [client, setClient] = useState(null);
    const [appointmentRequestName, setappointmentRequestName] = useState("");
    const [appointmentRequestDate, setappointmentRequestDate] = useState("");
    const [appointmentRequestStatus, setappointmentRequestStatus] = useState("Pending");
    const [lawyerId, setlawyerId] = useState(`${id}`);
    const [clientId, setclientId] = useState("");
    const [clientName, setclientName] = useState("");
    const [clientPhone, setclientPhone] = useState("");
    const [appointmentType, setappointmentType] = useState("");
    const [appointmentDate, setappointmentDate] = useState("");
    const [appointmentTime, setappointmentTime] = useState("");
    const [appointmentLocation, setappointmentLocation] = useState("");
    const [errors, setErrors] = useState({}); // State for validation errors

    const validateForm = () => {
        const newErrors = {};
        const currentDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format


        // Validate phone number
        if (!/^0\d{9}$/.test(clientPhone)) {
            newErrors.clientPhone = 'Phone number must start with 0 and have 10 digits';
        }

        // Validate appointment date
        if (appointmentDate < currentDate) {
            newErrors.appointmentDate = 'Appointment date cannot be in the past';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    function sendData(e) {
        e.preventDefault();
        if (!validateForm()) return; // Only send data if validation passes
        
        const newAppointmentRequest = {
            appointmentRequestName,
            appointmentRequestDate,
            appointmentRequestStatus,
            lawyerId,
            clientId,
            appointmentType,
            appointmentDate,
            appointmentTime,
            appointmentLocation
        }

        axios.post("http://localhost:8070/appointmentrequest/add-appointment-request", newAppointmentRequest).then(() => {
            alert("Appointment Request Added..");
            navigate(`/lawyer-dashboard/appointments/${id}`);
        }).catch((err) => {
            alert(err)
        });
    }

    useEffect(() => {
        function getLegalcaseManager() {
            axios.get(`http://localhost:8070/legalcasemanager/${id}`).then((res) => {
                console.log(res.data);
                setLegalcaseManager(res.data);
            }).catch((err) => {
                alert(err.message);
            });
        }
        getLegalcaseManager();
    }, [id]);

    const searchClient = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:8070/client/nic/${nic}`);
            setClient(res.data);
        } catch (err) {
            console.error(err);
            alert('Error in Retrieving Client');
        }
    };

    const addClientToForm = () => {
        if (client) {
            setclientId(client.clientId);
            setclientName(`${client.fname} ${client.lname}`);
            setclientPhone(client.phone);
            alert("Client Details Updated");
        } else {
            alert("No client details available. Please search for a client first.");
        }
    };

    return (
        <div className="apm-form-container">
            <NavBar />
            <hr />
            <h2 className='apm-header'>Appointment Request Creation Form</h2>

            <div className="apm-form">
                <h3>Search Client by NIC</h3>
                <form id="searchForm" onSubmit={searchClient}>
                    <label className="apm-form-label" htmlFor="nic">NIC</label>
                    <input
                        className="apm-form-input"
                        type="text"
                        id="nic"
                        name="nic"
                        placeholder="Enter NIC"
                        value={nic}
                        onChange={(e) => setNic(e.target.value)}
                        required
                    />
                    <button type="submit" className='apm-form-button'>Search</button>
                </form>

                {client && (
                    <div id="clientDetails" className="client-details">
                        <h4>Client Details</h4>
                        <div className="apm-form-group">
                            <label className="apm-form-label" htmlFor="clientId">Client ID</label>
                            <input
                                className="apm-form-input"
                                type="text"
                                id="clientIdShow"
                                name="clientId"
                                value={client.clientId}
                                required
                            />
                        </div>

                        <div className="apm-form-group">
                            <label className="apm-form-label" htmlFor="clientName">Client Name</label>
                            <input
                                className="apm-form-input"
                                type="text"
                                id="clientNameShow"
                                name="clientName"
                                value={`${client.fname} ${client.lname}`}
                                required
                            />
                        </div>

                        <div className="apm-form-group">
                            <label className="apm-form-label" htmlFor="clientPhone">Client Phone</label>
                            <input
                                className="apm-form-input"
                                type="text"
                                id="clientPhoneShow"
                                name="clientPhone"
                                value={client.phone}
                                required
                            />
                        </div>
                        <button type="submit" className='apm-form-button' onClick={addClientToForm}>Add Client</button>
                    </div>
                )}
            </div>

            <hr className="form-divider" />

            <form className="apm-form" onSubmit={sendData}>
                <div className="apm-form-group">
                    <label className="apm-form-label" htmlFor="appointmentRequestName">Request Name</label>
                    <input
                        className="apm-form-input"
                        type="text"
                        id="appointmentRequestName"
                        name="appointmentRequestName"
                        value={appointmentRequestName}
                        onChange={(e) => setappointmentRequestName(e.target.value)}
                        required
                    />
                </div>

                <div className="apm-form-group">
                    <label className="apm-form-label" htmlFor="appointmentRequestDate">Request Date</label>
                    <input
                        className="apm-form-input"
                        type="date"
                        id="appointmentRequestDate"
                        name="appointmentRequestDate"
                        value={appointmentRequestDate}
                        onChange={(e) => setappointmentRequestDate(e.target.value)}
                        required
                    />
                    {errors.appointmentRequestDate && <span className="error">{errors.appointmentRequestDate}</span>}
                </div>

                <div className="apm-form-group" hidden="true">
                    <label className="apm-form-label" htmlFor="appointmentRequestStatus">Request Status</label>
                    <input
                        className="apm-form-input"
                        type="text"
                        id="appointmentRequestStatus"
                        name="appointmentRequestStatus"
                        value="Pending"
                        onChange={(e) => setappointmentRequestStatus(e.target.value)}
                    />
                </div>

                <div className="apm-form-group">
                    <label className="apm-form-label" htmlFor="lawyerId">Lawyer ID</label>
                    <input
                        className="apm-form-input"
                        style={{ backgroundColor: '#EEEEEE' }}
                        type="text"
                        id="lawyerId"
                        name="lawyerId"
                        value={legalcaseManager.userId}
                        onChange={(e) => setlawyerId(e.target.value)}
                        readOnly
                    />
                </div>
                <div className="apm-form-group">
                    <label className="apm-form-label" htmlFor="lawyerName">Lawyer Name</label>
                    <input
                        className="apm-form-input"
                        style={{ backgroundColor: '#EEEEEE' }}
                        type="text"
                        id="lawyerName"
                        name="lawyerName"
                        value={`${legalcaseManager.fName} ${legalcaseManager.lName}`}
                        readOnly
                    />
                </div>
                <div className="apm-form-group">
                    <label className="apm-form-label" htmlFor="appointmentType">Appointment Type</label>
                    <input
                        className="apm-form-input"
                        type="text"
                        id="appointmentType"
                        name="appointmentType"
                        value={appointmentType}
                        onChange={(e) => setappointmentType(e.target.value)}
                        required
                    />
                </div>
                <div className="apm-form-group">
                    <label className="apm-form-label" htmlFor="appointmentDate">Appointment Date</label>
                    <input
                        className="apm-form-input"
                        type="date"
                        id="appointmentDate"
                        name="appointmentDate"
                        value={appointmentDate}
                        onChange={(e) => setappointmentDate(e.target.value)}
                        required
                    />
                    {errors.appointmentDate && <span className="error">{errors.appointmentDate}</span>}
                </div>
                <div className="apm-form-group">
                    <label className="apm-form-label" htmlFor="appointmentTime">Appointment Time</label>
                    <input
                        className="apm-form-input"
                        type="time"
                        id="appointmentTime"
                        name="appointmentTime"
                        value={appointmentTime}
                        onChange={(e) => setappointmentTime(e.target.value)}
                        required
                    />
                </div>
                <div className="apm-form-group">
                    <label className="apm-form-label" htmlFor="appointmentLocation">Appointment Location</label>
                    <input
                        className="apm-form-input"
                        type="text"
                        id="appointmentLocation"
                        name="appointmentLocation"
                        value={appointmentLocation}
                        onChange={(e) => setappointmentLocation(e.target.value)}
                        required
                    />
                </div>
  
                <div className="apm-form-group">
                    <label className="apm-form-label" htmlFor="clientPhone">Client Phone</label>
                    <input
                        className="apm-form-input"
                        type="text"
                        id="clientPhone"
                        name="clientPhone"
                        value={clientPhone}
                        onChange={(e) => setclientPhone(e.target.value)}
                        required
                    />
                    {errors.clientPhone && <span className="error">{errors.clientPhone}</span>}
                </div>

                <button type="submit" className="apm-form-button">Submit</button>
            </form>
            <Footer />
        </div>
    );
}

export default Apm_Create_AppointmentRequest;
