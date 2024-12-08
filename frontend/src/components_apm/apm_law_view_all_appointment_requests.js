import NavBar from "../components_lcm/Lcm_NavBar";
import Footer from "../components_lcm/Lcm_Footer";
import './appointment_management.css';

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {

    const { id } = useParams();
    const [appointmentrequest, setAppointmentRequests] = useState([]);
    const [clientDetails, setClientDetails] = useState({});

    // Get appointment request details
    useEffect(() => {
        function getAppointmentRequests() {
            axios.get(`http://localhost:8070/appointmentrequest/lawyer/${id}`).then((res) => {
                console.log(res.data);
                setAppointmentRequests(res.data);

                res.data.forEach(appointmentRequest => {
                    const clientId = appointmentRequest.clientId;
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
                });
            }).catch((err) => {
                alert(err.message);
            });
        }
        getAppointmentRequests();
    }, [clientDetails, id]);

    return (
        <div>
            <NavBar/>
            <hr />

            <div className="apm-container">
                <h2 className="apm-header">Legal Case Manager</h2>
                <h1 className="apm-header">All Appointment Requests</h1>
        
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
            </div>
            <Footer/>

        </div>
    )
}

export default Dashboard;