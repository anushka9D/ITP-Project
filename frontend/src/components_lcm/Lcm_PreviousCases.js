import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Lcm_Footer";
import NavBar from "./Lcm_NavBar";
import VisibilityIcon from '@mui/icons-material/Visibility';

function PreviousCases() {
    const [previousCases, setPreviousCases] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPreviousCases = async () => {
            try {
                const res = await axios.get("http://localhost:8070/case/getallcase");
                setPreviousCases(res.data);
            } catch (err) {
                alert(err.message); 
            }
        };

        fetchPreviousCases();
    }, []);

    const goToCaseDetailsPage = (caseItem) => {
        navigate(`/Lcm_PreviousCaseDetails`, { state: { caseItem } });
    };

    // Filter the cases to only include those with "Complete" status
    const completeCases = previousCases.filter(caseItem => caseItem.status === "complete");

    return (
        <div>
            <NavBar />
            <div className="lcm-dashboard-table-container">
                <h3 className="lcm-dashboard-subhead">Previous Cases</h3>
                <table className="lcm-dashboard-table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col" className="lcm-dashboard-th">Case Number</th>
                            <th scope="col" className="lcm-dashboard-th" >Case Created Date</th>
                            <th scope="col" className="lcm-dashboard-th">Nature</th>
                            <th scope="col" className="lcm-dashboard-th">Court Area</th>
                            <th scope="col" className="lcm-dashboard-th">Court Type</th>
                            <th scope="col" className="lcm-dashboard-th">Status</th>
                            <th scope="col" className="lcm-dashboard-th">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completeCases.length > 0 ? (
                            completeCases.map((caseItem) => (
                                <tr key={caseItem._id}>
                                    <td>{caseItem.caseNumber}</td>
                                    <td>{caseItem.caseCreatedDate}</td>
                                    <td>{caseItem.nature}</td>
                                    <td>{caseItem.courtArea}</td>
                                    <td>{caseItem.courtType}</td>
                                    <td style={{ color: "green", fontWeight: "bold" }}>{caseItem.status}</td>
                                    
                                    <td>
                                        <button
                                            type="button"
                                            className="btn-btn-view-case"
                                            onClick={() => goToCaseDetailsPage(caseItem)}
                                        >
                                            <VisibilityIcon /> View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No complete cases found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default PreviousCases;
