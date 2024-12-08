import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // For alerts

const PaymentRequestDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    // Destructure the state to get the passed details
    const { requestId, lawyerId, clientId, amount } = state || {};

    // Form state for inserting new payment proof
    const [inputs, setInputs] = useState({
        RequestId: requestId || "",
        lawyerId: lawyerId || "",
        ClientId: clientId || "",
        PaymentDate: "",   // Not auto-assigned
        UploadDate: "",    // Not auto-assigned
        PhoneNumber: "",
        Amount: amount || "", // Pre-filled with passed amount
        PaymentType: "Installment", // Default to "Installment"
    });

    // Handle input changes for the form
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // Form validation
    const validateForm = () => {
        if (inputs.PhoneNumber.length !== 10 || isNaN(inputs.PhoneNumber)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Phone Number',
                text: 'Phone number must be 10 digits.',
            });
            return false;
        }
        if (isNaN(inputs.Amount) || inputs.Amount <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Amount',
                text: 'Please enter a valid positive amount.',
            });
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.post("http://localhost:8070/paymentProof/add_paymentProof", {
                    RequestId: inputs.RequestId,
                    lawyerId: inputs.lawyerId,
                    ClientId: inputs.ClientId,
                    PaymentDate: inputs.PaymentDate,
                    UploadDate: inputs.UploadDate,
                    PhoneNumber: inputs.PhoneNumber,
                    PaymentType: inputs.PaymentType,
                    Amount: inputs.Amount,
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Payment Proof Submitted',
                    text: 'Your payment proof has been successfully submitted!',
                    confirmButtonText: 'OK',
                });
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Submission Failed',
                    text: 'Something went wrong. Please try again later.',
                });
            }
        }
    };

    return (
        <div style={{ 
            maxWidth: '900px', 
            margin: 'auto', 
            padding: '20px', 
            backgroundColor: '#f9f9f9', 
            borderRadius: '10px', 
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)', 
            fontFamily: 'Arial, sans-serif'
        }}>
            {/* Payment Request Details */}
            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Payment Proof Details</h1>
            <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                        <tr>
                            <td style={{ padding: '10px', fontWeight: 'bold', color: '#555' }}>Request ID:</td>
                            <td style={{ padding: '10px', color: '#333' }}>{requestId}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px', fontWeight: 'bold', color: '#555' }}>Lawyer ID:</td>
                            <td style={{ padding: '10px', color: '#333' }}>{lawyerId}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px', fontWeight: 'bold', color: '#555' }}>Client ID:</td>
                            <td style={{ padding: '10px', color: '#333' }}>{clientId}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px', fontWeight: 'bold', color: '#e74c3c' }}>Amount:</td>
                            <td style={{ padding: '10px', fontSize: '1.5em', fontWeight: 'bold', color: '#e74c3c' }}>{amount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* New Payment Proof Form */}
            <div style={{ marginTop: '30px' }}>
                <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Insert New Payment Proof</h2>
                <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="request-id" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Request ID</label>
                            <input 
                                type="text" 
                                id="request-id" 
                                name="RequestId" 
                                value={inputs.RequestId} 
                                onChange={handleChange}
                                readOnly 
                                style={inputStyle} 
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="lawyer-id" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Lawyer ID</label>
                            <input 
                                type="text" 
                                id="lawyer-id" 
                                name="lawyerId" 
                                value={inputs.lawyerId} 
                                onChange={handleChange}
                                readOnly 
                                style={inputStyle} 
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="client-id" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Client ID</label>
                            <input 
                                type="text" 
                                id="client-id" 
                                name="ClientId" 
                                value={inputs.ClientId} 
                                onChange={handleChange}
                                readOnly 
                                style={inputStyle} 
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="payment-date" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Payment Made Date</label>
                            <input 
                                type="date" 
                                id="payment-date" 
                                name="PaymentDate" 
                                value={inputs.PaymentDate} 
                                onChange={handleChange} 
                                style={inputStyle} 
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="upload-date" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Upload Date</label>
                            <input 
                                type="date" 
                                id="upload-date" 
                                name="UploadDate" 
                                value={inputs.UploadDate} 
                                onChange={handleChange} 
                                style={inputStyle} 
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="phone-number" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone Number</label>
                            <input 
                                type="text" 
                                id="phone-number" 
                                name="PhoneNumber" 
                                value={inputs.PhoneNumber} 
                                onChange={handleChange} 
                                maxLength="10" 
                                style={inputStyle} 
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="amount" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Amount</label>
                            <input 
                                type="text" 
                                id="amount" 
                                name="Amount" 
                                value={inputs.Amount} 
                                onChange={handleChange}
                                readOnly 
                                style={inputStyle} 
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="payment-type" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Payment Type</label>
                            <select 
                                id="payment-type" 
                                name="PaymentType" 
                                value={inputs.PaymentType} 
                                onChange={handleChange}
                                style={inputStyle} 
                            >
                                <option value="Installment">Installment</option>
                                <option value="Full">Full</option>
                            </select>
                        </div>

                        <button type="submit" style={buttonStyle}>Submit</button>
                    </form>
                </div>
            </div>

            {/* Back Button */}
            <button onClick={() => navigate('/dashboard')} style={backButtonStyle}>
                Back to Dashboard
            </button>
        </div>
    );
};

// Shared style for inputs
const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    fontSize: '16px',
};

// Style for submit button
const buttonStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
};

buttonStyle[':hover'] = {
    backgroundColor: '#2980b9',
};

// Style for back button
const backButtonStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    backgroundColor: '#7d6017',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
};

export default PaymentRequestDetails;