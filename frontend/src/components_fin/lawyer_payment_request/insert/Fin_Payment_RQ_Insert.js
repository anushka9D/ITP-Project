import React, { useState } from 'react';
import Nav from "../Fin_payment_RQ_navBar";
import "../insert/Fin_payment_RQ_Insert.css";
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert2

function Fin_Payment_RQ_Insert() {
    const [inputs, setInputs] = useState({
        RequestId: "",
        RequestDate: "",
        lawyerId: "",
        ClientId: "",
        ServiceID: "",
        Amount: "",
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest(); // No need to navigate, we'll show a success pop-up instead
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:8070/paymentRQ/add_paymentRQ", {
            RequestId: String(inputs.RequestId),
            RequestDate: String(inputs.RequestDate),
            lawyerId: String(inputs.lawyerId),
            ClientId: String(inputs.ClientId),
            ServiceID: String(inputs.ServiceID),
            Amount: Number(inputs.Amount),
        }).then(res => {
            // Show success pop-up using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Your payment request has been successfully submitted!',
                text: 'You will be notified once it’s processed.',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                timer: 3000,  // Auto close after 3 seconds
            });
        }).catch(err => {
            // Optional: Show error if something goes wrong
            Swal.fire({
                icon: 'error',
                title: 'Submission failed!',
                text: 'Something went wrong, please try again later.',
            });
        });
    };

    return (
        <div className="FIN-payment-rq-form">

            <br></br><br></br><br></br><br></br>
            <h1>Payment RQ Form</h1>
            <Nav />

            <div className="FIN-form-container">
                <form onSubmit={handleSubmit}>
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

                    <div className="FIN-form-group">
                        <label htmlFor="request-date">Request Date</label>
                        <input 
                            type="date" 
                            id="request-date" 
                            onChange={handleChange}
                            name="RequestDate" 
                            value={inputs.RequestDate}
                        />
                        <span className="FIN-calendar-icon">&#128197;</span>
                    </div>

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
                        <label htmlFor="service-id">Service ID</label>
                        <input 
                            type="text" 
                            id="service-id" 
                            onChange={handleChange}
                            name="ServiceID" 
                            value={inputs.ServiceID}
                        />
                    </div>

                    <div className="FIN-form-group">
                        <label htmlFor="amount">Amount Rs.</label>
                        <input 
                            type="text" 
                            id="amount" 
                            onChange={handleChange}
                            name="Amount" 
                            value={inputs.Amount}
                        />
                    </div>

                    <button type="submit" className="FIN-submit-button">Submit</button>

                    <br/> <br/> <br/> 
                </form>
            </div>
        </div>
    );
}

export default Fin_Payment_RQ_Insert;