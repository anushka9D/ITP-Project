import NavBar from "../components_atm/Atm_NavBar";
import Footer from "../components_atm/Atm_Footer";
import './Atm_attorney_management.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

import { 
    TableContainer, 
    Paper, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody, 
    Button
} from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PersonIcon from '@mui/icons-material/Person';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function ATM_Dashboard() {
    const [userData, setUserData] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [nicSearch, setNicSearch] = useState(""); // NIC search state
    const navigate = useNavigate(); // Initialize the navigate function

    // Fetch user data
    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:8070/userRegistration/userRegistrations');
            setUserData(response.data);
            setLoadingUsers(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    // Filtered data for each user type
    const userTypes = [
        { type: 'Appointment Management', addLabel: 'Add New AM' },
        { type: 'Legal Manager', addLabel: 'Add New LCM' },
        { type: 'Finance Manager', addLabel: 'Add New FM' },
        { type: 'Deed Manager', addLabel: 'Add New DCM' },
        { type: 'Document Manager', addLabel: 'Add New DM' },
        { type: 'Support Agent', addLabel: 'Add New SA' }
    ];

    // Count users by type
    const getUserCountByType = (type) => {
        return userData.filter(user => user.userType === type).length;
    };

    // Calculate active and inactive counts
    const activeCount = userData.filter(user => user.userStatus.toLowerCase() === 'active').length;
    const inactiveCount = userData.filter(user => user.userStatus.toLowerCase() === 'inactive').length;

    // Data for the pie chart
    const pieData = {
        labels: ['Active', 'Inactive'],
        datasets: [
            {
                label: 'User Status',
                data: [activeCount, inactiveCount],
                backgroundColor: ['#4caf50', '#f44336'], // Green for active, red for inactive
                borderColor: ['#388e3c', '#d32f2f'],
                borderWidth: 1,
            },
        ],
    };

    // Data for the bar chart
    const barData = {
        labels: userTypes.map(role => role.type),
        datasets: [
            {
                label: 'Number of Users',
                data: userTypes.map(role => getUserCountByType(role.type)),
                backgroundColor: ['#FF6347', '#32CD32', '#87CEFA', '#FFD700', '#9370DB', '#3CB371'],
            }
        ],
    };

    // Function to generate the PDF report for the bar chart
    const generateBarChartReport = () => {
      const doc = new jsPDF();
      doc.setFont('helvetica', 'bold');
      doc.setTextColor('#FF0000');
      doc.setFontSize(16);
      doc.text('User Summary Report', 20, 20);

      let currentY = 30;

      userTypes.forEach((role, index) => {
        const typeUsers = userData.filter(user => user.userType === role.type);
        const tableData = typeUsers.map(user => [
          user.userId,
          { content: user.fName, styles: { textColor: '#74512D' } },
          user.lName,
          user.nic,
          user.address,
          user.email,
          user.phoneNumber,
          user.userStatus
        ]);

        if (tableData.length > 0) {
          doc.setTextColor('#74512D');
          doc.setFontSize(14);
          doc.text(`${role.type} Details`, doc.internal.pageSize.width / 2, currentY, { align: 'center' });

          doc.autoTable({
            head: [['User ID', 'First Name', 'Last Name', 'NIC', 'Address', 'Email', 'Phone Number', 'Status']],
            body: tableData,
            startY: currentY + 10,
            theme: 'striped',
            headStyles: { fillColor: '#afa66f' },
            styles: {
              halign: 'left',
              fontSize: 10
            },
            margin: { top: 10 },
            tableWidth: 'auto',
          });

          currentY = doc.autoTable.previous.finalY + 20;
        }
      });

      doc.save('user_summary_report.pdf');
    };

    const generatePieChartReport = () => {
      const doc = new jsPDF();
      doc.setFont('helvetica', 'bold');
      doc.setTextColor('#FF0000');
      doc.setFontSize(16);
      doc.text('User Status Distribution Report', 20, 20);

      const activeUsers = userData.filter(user => user.userStatus.toLowerCase() === 'active');
      const inactiveUsers = userData.filter(user => user.userStatus.toLowerCase() === 'inactive');

      const tableData = [
        ['Active Users', activeCount],
        ['Inactive Users', inactiveCount],
      ];
      doc.autoTable({
        head: [['Status', 'Count']],
        body: tableData,
        startY: 30,
      });

      doc.setFontSize(14);
      doc.setTextColor('#4caf50');
      doc.text('Active Users Details', 20, 60);

      const activeUserData = activeUsers.map(user => [
        user.userId,
        user.fName,
        user.lName,
        user.nic,
        user.address,
        user.email,
        user.phoneNumber
      ]);
      doc.autoTable({
        head: [['User ID', 'First Name', 'Last Name', 'NIC', 'Address', 'Email', 'Phone Number']],
        body: activeUserData,
        startY: 70,
        theme: 'striped',
        headStyles: { fillColor: '#4caf50' },
      });

      let finalY = doc.autoTable.previous.finalY + 20;
      doc.setTextColor('#f44336');
      doc.text('Inactive Users Details', 20, finalY);

      const inactiveUserData = inactiveUsers.map(user => [
        user.userId,
        user.fName,
        user.lName,
        user.nic,
        user.address,
        user.email,
        user.phoneNumber
      ]);
      doc.autoTable({
        head: [['User ID', 'First Name', 'Last Name', 'NIC', 'Address', 'Email', 'Phone Number']],
        body: inactiveUserData,
        startY: finalY + 10,
        theme: 'striped',
        headStyles: { fillColor: '#f44336' },
      });

      doc.save('user_status_distribution_report.pdf');
    };

    const filteredData = nicSearch
        ? userData.filter(user => user.nic.includes(nicSearch))
        : userData;

    return (
        <div className="ATM_dashboard-container">
            <NavBar />

            <div className="ATM_dashboard_css">
                <br /><br /><br /><br />

                <div className="ATM_user-summary">
                    <h2>User Summary</h2>
                    <br></br>
                    <div className="ATM_user-summary">
                        {userTypes.map((role, index) => (
                            <div key={index} className="ATM_user-summary-box">
                                <PersonIcon /><br />
                                <p className="ATM_box-text">{role.type}</p>
                                <p className="ATM_box-number">{getUserCountByType(role.type)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="ATM_firm-summary">
                    <h2 style={{ textAlign: 'left', color: '#74512D' }}>Firm Summary</h2>
                    <div className="ATM_summary-boxes">
                        <div className="ATM_box">Total Cases 150</div>
                        <div className="ATM_box">Earnings of the Month 100,000</div>
                        <div className="ATM_box">Total Deeds 100</div>
                        <div className="ATM_box">Earnings of the Day 15,000</div>
                    </div>
                </div>

                <div className="ATM_charts-container">
                    <div className="ATM_bar-chart-container">
                        <h3 style={{ color: '#74512D' }}>User Summary</h3>
                        <Bar data={barData} />
                        <div style={{ textAlign: 'right', marginTop: '10px' }}>
                            <Button
                                variant="contained"
                                style={{ backgroundColor: '#74512D', color: 'white', marginTop: '10px' }}
                                onClick={generateBarChartReport}
                            >
                                Generate Report
                            </Button>
                        </div>
                    </div>

                    <div className="ATM_pie-chart-container">
                        <h3 style={{ textAlign: 'left', width: '100%', color: '#74512D' }}>User Status Distribution</h3>
                        <div style={{ width: '80%', height: '80%', display: 'flex', justifyContent: 'center' }}>
                            <Pie data={pieData} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', width: '100%' }}>
                            <Button
                                variant="contained"
                                style={{ backgroundColor: '#74512D', color: 'white' }}
                                onClick={generatePieChartReport}
                            >
                                Generate Report
                            </Button>
                        </div>
                    </div>
                </div>

                <br /><br /><br /><br />
                <div className="ATM_search-container" style={{ textAlign: 'right', marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Search by NIC"
                        value={nicSearch}
                        onChange={(e) => setNicSearch(e.target.value)}
                        style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid black',
                            width: '20%',
                            outline: 'none',
                        }}
                    />
                </div>

                {userTypes.map((role, index) => (
                    <div key={index} className="ATM_table-section">
                        <div className="ATM_table-header-container">
                            <h2 className="ATM_table-header">{role.type}</h2>
                        </div>
                        <TableContainer component={Paper} className="ATM_custom-table">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>NIC</TableCell>
                                        <TableCell>User Status</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {!loadingUsers && filteredData.length > 0 ? (
                                        filteredData
                                            .filter(user => user.userType === role.type)
                                            .map((row, rowIndex) => (
                                                <TableRow key={rowIndex}>
                                                    <TableCell>{row.fName}</TableCell>
                                                    <TableCell>{row.nic}</TableCell>
                                                    <TableCell>{row.userStatus}</TableCell>
                                                    <TableCell>
                                                        <Link to={`/user_details/${row._id}`}>
                                                            <Button variant="contained" style={{ backgroundColor: '#afa66f', color: 'white' }}>
                                                                View Details
                                                            </Button>
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                {loadingUsers ? 'Loading...' : 'No users available for this category'}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className="ATM_add-user-button-container">
                            <Button
                                variant="contained"
                                style={{ backgroundColor: '#74512D', color: 'white', margin: '20px 0', marginLeft: '1125px' }}
                                onClick={() => navigate('/add_lawyer')}
                            >
                                {role.addLabel}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
}

export default ATM_Dashboard;
