import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FIN_lawyer_Dashboard_rq.css'; // Import the CSS file
import axios from 'axios';

const FINLawyerDashboardRQ = () => {
    // Extract lawyerId from URL
    const { lawyerId } = useParams();
    const navigate = useNavigate(); // For navigation

    // State to store payment requests data and loading/error states
    const [paymentRequests, setPaymentRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data when the component is mounted
    useEffect(() => {
        const fetchPaymentRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/paymentRQ/paymentRQByLawyer/${lawyerId}`);
                setPaymentRequests(response.data);
                setLoading(false);
            } catch (err) {
                console.error('There was an error fetching the payment requests:', err);
                setError('Failed to fetch payment requests. Please try again later.');
                setLoading(false);
            }
        };

        fetchPaymentRequests();
    }, [lawyerId]);

    // Handle "Generate Report" button click (placeholder functionality)
    const handleGenerateReport = () => {
        alert('Generate Report functionality is not yet implemented.');
    };

    // Handle "Back to Dashboard" button click
    const handleBackToDashboard = () => {
        navigate('/dashboard'); // Assuming '/dashboard' is the route for your dashboard
    };

    const handleCreateNewRequest = () => {
        navigate('/Fin_nav_Rq_form'); // Navigate to the form for creating a new payment request
    };

    return (
        <div className="Fin_container">
            <h2>Payment Request Details for Lawyer ID: {lawyerId}</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="Fin_error">{error}</p>
            ) : (
                <>
                    <table className="Fin_table">
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Request Date</th>
                                <th>Client ID</th>
                                <th>Service ID</th>
                                <th>Amount</th>
                                <th>Payment Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentRequests.length > 0 ? (
                                paymentRequests.map((request, index) => (
                                    <tr key={index}>
                                        <td>{request.RequestId}</td>
                                        <td>{request.RequestDate}</td>
                                        <td>{request.ClientId}</td>
                                        <td>{request.ServiceID}</td>
                                        <td>{request.Amount}</td>
                                        <td>{request.PaymentMethod}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No Payment Requests Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="Fin_btn-container">
                        <button className="Fin_btn Fin_btn-red" onClick={handleGenerateReport}>Generate Report</button>
                        <button className="Fin_btn Fin_btn-blue" onClick={handleBackToDashboard}>Back to Dashboard</button>
                        <button className="Fin_btn-newrq" onClick={handleCreateNewRequest}>Create New Request</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default FINLawyerDashboardRQ;