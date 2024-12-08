import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './PaymentProofDetails.css'; // Updated CSS file with FIN prefixes

function PaymentProofDetails() {
    const { id } = useParams(); // Get the id from the URL
    const [paymentProof, setPaymentProof] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch payment proof details based on the id
    const fetchPaymentProofDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/paymentProof/paymentProof/${id}`);
            setPaymentProof(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching payment proof details:', error);
        }
    };

    useEffect(() => {
        fetchPaymentProofDetails(); // Fetch data when component mounts
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
            pdf.save(`PaymentProof_${paymentProof.RequestId}.pdf`);
        });
    };

    // Function to open WhatsApp with the provided phone number
    const sendWhatsAppMessage = () => {
        const phoneNumber = "+94" + paymentProof.PhoneNumber; // Add the prefix +94
        const whatsappURL = `https://wa.me/${phoneNumber}?text=Hello, I am contacting you regarding your payment proof.`;
        window.open(whatsappURL, '_blank');
    };

    if (loading) {
        return <p>Loading payment proof details...</p>;
    }

    if (!paymentProof) {
        return <p>No details found for this payment proof.</p>;
    }

    return (
        <div className="FIN-payment-proof-details-container">
            <h1>Payment Proof Details</h1>
            <div id="FIN-pdf-content" style={{ padding: '20px', backgroundColor: '#f8f4e1', borderRadius: '10px' }}>
                <table className="FIN-proof-details-table">
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
                        <tr>
                            <td><strong>Payment Date:</strong></td>
                            <td>{paymentProof.PaymentDate}</td>
                        </tr>
                        <tr>
                            <td><strong>Upload Date:</strong></td>
                            <td>{paymentProof.UploadDate}</td>
                        </tr>
                        <tr>
                            <td><strong>Phone Number:</strong></td>
                            <td>{paymentProof.PhoneNumber}</td>
                        </tr>
                        <tr>
                            <td><strong>Payment Type:</strong></td>
                            <td>{paymentProof.PaymentType}</td>
                        </tr>
                        <tr>
                            <td><strong>Amount:</strong></td>
                            <td>{paymentProof.Amount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Generate Report Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={generatePDF}
                style={{ marginTop: '20px', backgroundColor: '#e74c3c' }}
            >
                Generate Report
            </Button>

            {/* Back to Dashboard Button */}
            <Link to="/back_dashboard">
                <Button variant="contained" color="primary" style={{ marginTop: '20px', marginLeft: '20px' }}>
                    Back to Dashboard
                </Button>
            </Link>

            {/* Send WhatsApp Message Button */}
            <Button
                variant="outlined"
                color="secondary"
                onClick={sendWhatsAppMessage}
                style={{
                    marginTop: '20px',
                    marginLeft: '20px',
                    color: '#e74c3c',
                    borderColor: '#e74c3c',
                    fontWeight: 'bold'
                }}
            >
                Send WhatsApp Message
            </Button>
        </div>
    );
}

export default PaymentProofDetails;