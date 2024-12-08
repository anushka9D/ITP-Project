import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';

function Atm_Lawyer_Delete() {
    const { id } = useParams(); // Get the lawyer ID from the URL
    const [lawyer, setLawyer] = useState(null);
    const navigate = useNavigate(); // Navigate to different routes

    // Fetch lawyer details based on ID
    const fetchLawyerDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/userRegistration/userRegistrations/${id}`);
            setLawyer(response.data);
        } catch (error) {
            console.error('Error fetching lawyer details:', error);
        }
    };

    useEffect(() => {
        fetchLawyerDetails();
    }, [id]);

    // Handle delete action
    const deleteHandler = async () => {
        try {
            await axios.delete(`http://localhost:8070/userRegistration/delete-userRegistration/${id}`);
            // After successful deletion, redirect to the main lawyer list page
            navigate('/'); 
        } catch (error) {
            console.error('Error deleting lawyer:', error);
        }
    };

    return (
        <div>
            <h1>Delete Lawyer</h1>
            {lawyer ? (
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>ID:</td>
                                <td>{lawyer._id}</td>
                            </tr>
                            <tr>
                                <td>Full Name:</td>
                                <td>{lawyer.fullName}</td>
                            </tr>
                            <tr>
                                <td>NIC:</td>
                                <td>{lawyer.nic}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{lawyer.email}</td>
                            </tr>
                            <tr>
                                <td>Phone Number:</td>
                                <td>{lawyer.phoneNumber}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Confirm Delete button */}
                    <Button variant="contained" color="secondary" onClick={deleteHandler}>
                        Confirm Delete
                    </Button>
                </div>
            ) : (
                <p>Loading lawyer details...</p>
            )}
        </div>
    );
}

export default Atm_Lawyer_Delete;
