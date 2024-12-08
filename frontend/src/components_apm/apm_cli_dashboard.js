//import NavBar from "./apm_page_navbar";
//import Footer from "./apm_page_footer";
import './appointment_management.css';

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {

    const { id } = useParams();
    const [appointment, setAppointments] = useState([]);
    const [appointmentManagerDetails, setAppointmentManagerDetails] = useState({});
    const [lawyerDetails, setLawyerDetails] = useState({});

    // Get appointment details
    useEffect(() => {
        function getAppointment() {
            axios.get(`http://localhost:8070/appointment/pending/client/${id}`).then((res) => {
                console.log(res.data);
                setAppointments(res.data);

                res.data.forEach(appointment => {
                    const appointmentManagerId = appointment.appointmentManagerId;
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

                res.data.forEach(appointment => {
                    const lawyerId = appointment.lawyerId;
                    if (!lawyerDetails[lawyerId]) {
                        axios.get(`http://localhost:8070/legalcasemanager/${lawyerId}`)
                            .then(response => {
                                setLawyerDetails(prevDetails => ({ 
                                    ...prevDetails, 
                                    [lawyerId]: response.data
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
        getAppointment();
    }, [appointmentManagerDetails, lawyerDetails, id]);


    return (
        <div>
            <hr />

            <div className="apm-container">
                <h1 className="apm-header">Client Appointment Management Dashboard</h1>

                        
                <h2>My Upcoming Appointments..</h2>
                <table border='1' className="apm-summary-table">
                    <thead>
                        <tr className="apm-summary-table-row">
                            <th className="apm-summary-table-header">Appointment Date</th>
                            <th className="apm-summary-table-header">Appointment Name</th>
                            <th className="apm-summary-table-header">Appointment Manager Name</th>
                            <th className="apm-summary-table-header">Appointment Manager Mobile</th>
                            <th className="apm-summary-table-header">Lawyer Name</th>
                            <th className="apm-summary-table-header">Lawyer Mobile</th>
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
                                            {lawyerDetails[appointment.lawyerId]
                                                ? `${lawyerDetails[appointment.lawyerId].fName} ${lawyerDetails[appointment.lawyerId].lName}`
                                                : 'Loading...'}
                                        </td>
                                        <td className="apm-summary-table-data">
                                            {lawyerDetails[appointment.lawyerId]
                                                ? lawyerDetails[appointment.lawyerId].phoneNumber
                                                : 'Loading...'}
                                        </td>
                                        <td className="apm-summary-table-data">{appointment.appointmentStatus}</td>
                                        <td className="apm-summary-table-action"><a className="apm-summary-table-button" href={`/client-portal/view-appointment/${appointment._id}`}>View Request</a></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <a className="apm-view-button" href={`/client-portal/view-all-appointments/${id}`}>View Previous Appointments</a>

            </div>
           

        </div>
    )
}

export default Dashboard;