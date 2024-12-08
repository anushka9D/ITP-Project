import React, { useState, useEffect } from 'react';
import Nav from "../Fin_payment_proof_nav_bar";  // Assuming you have a similar navigation component
import "../Inser_proofs/PaymentProofInsert.css";  // Assuming you'll have a CSS file for this component
import axios from 'axios';
import Swal from 'sweetalert2';  // SweetAlert2 for pop-up alerts

const PaymentProofInsert = () => {
    // State to handle form inputs
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

    // Automatically set the current date for PaymentDate and UploadDate
    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
        setInputs((prevState) => ({
            ...prevState,
            PaymentDate: currentDate,
            UploadDate: currentDate,
        }));
    }, []);

    // Handle input change
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
            console.log(inputs);
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

    return (
        <div className="FIN-payment-proof-form">
            <h1>Payment Proof Form</h1>
            <Nav />  {/* Include navigation if applicable */}

            <div className="FIN-form-container">
                <form onSubmit={handleSubmit}>
                    {/* Added form group for RequestId */}
                    <div className="FIN-form-group">
                        <label htmlFor="request-id">Request ID</label>
                        <input 
                            type="text" 
                            id="request-id" 
                            onChange={handleChange}
                            name="RequestId"                
                            value={inputs.RequestId}        
                        />
                    </div>

                    {/* Added form group for lawyerId */}
                    <div className="FIN-form-group">
                        <label htmlFor="lawyer-id">Lawyer ID</label>
                        <input 
                            type="text" 
                            id="lawyer-id" 
                            onChange={handleChange}
                            name="lawyerId"                
                            value={inputs.lawyerId}        
                        />
                    </div>

                    {/* Changed form group for ClientId */}
                    <div className="FIN-form-group">
                        <label htmlFor="client-id">Client ID</label>
                        <input 
                            type="text" 
                            id="client-id" 
                            onChange={handleChange}
                            name="ClientId"                
                            value={inputs.ClientId}        
                        />
                    </div>

                    <div className="FIN-form-group">
                        <label htmlFor="payment-date">Payment Made Date</label>
                        <input 
                            type="date" 
                            id="payment-date" 
                            onChange={handleChange}
                            name="PaymentDate" 
                            value={inputs.PaymentDate}
                        />
                        <span className="FIN-calendar-icon">&#128197;</span> {/* Optional Calendar Icon */}
                    </div>

                    <div className="FIN-form-group">
                        <label htmlFor="upload-date">Upload Date</label>
                        <input 
                            type="date"
                            id="upload-date" 
                            onChange={handleChange}
                            name="UploadDate" 
                            value={inputs.UploadDate}
                        />
                    </div>

                    {/* Added form group for PhoneNumber */}
                    <div className="FIN-form-group">
                        <label htmlFor="phone-number">Phone Number</label>
                        <input 
                            type="text" 
                            id="phone-number" 
                            onChange={handleChange}
                            name="PhoneNumber" 
                            value={inputs.PhoneNumber}
                            maxLength="10" // Limit to 10 digits
                        />
                    </div>

                    {/* Added form group for Amount */}
                    <div className="FIN-form-group">
                        <label htmlFor="amount">Amount</label>
                        <input 
                            type="text" 
                            id="amount" 
                            onChange={handleChange}
                            name="Amount" 
                            value={inputs.Amount}
                        />
                    </div>

                    {/* Changed Payment Type to Dropdown */}
                    <div className="FIN-form-group">
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

                    <button type="submit" className="FIN-submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default PaymentProofInsert;  // Default export for the component