import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FIN_client_display_proofs.css';
import axios from 'axios';

const FINClientDisplay = () => {
    // Extract clientId from URL
    const { clientId } = useParams();
    const navigate = useNavigate(); // For navigation

    // States to store data and loading/error states
    const [paymentProofs, setPaymentProofs] = useState([]);
    const [paymentRequests, setPaymentRequests] = useState([]);
    const [loadingProofs, setLoadingProofs] = useState(true);
    const [loadingRequests, setLoadingRequests] = useState(true);
    const [errorProofs, setErrorProofs] = useState(null);
    const [errorRequests, setErrorRequests] = useState(null);

    // Fetch payment proofs when the component is mounted
    useEffect(() => {
        const fetchPaymentProofs = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/paymentProof/paymentProofsByClient/${clientId}`);
                setPaymentProofs(response.data);
                setLoadingProofs(false);
            } catch (err) {
                console.error('There was an error fetching the payment proofs:', err);
                setErrorProofs('Failed to fetch payment proofs. Please try again later.');
                setLoadingProofs(false);
            }
        };

        fetchPaymentProofs();
    }, [clientId]);

    // Fetch payment requests when the component is mounted
    useEffect(() => {
        const fetchPaymentRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/paymentRQ/paymentRQByClient/${clientId}`);
                setPaymentRequests(response.data);
                setLoadingRequests(false);
            } catch (err) {
                console.error('There was an error fetching the payment requests:', err);
                setErrorRequests('Failed to fetch payment requests. Please try again later.');
                setLoadingRequests(false);
            }
        };

        fetchPaymentRequests();
    }, [clientId]);

    // Function to navigate to the payment proof update page for a specific proof
    const handleUpdateProof = (proofId) => {
        navigate(`/payment_proof_update/${proofId}`); // Navigate to the payment proof update page
    };

    // Function to navigate to the payment request details page for a specific request
    const handleViewRequestDetails = (request) => {
        navigate(`/payment_request_details_client/${request._id}`, {
            state: {
                requestId: request.RequestId,
                lawyerId: request.lawyerId,
                clientId: request.ClientId,
                amount: request.Amount,
            },
        });
    };

    // Handle "Back to Dashboard" button click
    const handleBackToDashboard = () => {
        navigate('/dashboard'); // Navigate to the dashboard
    };

    return (
        <div className="fin-container">
            {/* Payment Proofs Table */}
            <h2>Payment Proof Details for Client ID: {clientId}</h2>
            {loadingProofs ? (
                <p>Loading payment proofs...</p>
            ) : errorProofs ? (
                <p className="fin-error">{errorProofs}</p>
            ) : (
                <>
                    <table className="fin-table">
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Lawyer ID</th>
                                <th>Client ID</th>
                                <th>Payment Date</th>
                                <th>Upload Date</th>
                                <th>Phone Number</th>
                                <th>Payment Type</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentProofs.length > 0 ? (
                                paymentProofs.map((proof, index) => (
                                    <tr key={index}>
                                        <td>{proof.RequestId}</td>
                                        <td>{proof.lawyerId}</td>
                                        <td>{proof.ClientId}</td>
                                        <td>{proof.PaymentDate}</td>
                                        <td>{proof.UploadDate}</td>
                                        <td>{proof.PhoneNumber}</td>
                                        <td>{proof.PaymentType}</td>
                                        <td>{proof.Amount}</td>
                                        <td>
                                            {/* Update Button */}
                                            <button
                                                className="fin-btn-update"
                                                onClick={() => handleUpdateProof(proof._id)} // Navigate to update page
                                            >
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9">No Payment Proofs Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}

            {/* Payment Requests Table */}
            <h2 style={{ color: 'red', marginTop: '40px' }}>Payment Request Details for Client ID: {clientId}</h2>
            {loadingRequests ? (
                <p>Loading payment requests...</p>
            ) : errorRequests ? (
                <p className="fin-error">{errorRequests}</p>
            ) : (
                <>
                    <table className="fin-table">
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Lawyer ID</th>
                                <th>Client ID</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentRequests.length > 0 ? (
                                paymentRequests.map((request, index) => (
                                    <tr key={index}>
                                        <td>{request.RequestId}</td>
                                        <td>{request.lawyerId}</td>
                                        <td>{request.ClientId}</td>
                                        <td>{request.Amount}</td>
                                        <td>
                                            {/* View Button */}
                                            <button
                                                className="fin-btn-view"
                                                onClick={() => handleViewRequestDetails(request)} // Pass the entire request object
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No Payment Requests Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}

            <div className="fin-btn-container" style={{ marginTop: '20px' }}>
                <button className="fin-btn fin-btn-blue" onClick={handleBackToDashboard}>
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default FINClientDisplay;