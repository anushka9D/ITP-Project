import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import NavBar from "./Dem_NavBar.js";
import Footer from "./Dem_Footer.js";
import './deed_all.css';

function AllDeed() {
  const [deeds, setDeeds] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch deeds and lawyers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const deedsResponse = await axios.get("http://localhost:8070/deeds/");
        const lawyersResponse = await axios.get("http://localhost:8070/deeds/all_Lawyers");
        
        setDeeds(deedsResponse.data);
        setLawyers(lawyersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Get lawyer's name by ID
  const getLawyerNameById = (id) => {
    const lawyer = lawyers.find(lawyer => lawyer._id === id);
    return lawyer ? `${lawyer.fName} ${lawyer.lName}` : "No Lawyer";
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this deed?")) {
      axios.delete(`http://localhost:8070/deeds/delete/${id}`)
        .then(response => {
          console.log("Deed deleted:", response.data);
          setDeeds(deeds.filter(deed => deed._id !== id));
        })
        .catch(error => console.error("Error deleting deed:", error));
    }
  };

  const handleView = (id) => {
    navigate(`/deed/${id}`); 
  };

  return (
    <div className="all-deed">
      <NavBar />      
      <div className="dem-table-container">
        <h1 className="dem-table-main-heading">All Deeds</h1>
        <TableContainer component={Paper}>
          <Table aria-label="Deeds Table" className="dem-table-summary">
            <TableHead>
              <TableRow className="dem-table-summary-row">
                <TableCell align="left" className="dem-table-summary-header"><p>Deed No</p></TableCell>
                <TableCell align="left" className="dem-table-summary-header"><p>Lawyer Name</p></TableCell>
                <TableCell align="left" className="dem-table-summary-header"><p>Deed Type</p></TableCell>
                <TableCell align="left" className="dem-table-summary-header"><p>Grantor</p></TableCell>
                <TableCell align="left" className="dem-table-summary-header"><p>Grantee</p></TableCell>
                <TableCell align="left" className="dem-table-summary-header"><p>Title</p></TableCell>
                <TableCell align="center" className="dem-table-summary-header"><p>Actions</p></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deeds.map((deed) => (
                <TableRow key={deed._id} className="dem-table-summary-row">
                  <TableCell align="left" className="dem-table-summary-data"><p>{deed.deedNo}</p></TableCell>
                  <TableCell align="left" className="dem-table-summary-data"><p>{getLawyerNameById(deed.assignedLawyer)}</p></TableCell>
                  <TableCell align="left" className="dem-table-summary-data"><p>{deed.deedType}</p></TableCell>
                  <TableCell align="left" className="dem-table-summary-data"><p>{deed.grantor ? `${deed.grantor.fname} ${deed.grantor.lname}` : "No Grantor"}</p></TableCell>
                  <TableCell align="left" className="dem-table-summary-data"><p>{deed.grantee ? `${deed.grantee.fname} ${deed.grantee.lname}` : "No Grantee"}</p></TableCell>
                  <TableCell align="left" className="dem-table-summary-data"><p>{deed.title}</p></TableCell>
                  <TableCell align="center" className="dem-table-summary-action">
                    <button onClick={() => handleView(deed._id)}>View</button>
                    <button onClick={() => handleDelete(deed._id)} >Delete</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br/>
      </div>
      <Footer />
    </div>
  );
}

export default AllDeed;
