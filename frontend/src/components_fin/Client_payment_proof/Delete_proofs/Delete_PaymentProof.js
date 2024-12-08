import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // For URL params and navigation
import axios from 'axios';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'; // Import SweetAlert2 for pop-up
import './Delete_PaymentProof.css'; // Import external CSS

function Delete_PaymentProof() {
    const { id } = useParams(); // Get the payment proof ID from the URL
    const [proof, setProof] = useState(null); // State to store payment proof details
    const navigate = useNavigate(); // Use useNavigate for navigation

    // Fetch the payment proof details from the backend using the ID
    const fetchProofDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/paymentProof/paymentProof/${id}`);
            setProof(response.data);
        } catch (error) {
            console.error('Error fetching payment proof details:', error);
        }
    };

    useEffect(() => {
        fetchProofDetails();
    }, [id]); // Fetch payment proof details when the component mounts or when the ID changes

    // Handle delete action
    const deleteHandler = async () => {
        try {
            await axios.delete(`http://localhost:8070/paymentProof/delete_paymentProof/${id}`);
            
            // Show success pop-up using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Your payment proof has been successfully deleted!',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                timer: 3000,  // Auto close after 3 seconds
            }).then(() => {
                // After the pop-up closes, navigate to the dashboard
                navigate('/Back_dashboard');
            });
        } catch (error) {
            console.error('Error deleting payment proof:', error);
        }
    };

    return (
        <div className="FIN-delete-proof-container">
            <h1>Delete Payment Proof</h1>
            {proof ? (
                <div>
                    {/* Display payment proof details in a horizontal table */}
                    <table>
                        <tbody>
                            <tr>
                                <td>ID:</td>
                                <td>{proof._id}</td>
                            </tr>
                            <tr>
                                <td>Request ID:</td>
                                <td>{proof.RequestId}</td>
                            </tr>
                            <tr>
                                <td>Lawyer ID:</td>
                                <td>{proof.lawyerId}</td>
                            </tr>
                            <tr>
                                <td>Client ID:</td>
                                <td>{proof.ClientId}</td>
                            </tr>
                            <tr>
                                <td>Payment Date:</td>
                                <td>{proof.PaymentDate}</td>
                            </tr>
                            <tr>
                                <td>Upload Date:</td>
                                <td>{proof.UploadDate}</td>
                            </tr>
                            <tr>
                                <td>Phone Number:</td>
                                <td>{proof.PhoneNumber}</td>
                            </tr>
                            <tr>
                                <td>Payment Type:</td>
                                <td>{proof.PaymentType}</td>
                            </tr>
                            {/* Added Amount field */}
                            <tr>
                                <td>Amount:</td>
                                <td>{proof.Amount}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Delete confirmation button */}
                    <Button variant="contained" color="secondary" onClick={deleteHandler}>
                        Confirm Delete
                    </Button>
                </div>
            ) : (
                <p>Loading payment proof details...</p>
            )}
        </div>
    );
}

export default Delete_PaymentProof;