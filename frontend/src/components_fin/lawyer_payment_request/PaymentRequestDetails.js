import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Get the id from the URL
import axios from 'axios';
import { Button } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './PaymentRequestDetails.css'; // Updated CSS file with FIN prefixes

function PaymentRequestDetails() {
    const { id } = useParams(); // Get the id from the URL
    const [paymentRequest, setPaymentRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch payment request details based on the id
    const fetchPaymentRequestDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/paymentRQ/paymentRQ/${id}`);
            setPaymentRequest(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching payment request details:', error);
        }
    };

    useEffect(() => {
        fetchPaymentRequestDetails(); // Fetch data when component mounts
    }, [id]);

    // Function to generate the PDF
    const generatePDF = () => {
        const input = document.getElementById('FIN-pdf-content');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`PaymentRequest_${paymentRequest.RequestId}.pdf`);
        });
    };

    if (loading) {
        return <p>Loading payment request details...</p>;
    }

    if (!paymentRequest) {
        return <p>No details found for this payment request.</p>;
    }

    return (
        <div className="FIN-payment-details-container">
            <h1>Payment Request Details</h1>
            <div id="FIN-pdf-content" style={{ padding: '20px', backgroundColor: '#f8f4e1', borderRadius: '10px' }}>
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Request ID:</strong></td>
                            <td>{paymentRequest.RequestId}</td>
                        </tr>
                        <tr>
                            <td><strong>Request Date:</strong></td>
                            <td>{paymentRequest.RequestDate}</td>
                        </tr>
                        <tr>
                            <td><strong>Lawyer ID:</strong></td>
                            <td>{paymentRequest.lawyerId}</td> {/* Changed `LawyerId` to `lawyerId` */}
                        </tr>
                        <tr>
                            <td><strong>Client ID:</strong></td>
                            <td>{paymentRequest.ClientId}</td>
                        </tr>
                        <tr>
                            <td><strong>Service ID:</strong></td>
                            <td>{paymentRequest.ServiceID}</td>
                        </tr>
                        <tr>
                            <td><strong>Amount (RS.):</strong></td>
                            <td>{paymentRequest.Amount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Button
                variant="contained"
                color="primary"
                onClick={generatePDF}
                style={{ marginTop: '20px', backgroundColor: '#74512D' }}
            >
                Generate Report
            </Button>
            <Link to="/back_dashboard">
                <Button variant="contained" color="primary" style={{ marginTop: '40px' }}>
                    Back to Dashboard 
                </Button>
            </Link>
        </div>
    );
}

export default PaymentRequestDetails;