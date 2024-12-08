import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";
import NavBar from "./Dem_NavBar.js";
import Footer from "./Dem_Footer.js";
import './deed_all.css';
import { useNavigate } from "react-router-dom";

const DemSearchResults = () => {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await fetch(`http://localhost:8070/deeds/search/${query}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSearchResults();
    }, [query]);

    const handleView = (id) => {
        navigate(`/deed/${id}`); 
      };

    if (loading) return <CircularProgress />;

    return (
        <div>
            <NavBar />
            <div className="dem-table-container">
                {error ? (
                    <div style={{ color: 'red', textAlign: 'center', margin: '20px 0' }}>
                        <h2>{error}</h2>
                    </div>
                ) : (
                    <TableContainer component={Paper}>
                        <p className="dem-table-main-heading-2">Search Results for "{ query }"</p>
                        <Table className="dem-table-summary">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="dem-table-summary-header">Deed No</TableCell>
                                    <TableCell className="dem-table-summary-header">Title</TableCell>
                                    <TableCell className="dem-table-summary-header">Deed Type</TableCell>
                                    <TableCell className="dem-table-summary-header">Grantor</TableCell>
                                    <TableCell className="dem-table-summary-header">Grantee</TableCell>
                                    <TableCell className="dem-table-summary-header">Consideration Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchResults.length > 0 ? (
                                    searchResults.map((deed) => (
                                        <TableRow key={deed._id} className="dem-table-summary-row" onClick={() => handleView(deed._id)}>
                                            <TableCell className="dem-table-summary-data">{deed.deedNo}</TableCell>
                                            <TableCell className="dem-table-summary-data">{deed.title}</TableCell>
                                            <TableCell className="dem-table-summary-data">{deed.deedType}</TableCell>
                                            <TableCell className="dem-table-summary-data">{deed.grantor.fname} {deed.grantor.lname}</TableCell>
                                            <TableCell className="dem-table-summary-data">{deed.grantee.fname} {deed.grantee.lname}</TableCell>
                                            <TableCell className="dem-table-summary-data">{deed.considerationValue}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">No results found.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default DemSearchResults;
