import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for react-chartjs-2
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../lawyer_payment_request/Fin_payment_dashboard.css';
import Nav from '../lawyer_payment_request/Fin_payment_RQ_navBar';
import Footer from '../Fin_footer';

function Dashboard() {
    const [requestData, setRequestData] = useState([]);
    const [proofData, setProofData] = useState([]);
    const [loadingRequests, setLoadingRequests] = useState(true);
    const [loadingProofs, setLoadingProofs] = useState(true);
    const [totalIncome, setTotalIncome] = useState(0);
    const [paymentRequestsCount, setPaymentRequestsCount] = useState(0);
    const [paymentProofsCount, setPaymentProofsCount] = useState(0);
    const [installmentCount, setInstallmentCount] = useState(0);
    const [fullCount, setFullCount] = useState(0);

    const [requestSearch, setRequestSearch] = useState(''); // State for Request ID search
    const [proofSearch, setProofSearch] = useState(''); // State for Proof search

    // Reference to the report section for PDF generation
    const reportRef = useRef();

    // Fetch payment requests
    const fetchPaymentRequests = async () => {
        try {
            const response = await axios.get('http://localhost:8070/paymentRQ/paymentRQ');
            const data = response.data;

            setRequestData(data);
            setLoadingRequests(false);

            const total = data.reduce((sum, request) => sum + request.Amount, 0);
            setTotalIncome(total);
            setPaymentRequestsCount(data.length);

            // Count installment and full payment methods
            const installment = data.filter(request => request.PaymentMethod === 'Installment').length;
            const full = data.filter(request => request.PaymentMethod === 'Full').length;

            setInstallmentCount(installment);
            setFullCount(full);

        } catch (error) {
            console.error('Error fetching payment requests:', error);
        }
    };

    // Fetch payment proofs
    const fetchPaymentProofs = async () => {
        try {
            const response = await axios.get('http://localhost:8070/paymentProof/paymentProofs');
            const data = response.data;

            setProofData(data);
            setLoadingProofs(false);
            setPaymentProofsCount(data.length);
        } catch (error) {
            console.error('Error fetching payment proofs:', error);
        }
    };

   // Filter payment requests by search term
    const filteredRequests = requestData.filter((request) =>
        request.RequestId?.toLowerCase().includes(requestSearch.toLowerCase())
    );

    // Filter payment proofs by search term
    const filteredProofs = proofData.filter((proof) =>
        proof.ClientId?.toLowerCase().includes(proofSearch.toLowerCase())
    );

    useEffect(() => {
        fetchPaymentRequests();
        fetchPaymentProofs();
    }, []);

    // Updated Pie chart data (for Payment Requests and Payment Proofs count)
    const pieData = {
        labels: ['Payment Requests', 'Payment Proofs'],
        datasets: [
            {
                label: '# of Payments',
                data: [paymentRequestsCount, paymentProofsCount], // Display counts of Payment Requests and Proofs
                backgroundColor: ['#6482AD', '#987D9A'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
        ],
    };

    // Extract upload dates and count occurrences for the bar chart
    const uploadDateCounts = proofData.reduce((acc, proof) => {
        acc[proof.UploadDate] = (acc[proof.UploadDate] || 0) + 1;
        return acc;
    }, {});

    const barData = {
        labels: Object.keys(uploadDateCounts),
        datasets: [
            {
                label: 'Number of Uploads',
                data: Object.values(uploadDateCounts),
                backgroundColor: '#87CEEB',
                borderColor: '#1E90FF',
                borderWidth: 1,
            },
        ],
    };

    // Function to generate and download the PDF
    const handleGenerateReport = async () => {
        const doc = new jsPDF('p', 'mm', 'a4');
        const canvas = await html2canvas(reportRef.current);
        const imgData = canvas.toDataURL('image/png');

        // Add image to PDF
        doc.addImage(imgData, 'PNG', 10, 10, 190, 0); // Fit the content within A4 size
        doc.save('report.pdf');
    };

    return (
        <div>
            <br /><br /><br /><br />
            <Nav />
            <div className="FIN-dashboard-container" ref={reportRef}>
                {/* Header */}
                <header className="FIN-dashboard-header">
                    <Typography variant="h5">Finance Manager Dashboard</Typography>
                    <div className="FIN-nav-actions">
                        <div className="FIN-user-info">
                            <span>Charitha</span>
                            <Button variant="contained" className="FIN-logout-btn">Log Out</Button>
                        </div>
                    </div>
                </header>

                {/* Key Metrics */}
                <Grid container spacing={3} className="FIN-metrics-container">
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Income Rs.</Typography>
                                <Typography variant="h5">{totalIncome.toLocaleString()}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Payment Requests</Typography>
                                <Typography variant="h5">{paymentRequestsCount}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Made Payments</Typography>
                                <Typography variant="h5">{paymentProofsCount}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <br /><br /><br /><br />

                {/* Pie Chart for Payment Methods */}
                <Grid container spacing={3} className="FIN-metrics-container">
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Payment Request and Proof Distribution</Typography>
                                <div className="FIN-pie-chart-container">
                                    <Pie data={pieData} />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Bar Chart for Upload Dates */}
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Upload Dates Distribution</Typography>
                                <div className="FIN-bar-chart-container">
                                    <Bar data={barData} />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Payment Requests Section */}
                <br /><br />
                <div className="FIN-table-header-container">
                    <Typography variant="h6" className="FIN-section-title">Payment Requests</Typography>
                    
                    {/* Search Bar for Requests */}
                    <div className="FIN-search-container">
                        <TextField
                            label="Search Request ID"
                            variant="outlined"
                            className="FIN-search-input"
                            value={requestSearch}
                            onChange={(e) => setRequestSearch(e.target.value)}
                        />
                    </div>
                </div>

                <TableContainer component={Paper} className="FIN-custom-table">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Request ID</TableCell>
                                <TableCell>Request Date</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>View</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!loadingRequests && filteredRequests.length > 0 ? (
                                filteredRequests.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.RequestId}</TableCell>
                                        <TableCell>{row.RequestDate}</TableCell>
                                        <TableCell>{row.Amount}</TableCell>
                                        <TableCell>
                                            <Link to={`/payment_request_details/${row._id}`}>
                                                <Button variant="contained" color="primary">View Details</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4}>No payment requests found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Link to={'/View_all_requests'}>
                    <Button variant="contained" color="primary" style={{backgroundColor:'#afa66f' , marginLeft:'920px', marginTop:'20px'}}>View All</Button>
                </Link>

                {/* Payment Proofs Section */}
                <br /><br /><br /><br /> 
                <div className="FIN-table-header-container">
                    <Typography variant="h6" className="FIN-section-title">Payment Proofs</Typography>
                    
                    {/* Search Bar for Proofs */}
                    <div className="FIN-search-container">
                        <TextField
                            label="Search Client ID" // Changed to Client ID search
                            variant="outlined"
                            className="FIN-search-input"
                            value={proofSearch}
                            onChange={(e) => setProofSearch(e.target.value)}
                        />
                    </div>
                </div>

                <TableContainer component={Paper} className="FIN-custom-table">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Client ID</TableCell> {/* Changed from Proof ID to Client ID */}
                                <TableCell>Payment Date</TableCell>
                                <TableCell>Upload Date</TableCell>
                                <TableCell>Phone Number</TableCell> {/* Added Phone Number */}
                                <TableCell>View</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!loadingProofs && filteredProofs.length > 0 ? (
                                filteredProofs.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.ClientId}</TableCell> {/* Client ID */}
                                        <TableCell>{row.PaymentDate}</TableCell>
                                        <TableCell>{row.UploadDate}</TableCell>
                                        <TableCell>{row.PhoneNumber}</TableCell> {/* Added Phone Number */}
                                        <TableCell>
                                            <Link to={`/payment_proofs_details/${row._id}`}>
                                                <Button variant="contained" color="primary">View Details</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5}>No payment proofs found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Link to={'/View_all_proofs'}>
                    <Button variant="contained" color="primary" style={{backgroundColor:'#afa66f' , marginLeft:'920px', marginTop:'20px'}}>View All</Button>
                </Link>

            </div>

            {/* Generate PDF Button */}
            <Button variant="contained" color="primary" style={{backgroundColor:'#590416' , marginLeft:'920px'}} onClick={handleGenerateReport} className="FIN-generate-report-btn">
                Generate Reports
            </Button>

            <Footer />
        </div>
    );
}

export default Dashboard;