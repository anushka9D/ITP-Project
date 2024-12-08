import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Swal from 'sweetalert2'; // SweetAlert2 for pop-up alerts
import axios from 'axios';


function PaymentProofDetailsAndInsert() {
    const { id } = useParams(); // Get the id from the URL
    const [paymentProof, setPaymentProof] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch payment proof details based on the id
    const fetchPaymentProofDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/paymentProof/paymentProof/${id}`);
            setPaymentProof(response.data);

            // Only auto-assign the needed fields (RequestId, lawyerId, ClientId, Amount)
            setInputs({
                RequestId: response.data.RequestId,
                lawyerId: response.data.lawyerId,
                ClientId: response.data.ClientId,
                PaymentDate: "",  // Leave PaymentDate empty
                UploadDate: "",   // Leave UploadDate empty
                PhoneNumber: "",  // Leave PhoneNumber empty
                PaymentType: "Installment", // Default to Installment
                Amount: response.data.Amount || "",  // If Amount exists, use it
            });

            setLoading(false);
        } catch (error) {
            setError('Error fetching payment proof details. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPaymentProofDetails(); // Fetch data when component mounts
    }, [id]);

    const [inputs, setInputs] = useState({
        RequestId: "", 
        lawyerId: "", 
        ClientId: "",
        PaymentDate: "",
        UploadDate: "",
        PhoneNumber: "", 
        PaymentType: "Installment", // Default to "Installment"
        Amount: "", // Added Amount field
    });

    // Handle input change for the form
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // Validate phone number and form before submission
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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            sendRequest();  // Trigger the request to the server
        }
    };

    // Function to send data to the backend
    const sendRequest = async () => {
        await axios.post("http://localhost:8070/paymentProof/add_paymentProof", {
            RequestId: String(inputs.RequestId),
            lawyerId: String(inputs.lawyerId),
            ClientId: String(inputs.ClientId),
            PaymentDate: String(inputs.PaymentDate),
            UploadDate: String(inputs.UploadDate),
            PhoneNumber: String(inputs.PhoneNumber),
            PaymentType: String(inputs.PaymentType),
            Amount: String(inputs.Amount),  // Added Amount field to request
        }).then(res => {
            // Show success alert with SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Payment proof has been successfully submitted!',
                text: 'You will be notified once it’s processed.',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                timer: 3000,  // Auto close after 3 seconds
            });
        }).catch(err => {
            // Show error alert with SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Submission failed!',
                text: 'Something went wrong, please try again later.',
            });
        });
    };

    if (loading) {
        return <p>Loading payment proof details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!paymentProof) {
        return <p>No details found for this payment proof.</p>;
    }

    return (
        <div className="payment-proof-details-container">
            <h1>Payment Proof Details</h1>
            <div id="pdf-content" style={{ padding: '20px', backgroundColor: '#f8f4e1', borderRadius: '10px' }}>
                <table className="proof-details-table">
                    <tbody>
                        <tr>
                            <td><strong>Request ID:</strong></td>
                            <td>{paymentProof.RequestId}</td>
                        </tr>
                        <tr>
                            <td><strong>Lawyer ID:</strong></td>
                            <td>{paymentProof.lawyerId}</td>
                        </tr>
                        <tr>
                            <td><strong>Client ID:</strong></td>
                            <td>{paymentProof.ClientId}</td>
                        </tr>
                        {/* Amount row, larger text and highlighted */}
                        <tr>
                            <td><strong>Amount:</strong></td>
                            <td style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#e74c3c' }}>{paymentProof.Amount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div className="payment-proof-form">
                <h2>Insert New Payment Proof</h2>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="request-id">Request ID</label>
                            <input 
                                type="text" 
                                id="request-id" 
                                onChange={handleChange}
                                name="RequestId"                
                                value={inputs.RequestId}        
                                readOnly  // Make this field read-only as it's auto-assigned
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lawyer-id">Lawyer ID</label>
                            <input 
                                type="text" 
                                id="lawyer-id" 
                                onChange={handleChange}
                                name="lawyerId"                
                                value={inputs.lawyerId}        
                                readOnly  // Make this field read-only as it's auto-assigned
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="client-id">Client ID</label>
                            <input 
                                type="text" 
                                id="client-id" 
                                onChange={handleChange}
                                name="ClientId"                
                                value={inputs.ClientId}        
                                readOnly  // Make this field read-only as it's auto-assigned
                            />
                        </div>

                        {/* Payment Made Date - no auto-assign */}
                        <div className="form-group">
                            <label htmlFor="payment-date">Payment Made Date</label>
                            <input 
                                type="date" 
                                id="payment-date" 
                                onChange={handleChange}
                                name="PaymentDate" 
                                value={inputs.PaymentDate}
                            />
                            <span className="calendar-icon">&#128197;</span> {/* Optional Calendar Icon */}
                        </div>

                        {/* Upload Date - no auto-assign */}
                        <div className="form-group">
                            <label htmlFor="upload-date">Upload Date</label>
                            <input 
                                type="date"
                                id="upload-date" 
                                onChange={handleChange}
                                name="UploadDate" 
                                value={inputs.UploadDate}
                            />
                        </div>

                        {/* Phone Number - no auto-assign */}
                        <div className="form-group">
                            <label htmlFor="phone-number">Phone Number</label>
                            <input 
                                type="text" 
                                id="phone-number" 
                                onChange={handleChange}
                                name="PhoneNumber" 
                                value={inputs.PhoneNumber}
                                maxLength="10"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <input 
                                type="text" 
                                id="amount" 
                                onChange={handleChange}
                                name="Amount" 
                                value={inputs.Amount}
                                readOnly  // Make this field read-only as it's auto-assigned
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="payment-type">Payment Type</label>
                            <select 
                                id="payment-type" 
                                name="PaymentType" 
                                onChange={handleChange} 
                                value={inputs.PaymentType}
                            >
                                <option value="Installment">Installment</option>
                                <option value="Full">Full</option>
                            </select>
                        </div>

                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>

            {/* Back to Dashboard Button */}
            <Link to="/dashboard">
                <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Back to Dashboard
                </Button>
            </Link>
        </div>
    );
}

export default PaymentProofDetailsAndInsert;