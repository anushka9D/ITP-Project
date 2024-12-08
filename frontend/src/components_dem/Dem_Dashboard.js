import React, { useState, useEffect } from "react";
import NavBar from "./Dem_NavBar";
import Footer from "./Dem_Footer";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem } from "@mui/material";

import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; 
import GroupIcon from '@mui/icons-material/Group'; 
import PersonIcon from '@mui/icons-material/Person';
import ScheduleIcon from '@mui/icons-material/Schedule'; 
import PaymentIcon from '@mui/icons-material/Payment'; 
import './deed_dashboard.css';
import {PieChart,Pie,Cell,Tooltip,Legend,ResponsiveContainer} from "recharts";

const featureInfoData = [
    {
        icon: <AccountBalanceIcon />,
        title: "Deeds",
        countKey: "allDeeds"
    },
    {
        icon: <GroupIcon />,
        title: "Lawyers",
        countKey: "allLawyers"
    },
    {
        icon: <PersonIcon />,
        title: "Clients",
        countKey: "allClients"
    },
    {
        icon: <ScheduleIcon />,
        title: "Appointment",
        countKey: "appointmentRequests"
    },
    {
        icon: <PaymentIcon />,
        title: "Payment",
        countKey: "paymentRequests"
    },
];

export default function DeedDashboard() {
    const [deedCounts, setDeedCounts] = useState({
        allDeeds: 0,
        allLawyers: 0,
        allClients: 0,
        appointmentRequests: 0,
        paymentRequests: 0,
    });
    const [nonRegisteredDeeds, setNonRegisteredDeeds] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDeed, setSelectedDeed] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [deedsPerLawyer, setDeedsPerLawyer] = useState([]);


    useEffect(() => {
        fetchCounts();
        fetchNonRegisteredDeeds();
    }, []);

    useEffect(() => {
        fetchDeedsPerLawyer();
    }, []);

    const fetchCounts = async () => {
        try {
            const response = await axios.get("http://localhost:8070/deeds/counts"); 
            console.log(response.data); 
            setDeedCounts({
                allDeeds: response.data.deedCount || 0,
                allLawyers: response.data.lawyerCount || 0,
                allClients: response.data.clientCount || 0,
                appointmentRequests: response.data.appointmentCount || 0, 
                paymentRequests: response.data.paymentRequestCount || 0 
            });
        } catch (error) {
            console.error("Error fetching counts:", error); 
        }
    };


    const fetchNonRegisteredDeeds = async () => {
        try {
            const response = await axios.get("http://localhost:8070/deeds/nonRegisteredDeeds");
            setNonRegisteredDeeds(response.data);
        } catch (error) {
            console.error("Error fetching deeds:", error);
        }
    };

    const handleOpenDialog = (deed) => {
        setSelectedDeed(deed);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedDeed(null);
    };

    const handleStatusChange = async () => {
        try {
            await axios.put(`http://localhost:8070/deeds/updateStatus/${selectedDeed._id}`, { deedStatus: newStatus });
            fetchNonRegisteredDeeds(); 
            handleCloseDialog();
        } catch (error) {
            console.error("Error updating deed status:", error);
        }
    };

    const fetchDeedsPerLawyer = async () => {
        try {
            const response = await axios.get("http://localhost:8070/deeds/deeds-per-lawyer");
            setDeedsPerLawyer(response.data);
        } catch (error) {
            console.error("Error fetching deeds per lawyer:", error);
        }
    };

    const COLORS = [
        "#D9CBAF",
        "#E2B400", 
        "#A97B5D",
        "#B09C7A",
        "#6F4C3E",
        "#D7B19C", 
        "#A68A77", 
        "#8C6A5A", 
        "#4E3B31",
        "#E1C6B0" 
    ];
    
    
    

    return (
        <div className="dem_dashboard">
            <NavBar />
            <div className="dem-dashboard-feature-section">
                <div className="dem-dashboard-feature-section-top">
                    <h1>Deed Management Dashboard</h1>
                </div>
                <div className="dem-dashboard-feature-section-bottom">
                    {featureInfoData.map((feature, index) => (
                        <div key={index} className="dem-dashboard-feature-section-info">
                            {feature.icon}
                            <h3>{feature.title}</h3>
                            <p>{deedCounts[feature.countKey]}</p>
                </div>
                ))}
            </div>
        </div>
        
        <div className="dem-pie-chart-container">
                <h3 variant="h5" gutterBottom>Success Rate of Deeds by Lawyer</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={deedsPerLawyer}
                            dataKey="deedCount"
                            nameKey="lawyerName"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {deedsPerLawyer.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>


            {/* table - not registered deed*/}
            <div className="dem-table-container">
                <h3>Current Deeds</h3><br/>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow className="dem-table-summary-row">
                                <TableCell align="left" className="dem-table-summary-header"><p>Deed Number</p></TableCell>
                                <TableCell align="left" className="dem-table-summary-header"><p>Assigned Lawyer</p></TableCell>
                                <TableCell align="left" className="dem-table-summary-header"><p>Grantor</p></TableCell>
                                <TableCell align="left" className="dem-table-summary-header"><p>Grantee</p></TableCell>
                                <TableCell align="left" className="dem-table-summary-header"><p>Deed Status</p></TableCell>
                                <TableCell align="center" className="dem-table-summary-header"><p>Actions</p></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {nonRegisteredDeeds.map((deed) => (
                                <TableRow key={deed._id} className="dem-table-summary-row">
                                    <TableCell align="left" className="dem-table-summary-data"><p>{deed.deedNo}</p></TableCell>
                                    <TableCell align="left" className="dem-table-summary-data"><p>{`${deed.assignedLawyer.fName} ${deed.assignedLawyer.lName}`}</p></TableCell>
                                    <TableCell align="left" className="dem-table-summary-data"><p>{`${deed.grantor.fname} ${deed.grantor.lname}`}</p></TableCell>
                                    <TableCell align="left" className="dem-table-summary-data"><p>{`${deed.grantee.fname} ${deed.grantee.lname}`}</p></TableCell>
                                    <TableCell align="left" className="dem-table-summary-data"><p>{deed.deedStatus}</p></TableCell>
                                    <TableCell align="center" className="dem-table-summary-action">
                                        <button onClick={() => handleOpenDialog(deed)}>Change Status</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/>
            </div>

            <Dialog 
                open={openDialog} 
                onClose={handleCloseDialog} 
                sx={{ 
                    '& .MuiDialog-paper': { 
                    backgroundColor: '#f5f5f5', 
                    width: '400px', 
                    maxWidth: '100%', 
                    }
                }}
            >
            <DialogTitle 
            sx={{ 
                backgroundColor: '#74512D', 
                color: 'white' 
                }}
                >
                Change Deed Status
                </DialogTitle>
    
    <DialogContent>
        <br/>
        <Select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            fullWidth
            sx={{
                backgroundColor: 'white', 
                color: '#000', 
                '&:hover': {
                backgroundColor: '#e0e0e0', 
                }
            }}
        >
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
            <MenuItem value="Registered">Registered</MenuItem>
            <MenuItem value="Completed">Created</MenuItem>
        </Select>
    </DialogContent>
    
    <DialogActions>
        <button 
          onClick={handleCloseDialog} 
          sx={{
              backgroundColor: '#74512D', 
              color: 'white',
              '&:hover': {
                  backgroundColor: '#5a3d23' 
              }
          }}
        >
          Cancel
        </button>
        
        <button 
          onClick={handleStatusChange} 
          sx={{
              backgroundColor: '#5a3d23', 
              color: 'white',
              '&:hover': {
                  backgroundColor: '#74512D'
              }
          }}
        >
          Update
        </button>
    </DialogActions>
</Dialog>

            <Footer />
        </div>
    );
}
