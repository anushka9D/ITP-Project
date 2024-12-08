import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import './PaymentProofDisplay.css'; // Import the external CSS file
import Nav from "../Fin_payment_proof_nav_bar"; // Import the navigation bar component

function PaymentProofDisplay() {
    const [proofs, setProofs] = useState([]);

    // Fetch data from the backend
    const fetchHandler = async () => {
        const url = 'http://localhost:8070/paymentProof/paymentProofs';  // Fetch all payment proofs
        const response = await axios.get(url);
        return response.data;
    };

    useEffect(() => {
        // Fetch proof data when the component mounts
        fetchHandler().then((data) => setProofs(data));
    }, []); // Re-fetch on mount or route change

    return (
        <div className="FIN-payment-proof-display-container">
            <Nav /> {/* Navigation Bar */}
            <h1>Payment Proofs Page</h1>

            {/* Create a table to display payment proof details */}
            <table className="FIN-proof-table">
                <thead>
                    <tr>
                        <th>Request ID</th> {/* Request ID column */}
                        <th>Lawyer ID</th> {/* Lawyer ID column */}
                        <th>Client ID</th> {/* Client ID column */}
                        <th>Payment Date</th>
                        <th>Upload Date</th>
                        <th>Phone Number</th> {/* Added Phone Number column */}
                        <th>Payment Type</th>
                        <th>Amount</th> {/* Added Amount column */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {proofs.length > 0 ? (
                        proofs.map((proof, i) => (
                            <tr key={i}>
                                <td>{proof.RequestId}</td> {/* Request ID */}
                                <td>{proof.lawyerId}</td> {/* Lawyer ID */}
                                <td>{proof.ClientId}</td> {/* Client ID */}
                                <td>{proof.PaymentDate}</td>
                                <td>{proof.UploadDate}</td>
                                <td>{proof.PhoneNumber}</td> {/* Phone Number */}
                                <td>{proof.PaymentType}</td> {/* Payment Type */}
                                <td>{proof.Amount}</td> {/* Amount */}

                                <td>
                                    <Link to={`/payment_proof_update/${proof._id}`}>
                                        <Button variant="contained" color="primary">Update</Button>
                                    </Link>
                                </td>

                                <td>
                                    <Link to={`/delete_payment_proof/${proof._id}`}>
                                        <Button variant="contained" color="secondary">Delete</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No payment proofs found</td> {/* Updated colspan to match new column count */}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default PaymentProofDisplay;