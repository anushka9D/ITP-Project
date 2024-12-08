import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';


function PaymentProofUpdate() {

    const [inputs, setInputs] = useState({
        RequestId: '',
        PaymentDate: '',
        ClientId: '', // Changed `ClientName` to `ClientId`
        UploadDate: '',
        PhoneNumber: '', // Added PhoneNumber
        PaymentType: '',
        Amount: '', // Added Amount
    });

    const [successMessage, setSuccessMessage] = useState(false); // State to manage success message visibility
    const { id } = useParams(); // Get the id from the route params

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/paymentProof/paymentProof/${id}`);
                setInputs(response.data || {}); // Set the state with fetched data
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        try {
            const response = await axios.put(`http://localhost:8070/paymentProof/update_paymentProof/${id}`, {
                RequestId: String(inputs.RequestId),
                PaymentDate: String(inputs.PaymentDate),
                ClientId: String(inputs.ClientId),
                UploadDate: String(inputs.UploadDate),
                PhoneNumber: String(inputs.PhoneNumber),
                PaymentType: String(inputs.PaymentType),
                Amount: String(inputs.Amount),
            });
            setSuccessMessage(true); // Show success message
            setTimeout(() => {
                setSuccessMessage(false); // Hide message after 3 seconds
            }, 3000);
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
            <h1 className="FIN-update-heading">Update Payment Proof</h1>

            {successMessage && <div className="FIN-success-message">Successfully updated!</div>} {/* Success message */}

            <div className="FIN-form-container">
                <form onSubmit={handleSubmit}> {/* Use the correct function in the onSubmit */}
                    
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
                        <label htmlFor="payment-date">Payment Date</label>
                        <input
                            type="date"
                            id="payment-date"
                            onChange={handleChange}
                            name="PaymentDate"
                            value={inputs.PaymentDate || ''}
                        />
                        <span className="FIN-calendar-icon">&#128197;</span>
                    </div>

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
                        <label htmlFor="upload-date">Upload Date</label>
                        <input
                            type="date"
                            id="upload-date"
                            onChange={handleChange}
                            name="UploadDate"
                            value={inputs.UploadDate || ''}
                        />
                    </div>

                    <div className="FIN-form-group">
                        <label htmlFor="phone-number">Phone Number</label>
                        <input
                            type="text"
                            id="phone-number"
                            onChange={handleChange}
                            name="PhoneNumber"
                            value={inputs.PhoneNumber || ''}
                        />
                    </div>

                    <div className="FIN-form-group">
                        <label htmlFor="payment-type">Payment Type</label>
                        <input
                            type="text"
                            id="payment-type"
                            onChange={handleChange}
                            name="PaymentType"
                            value={inputs.PaymentType || ''}
                        />
                    </div>

                    <div className="FIN-form-group">
                        <label htmlFor="amount">Amount</label>
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

export default PaymentProofUpdate;