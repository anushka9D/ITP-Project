import NavBar from "../components_lcm/Lcm_NavBar";
import Footer from "../components_lcm/Lcm_Footer";
import './appointment_management.css';

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {

    const { id } = useParams();
    const [appointmentrequest, setAppointmentRequests] = useState([]);
    const [appointment, setAppointments] = useState([]);
    const [appointmentManagerDetails, setAppointmentManagerDetails] = useState({});
    const [lawyerDetails, setLawyerDetails] = useState({});
    const [clientDetails, setClientDetails] = useState({});

    //get details related to lawyer
    useEffect(() => {
        function getLegalcaseManager(){
            axios.get(`http://localhost:8070/legalcasemanager/${id}`).then((res) => {
                console.log(res.data);
                setLawyerDetails(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getLegalcaseManager();
    }, [id])


    // Get appointment request details
    useEffect(() => {
        function getAppointmentRequests() {
            axios.get(`http://localhost:8070/appointmentrequest/pending/lawyer/${id}`).then((res) => {
                console.log(res.data);
                setAppointmentRequests(res.data);

                res.data.forEach(appointmentRequest => {
                    const clientId = appointmentRequest.clientId;
                    if (!clientDetails[clientId]) {
                        axios.get(`http://localhost:8070/client/v/${clientId}`)
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
                });
            }).catch((err) => {
                alert(err.message);
            });
        }
        getAppointmentRequests();
    }, [clientDetails, id]);


    // Get appointment details
    useEffect(() => {
        function getAppointmentRequests() {
            axios.get(`http://localhost:8070/appointment/pending/lawyer/${id}`).then((res) => {
                console.log(res.data);
                setAppointments(res.data);

                res.data.forEach(appointmentRequest => {
                    const appointmentManagerId = appointmentRequest.appointmentManagerId;
                    if (!appointmentManagerDetails[appointmentManagerId]) {
                        axios.get(`http://localhost:8070/appointmentmanager/${appointmentManagerId}`)
                            .then(response => {
                                setAppointmentManagerDetails(prevDetails => ({
                                    ...prevDetails,
                                    [appointmentManagerId]: response.data
                                }));
                            })
                            .catch(error => {
                                console.error("Error fetching client details:", error);
                            });
                    }   
                });
            }).catch((err) => {
                alert(err.message);
            });
        }
        getAppointmentRequests();
    }, [appointmentManagerDetails, id]);


    return (
        <div>
            <NavBar />
            <hr />

            <div className="apm-container">
                <h1 className="apm-header">Legal Case Manager</h1>
                <h3 className="apm-header">Appointment Management Dashboard</h3>

                <p className="apm-user-welcome">Welcome {lawyerDetails.fName} {lawyerDetails.lName}</p>
                <p className="apm-user-welcome">User ID : {lawyerDetails.userId}</p>

        
                <h2>My Appointment Requests..</h2>
                <table border='1' className="apm-summary-table">
                    <thead>
                        <tr className="apm-summary-table-row">
                            <th className="apm-summary-table-header">Request Date</th>
                            <th className="apm-summary-table-header">Request Name</th>                            
                            <th className="apm-summary-table-header">Request Type</th>
                            <th className="apm-summary-table-header">Client Name</th>
                            <th className="apm-summary-table-header">Client Mobile</th>
                            <th className="apm-summary-table-header">Request Status</th>
                            <th className="apm-summary-table-header">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointmentrequest.map(appointmentrequest => {
                                return (
                                    <tr className="apm-summary-table-row" key={appointmentrequest._id}>
                                        <td className="apm-summary-table-data">{
                                              new Date(appointmentrequest.appointmentRequestDate).toISOString().split('T')[0]
                                        }
                                        </td>
                                        <td className="apm-summary-table-data">{appointmentrequest.appointmentRequestName}</td> 
                                        <td className="apm-summary-table-data">{appointmentrequest.appointmentType}</td>                                      
                                        <td className="apm-summary-table-data">
                                            {clientDetails[appointmentrequest.clientId]
                                                ? `${clientDetails[appointmentrequest.clientId].fname} ${clientDetails[appointmentrequest.clientId].lname}`
                                                : 'Loading...'}
                                        </td>
                                        <td className="apm-summary-table-data">
                                            {clientDetails[appointmentrequest.clientId]
                                                ? clientDetails[appointmentrequest.clientId].phone
                                                : 'Loading...'}
                                        </td>
                                        <td className="apm-summary-table-data">{appointmentrequest.appointmentRequestStatus}</td>                                          
                                        <td className="apm-summary-table-action"><a className="apm-summary-table-button" href={`/lawyer-dashboard/view-appointment-request/${appointmentrequest._id}`}>View Request</a></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                
                <div className="apm-button-box">
                    <a className="apm-table-link-button" href={`/lawyer-dashboard/create-appointment-request/${id}`}>Create New Requests</a>
                    <a className="apm-table-link-button" href={`/lawyer-dashboard/view-all-appointment-requests/${id}`}>View Previous Requests</a>
                </div> 
                
                <h2>My Upcoming Appointments..</h2>
                <table border='1' className="apm-summary-table">
                    <thead>
                        <tr className="apm-summary-table-row">
                            <th className="apm-summary-table-header">Appointment Date</th>
                            <th className="apm-summary-table-header">Appointment Name</th>
                            <th className="apm-summary-table-header">Appointment Manager Name</th>
                            <th className="apm-summary-table-header">Appointment Manager Mobile</th>
                            <th className="apm-summary-table-header">Client Name</th>
                            <th className="apm-summary-table-header">Client Mobile</th>
                            <th className="apm-summary-table-header">Appointment Status</th>
                            <th className="apm-summary-table-header">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            appointment.map(appointment => {
                                return (
                                    <tr className="apm-summary-table-row" key={appointment._id}>
                                        <td className="apm-summary-table-data">{
                                              new Date(appointment.appointmentCreationDate).toISOString().split('T')[0]
                                        }
                                        </td>
                                        <td className="apm-summary-table-data">{appointment.appointmentTitle}</td>
                                        <td className="apm-summary-table-data">
                                            {appointmentManagerDetails[appointment.appointmentManagerId]
                                                ? `${appointmentManagerDetails[appointment.appointmentManagerId].fName} ${appointmentManagerDetails[appointment.appointmentManagerId].lName}`
                                                : 'Loading...'}
                                        </td>
                                        <td className="apm-summary-table-data">
                                            {appointmentManagerDetails[appointment.appointmentManagerId]
                                                ? appointmentManagerDetails[appointment.appointmentManagerId].phoneNumber
                                                : 'Loading...'}
                                        </td>
                                        <td className="apm-summary-table-data">
                                            {clientDetails[appointment.clientId]
                                                ? `${clientDetails[appointment.clientId].fname} ${clientDetails[appointment.clientId].lname}`
                                                : 'Loading...'}
                                        </td>
                                        <td className="apm-summary-table-data">
                                            {clientDetails[appointment.clientId]
                                                ? clientDetails[appointment.clientId].phone
                                                : 'Loading...'}
                                        </td>
                                        <td className="apm-summary-table-data">{appointment.appointmentStatus}</td>
                                        <td className="apm-summary-table-action"><a className="apm-summary-table-button" href={`/lawyer-dashboard/view-appointment/${appointment._id}`}>View Request</a></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <a className="apm-view-button" href={`/lawyer-dashboard/view-all-appointments/${id}`}>View Previous Appointments</a>

            </div>
            <Footer />

        </div>
    )
}

export default Dashboard;