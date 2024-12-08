import NavBar from "../components_lcm/Lcm_NavBar";
import Footer from "../components_lcm/Lcm_Footer";
import './appointment_management.css';

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {

    const { id } = useParams();
    const [appointment, setAppointments] = useState([]);
    const [clientDetails, setClientDetails] = useState({});
    const [appointmentManagerDetails, setAppointmentManagerDetails] = useState({});

    useEffect(() => {
        function getAppointmentRequests() {
            axios.get(`http://localhost:8070/appointment/lawyer/${id}`).then((res) => {
                console.log(res.data);
                setAppointments(res.data);

                res.data.forEach(appointmentRequest => {
                    const clientId = appointmentRequest.clientId;
                    if (!clientDetails[clientId]) {
                        axios.get(`http://localhost:8070/client/view-client/${clientId}`)
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
    }, [appointmentManagerDetails, clientDetails, id]);

    return (
        <div>
            <NavBar/>
            <hr />

            <div className="apm-container">
                <h2 className="apm-header">Legal Case Manager</h2>
                <h1 className="apm-header">All Appointments</h1>
        
                <h2>My Appointments..</h2>
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
            </div>
            <Footer/>

        </div>
    )
}

export default Dashboard;