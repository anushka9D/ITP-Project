import NavBar from "./apm_page_navbar";
import Footer from "./apm_page_footer";
import './appointment_management.css';
import jsPDF from "jspdf";
import "jspdf-autotable"; 

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import AppointmentBarChart from './apm_bar_chart';

//for charts
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {

    

    const { id } = useParams();
    const [appointmentrequest, setAppointmentRequests] = useState([]);
    const [appointment, setAppointments] = useState([]);
    const [appointmentManager, setAppointmentManager] = useState({});
    const [lawyerDetails, setLawyerDetails] = useState({});
    const [clientDetails, setClientDetails] = useState({});

    const [pendingAppointmentRequest, setPendingAppointmentRequest] = useState(0);
    const [createdAppointmentRequest, setCreatedAppointmentRequest] = useState(0); 



    // Get appointment request details
    useEffect(() => {
        function getAppointmentRequests() {
            axios.get("http://localhost:8070/appointmentrequest/pending/all").then((res) => {
                console.log(res.data);
                setAppointmentRequests(res.data); 
 
                res.data.forEach(appointmentRequest => {
                    const userId = appointmentRequest.lawyerId;
                    if (!lawyerDetails[userId]) {
                        axios.get(`http://localhost:8070/legalcasemanager/${userId}`)
                            .then(response => {
                                setLawyerDetails(prevDetails => ({
                                    ...prevDetails,
                                    [userId]: response.data
                                }));
                            })
                            .catch(error => {
                                console.error("Error fetching lawyer details:", error);
                            });
                    }

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
    }, [lawyerDetails, clientDetails]);


    // get all pending appointments (for specific appointment manager)
    useEffect(() => {
        function getAppointments(){
            axios.get(`http://localhost:8070/appointment/pending/appointment-manager/${id}`).then((res) => {
                console.log(res.data);
                setAppointments(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getAppointments();
    }, [id])

    //get details related to appointment manager
    useEffect(() => {
        function getAppointmentManager(){
            axios.get(`http://localhost:8070/appointmentmanager/${id}`).then((res) => {
                console.log(res.data);
                setAppointmentManager(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getAppointmentManager();
    }, [id])


    //pie chart
    //getting count data

    // Fetch pending appointment request count for the pie chart
    useEffect(() => {
        function getPendingAppointmentRequestCount() {
            axios.get("http://localhost:8070/appointmentrequest/pending/count")
                .then((res) => {
                    console.log("Pending count: ", res.data.count);
                    setPendingAppointmentRequest(res.data.count);  // Set the count
                })
                .catch((err) => {
                    console.error("Error fetching pending appointment request count:", err);
                });
        }

        getPendingAppointmentRequestCount();
    }, []);

    useEffect(() => {
        function getCreatedAppointmentRequestCount() {
            axios.get("http://localhost:8070/appointmentrequest/created/count")
                .then((res) => {
                    setCreatedAppointmentRequest(res.data.count);  
                })
                .catch((err) => {
                    console.error("Error fetching pending appointment request count:", err);
                });
        }

        getCreatedAppointmentRequestCount();
    }, []);


    // Prepare data for pie chart
    const pieData = { 
        labels: ['Pending', 'Created'],
        datasets: [{
            label: '# of Appointment Requests',
            data: [pendingAppointmentRequest, createdAppointmentRequest],
            backgroundColor: ['#F8F4E1', '#AF8F6F'],
            borderColor: ['#543310', '#543310'],
            borderWidth: 1,
        }],
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    }
                }
            }
        }
    };

    // Updated generatePDF function for grid view report
    const generatePDF = () => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        pdf.text("Appointment Report", 10, 10);

        const columns = ["Request Date", "Request Name", "Lawyer Name", "Client Name"];
        const rows = [];

        const search = appointment.filter(request => request.appointmentTitle == "Appointmnet Title 1113ZZZ33");

        search.forEach(request => {
            rows.push([
                Date(request.appointmentRequestDate).toString().split('T')[0],
                request.appointmentTitle,
                lawyerDetails[request.lawyerId]
                    ? `${lawyerDetails[request.lawyerId].fName} ${lawyerDetails[request.lawyerId].lName}`
                    : 'N/A',
                clientDetails[request.clientId]
                    ? `${clientDetails[request.clientId].fname} ${clientDetails[request.clientId].lname}`
                    : 'N/A'
            ]);
        });


        pdf.autoTable({
            head: [columns],
            body: rows,
            startY: 20,
            styles: { fontSize: 8, cellPadding: 2 }
        });

        pdf.save("appointment_requests_report.pdf");
    };



    return (
        <div>
            <NavBar />
            <hr />

            <div className="apm-container">
                <h1 className="apm-header">Appointment Manager Dashboard</h1>

                <p className="apm-user-welcome">Welcome {appointmentManager.fName} {appointmentManager.lName}</p>
                <p className="apm-user-welcome">User ID : {appointmentManager.userId}</p>

                <h2>Received Appointment Requests</h2>

                {/* Pie Chart */}
                <div className="apm-chart-container">
                    <Pie data={pieData} options={pieOptions} />
                </div>

                {/* Bar Chart */}
                <AppointmentBarChart />  

                <table border='1' className="apm-summary-table">
                    <thead>
                        <tr className="apm-summary-table-row">
                            <th className="apm-summary-table-header">Request Date</th>
                            <th className="apm-summary-table-header">Request Name</th>                            
                            <th className="apm-summary-table-header">Request Type</th>
                            <th className="apm-summary-table-header">Lawyer Name</th>
                            <th className="apm-summary-table-header">Lawyer Mobile</th>
                            <th className="apm-summary-table-header">Client Name</th>
                            <th className="apm-summary-table-header">Client Mobile</th>
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
                                            {lawyerDetails[appointmentrequest.lawyerId]
                                                ? `${lawyerDetails[appointmentrequest.lawyerId].fName} ${lawyerDetails[appointmentrequest.lawyerId].lName}`
                                                : 'Loading...'}
                                        </td>
                                        <td className="apm-summary-table-data">
                                            {lawyerDetails[appointmentrequest.lawyerId]
                                                ? lawyerDetails[appointmentrequest.lawyerId].phoneNumber
                                                : 'Loading...'}
                                        </td>
                                        <td className="apm-summary-table-data">
                                            {clientDetails[appointmentrequest.clientId]
                                                ? `${clientDetails[appointmentrequest.clientId].fname} ${clientDetails[appointmentrequest.clientId].lname}`
                                                : 'Loading...'} 
                                        </td>
                                        <td className="apm-summary-table-data">{appointmentrequest.appointmentType}</td>
                                        <td className="apm-summary-table-action">
                                            <a className="apm-summary-table-button" href={`/appointment-manager-dashboard/view-appointment-request/${appointmentrequest._id}/${id}`}>View Request</a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <a className="apm-view-button" href="/appointment-manager-dashboard/view-all-appointment-requests/">View Previous Appointment Requests</a>

                <h2>Upcoming Appointments</h2>    

                <table border='1' className="apm-summary-table">
                    <thead>
                        <tr className="apm-summary-table-row">
                            <th className="apm-summary-table-header">Appointment Date</th>
                            <th className="apm-summary-table-header">Appointment Name</th>
                            <th className="apm-summary-table-header">Lawyer Name</th>
                            <th className="apm-summary-table-header">Lawyer Mobile</th>
                            <th className="apm-summary-table-header">Client Name</th>
                            <th className="apm-summary-table-header">Client Mobile</th>
                            <th className="apm-summary-table-header">Type</th>
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
                                            {lawyerDetails[appointment.lawyerId]
                                                ? `${lawyerDetails[appointment.lawyerId].fName} ${lawyerDetails[appointment.lawyerId].lName}`
                                                : 'Loading...'}
                                        </td>
                                        <td className="apm-summary-table-data">
                                            {lawyerDetails[appointment.lawyerId]
                                                ? lawyerDetails[appointment.lawyerId].phoneNumber
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
                                        <td className="apm-summary-table-action"><a className="apm-summary-table-button" href={`/appointment-manager-dashboard/view-appointment/${appointment._id}`}>View Request</a></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <a className="apm-view-button" href={`/appointment-manager-dashboard/view-all-appointments/${id}`}>View Previous Appointments</a>

            </div>
            <button className="apm-view-button"  onClick={generatePDF}>
    Generate Report
</button>

            <Footer />
        </div>
    )

    



}

export default Dashboard;