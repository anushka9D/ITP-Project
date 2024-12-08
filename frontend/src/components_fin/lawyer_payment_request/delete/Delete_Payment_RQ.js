import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'; 
import './Delete_Payment_RQ.css'; 

function Delete_Payment_RQ() {
    const { id } = useParams(); 
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); 

    // Fetch user details by id
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/paymentRQ/paymentRQ/${id}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [id]); 

    // Handle delete action
    const deleteHandler = async () => {
        try {
            await axios.delete(`http://localhost:8070/paymentRQ/delete_paymentRQ/${id}`);
            
            Swal.fire({
                icon: 'success',
                title: 'Your payment request has been successfully deleted!',
                text: 'You will be redirected to the dashboard.',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                timer: 3000,  
            }).then(() => {
                navigate('/Back_dashboard');  
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to delete payment request!',
                text: 'Something went wrong. Please try again.',
            });
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="FIN-delete-container">
            <h1 className="FIN-delete-heading">Delete Payment Request</h1>
            {user ? (
                <div className="FIN-details-box">
                    
                    <table className="FIN-details-table">
                        <tbody>
                            <tr>
                                <td className="FIN-label">ID:</td>
                                <td>{user._id}</td>
                            </tr>
                            <tr>
                                <td className="FIN-label">Request ID:</td>
                                <td>{user.RequestId}</td>
                            </tr>
                            <tr>
                                <td className="FIN-label">Request Date:</td>
                                <td>{user.RequestDate}</td>
                            </tr>
                            <tr>
                                <td className="FIN-label">Lawyer ID:</td>
                                <td>{user.lawyerId}</td> {/* Changed `LawyerId` to `lawyerId` */}
                            </tr>
                            {/* Added new row for Client ID */}
                            <tr>
                                <td className="FIN-label">Client ID:</td>
                                <td>{user.ClientId}</td>
                            </tr>
                            <tr>
                                <td className="FIN-label">Service ID:</td>
                                <td>{user.ServiceID}</td>
                            </tr>
                            <tr>
                                <td className="FIN-label">Amount (RS.):</td>
                                <td>{user.Amount}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Delete confirmation button */}
                    <Button variant="contained" color="secondary" className="FIN-delete-btn" onClick={deleteHandler}>
                        Confirm Delete
                    </Button>
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
}

export default Delete_Payment_RQ;