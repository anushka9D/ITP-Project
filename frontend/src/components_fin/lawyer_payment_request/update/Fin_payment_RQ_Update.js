import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Swal from 'sweetalert2'; // Import SweetAlert2
import './Fin_payment_RQ_Update.css'; // Import the CSS file

function Fin_payment_RQ_Update() {
    const [inputs, setInputs] = useState({
        RequestId: '',
        RequestDate: '',
        lawyerId: '', // Changed `LawyerId` to `lawyerId`
        ClientId: '', // Added `ClientId` field
        ServiceID: '',
        Amount: ''
    });

    const { id } = useParams(); // Get the ID from the route params
    const navigate = useNavigate(); // Initialize navigation

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/paymentRQ/paymentRQ/${id}`);
                setInputs(response.data || {}); // Set the state with fetched data
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        try {
            const response = await axios.put(`http://localhost:8070/paymentRQ/update_paymentRQ/${id}`, {
                RequestId: String(inputs.RequestId),
                RequestDate: String(inputs.RequestDate),
                lawyerId: String(inputs.lawyerId), // Changed `LawyerId` to `lawyerId`
                ClientId: String(inputs.ClientId), // Added `ClientId` to the request
                ServiceID: String(inputs.ServiceID),
                Amount: Number(inputs.Amount)
            });

            // Show success pop-up using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Your payment request has been successfully updated!',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                timer: 3000, // Auto-close after 3 seconds
            }).then(() => {
                // After the pop-up closes, navigate to the dashboard
                navigate('/Back_dashboard');
            });

        } catch (error) {
            console.error("Error updating data", error);
        }
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        sendRequest(); // Call the async function to update the data
    };

    if (!inputs || Object.keys(inputs).length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="FIN-update-container">
            <h1 className="FIN-update-heading">Update Payment Request</h1>

            <div className="FIN-form-container">
                <form onSubmit={handleSubmit}>
                    <div className="FIN-form-group">
                        <label htmlFor="request-id">Request ID</label>
                        <input
                            type="text"
                            id="request-id"
                            onChange={handleChange}
                            name="RequestId"
                            value={inputs.RequestId || ''}
                        />
                    </div>

                    <div className="FIN-form-group">
                        <label htmlFor="request-date">Request Date</label>
                        <input
                            type="text"
                            id="request-date"
                            onChange={handleChange}
                            name="RequestDate"
                            value={inputs.RequestDate || ''}
                        />
                        <span className="FIN-calendar-icon">&#128197;</span>
                    </div>

                    <div className="FIN-form-group">
                        <label htmlFor="lawyer-id">Lawyer ID</label>
                        <input
                            type="text"
                            id="lawyer-id"
                            onChange={handleChange}
                            name="lawyerId" // Changed `LawyerId` to `lawyerId`
                            value={inputs.lawyerId || ''}
                        />
                    </div>

                    {/* Added new form group for ClientId */}
                    <div className="FIN-form-group">
                        <label htmlFor="client-id">Client ID</label>
                        <input
                            type="text"
                            id="client-id"
                            onChange={handleChange}
                            name="ClientId"
                            value={inputs.ClientId || ''}
                        />
                    </div>

                    <div className="FIN-form-group">
                        <label htmlFor="service-id">Service ID</label>
                        <input
                            type="text"
                            id="service-id"
                            onChange={handleChange}
                            name="ServiceID"
                            value={inputs.ServiceID || ''}
                        />
                    </div>

                    <div className="FIN-form-group">
                        <label htmlFor="amount">Amount (Rs.)</label>
                        <input
                            type="text"
                            id="amount"
                            onChange={handleChange}
                            name="Amount"
                            value={inputs.Amount || ''}
                        />
                    </div>

                    <button type="submit" className="FIN-submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Fin_payment_RQ_Update;