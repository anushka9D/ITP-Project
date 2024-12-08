import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "./Lcm_Footer";
import LcmNavbar from "./Lcm_NavBar";

function CaseUpdate() {
    const { id } = useParams();
    const Id = id;
    const [caseData, setcaseData] = useState({});
    const navigate = useNavigate();
    

    useEffect(() => {
        // Fetch case details
        const fetchCaseDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8070/case/get/${Id}`);
                 setcaseData(res.data.case)
            } catch (err) {
                alert(err.message);
            }
        };

        fetchCaseDetails();
    }, [Id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setcaseData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.put(`http://localhost:8070/case/update/${caseData._id}`, caseData)
            alert("Document updated successfully!");
            navigate('/lcm_dashboard');
            console.log(caseData);

        } catch (err) {
            alert(err.message);
        }
    };


    // Handle marking case as complete
    function handleMarkAsComplete() {
        if (window.confirm("Are you sure you want to mark this case as complete?")) {
            const updatedCase = {
            caseNumber: caseData.caseNumber,
            procedure: caseData.procedure,
            courtType: caseData.courtType,
            courtArea: caseData.courtArea,
            monetaryValue: caseData.monetaryValue,
            caseCreatedDate: caseData.caseCreatedDate,
            initialCaseDate: caseData.initialCaseDate,
            neededDocuments: caseData.neededDocuments,
            nature: caseData.nature,
            lawyerId: caseData.lawyerId,
            status: "complete",  // Sets status as complete
            clientId: caseData.clientId,
            stepsToBeTaken: caseData.stepsToBeTaken,
            previousDate: caseData.previousDate,
            stepsTaken: caseData.stepsTaken,
            nextCourtDate: caseData.nextCourtDate
                
            };

            axios.put(`http://localhost:8070/case/update/${caseData._id}`, updatedCase)
                .then(() => {
                    alert("Case marked as complete successfully");
                    navigate("/Lcm_PreviousCases"); // Redirect to previous cases table
                })
                .catch((err) => {
                    alert("Failed to mark case as complete: " + err.message);
                });
        }
    }

    return (
        <div>
            <LcmNavbar />
            <div className="lcm-container-update">
                <h2 className="lcm-addcase-case-title">Update Case Details</h2>
                <form onSubmit={handleSubmit}>
                <label htmlFor="lcm-addcase-case-type">Case Type</label>
                        <div className="radio-group">
                            <input 
                                type="radio" 
                                id="land" 
                                name="nature" 
                                value="land" 
                                checked={caseData.nature === "land"} 
                                onChange={handleChange}
                            />
                            <label htmlFor="land">Land</label>
                            <input 
                                type="radio" 
                                id="money-matter" 
                                name="nature" 
                                value="money-matter" 
                                checked={caseData.nature === "money-matter"} 
                                onChange={handleChange}
                            />
                            <label htmlFor="money-matter">Money Matter</label>
                            <input 
                                type="radio" 
                                id="divorce" 
                                name="nature" 
                                value="divorce" 
                                checked={caseData.nature === "divorce"} 
                                onChange={handleChange}
                            />
                            <label htmlFor="divorce">Divorce</label>
                            <input 
                                type="radio" 
                                id="name-change" 
                                name="nature" 
                                value="name-change" 
                                checked={caseData.nature === "name-change"} 
                                onChange={handleChange}
                            />
                            <label htmlFor="name-change">Name Change</label>
                        </div>

                    <div className="lcm-addcase-form-group">
                        <label htmlFor="case-number">Case Number</label>
                        <input
                            type="text"
                            id="case-number"
                            name="caseNumber"
                            placeholder="e.g. Case Number"
                            value={caseData.caseNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="lcm-addcase-form-group">
                        <label htmlFor="procedure">Procedure</label>
                        <input
                            type="text"
                            id="procedure"
                            name="procedure"
                            placeholder="e.g. Procedure (N/A, Normal)"
                            value={caseData.procedure}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="lcm-addcase-form-group">
                        <label htmlFor="court-type">Court Type</label>
                        <select
                            id="court-type"
                            name="courtType"
                            value={caseData.courtType}
                            onChange={handleChange}
                        >
                            <option value="supreme-court">Supreme Court</option>
                            <option value="high-court">High Court</option>
                            <option value="district">District</option>
                            <option value="magistrates-court">Magistrates Court</option>
                        </select>
                    </div>

                    <div className="lcm-addcase-form-group">
                        <label htmlFor="court-area">Court Area</label>
                        <input
                            type="text"
                            id="court-area"
                            name="courtArea"
                            placeholder="e.g. Court Area"
                            value={caseData.courtArea}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="lcm-addcase-form-group">
                        <label htmlFor="monetary-value">Monetary Value</label>
                        <input
                            type="number"
                            id="monetary-value"
                            name="monetaryValue"
                            placeholder="e.g. Monetary Value"
                            value={caseData.monetaryValue}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="lcm-addcase-form-group">
                        <label htmlFor="date">Case Created Date</label>
                        <input
                            type="date"
                            id="date"
                            name="caseCreatedDate"
                            value={caseData.caseCreatedDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="lcm-addcase-form-group">
                        <label htmlFor="date">Initial Case Date</label>
                        <input
                            type="date"
                            id="date"
                            name="initialCaseDate"
                            value={caseData.initialCaseDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="lcm-addcase-form-group">
                        <label htmlFor="needed-documents">Needed Documents</label>
                        <textarea
                            id="needed-documents"
                            name="neededDocuments"
                            rows="4"
                            placeholder="e.g. Police complaint"
                            value={caseData.neededDocuments}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="lcm-addcase-form-group">
                        <label htmlFor="date">Next Court Date</label>
                        <input
                            type="date"
                            id="date"
                            name="nextCourtDate"
                            value={caseData.nextCourtDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="lcm-addcase-form-group">
                        <label htmlFor="date">Previous Court Date</label>
                        <input
                            type="date"
                            id="date"
                            name="previousDate"
                            value={caseData.previousDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="lcm-addcase-form-group">
                        <label htmlFor="needed-documents">Steps To Be Taken</label>
                        <textarea
                            id="needed-documents"
                            name="stepsToBeTaken"
                            rows="4"
                            placeholder="e.g. Police complaint"
                            value={caseData.stepsToBeTaken}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="lcm-addcase-form-group">
                        <label htmlFor="needed-documents">Steps Taken</label>
                        <textarea
                            id="needed-documents"
                            name="stepsTaken"
                            rows="4"
                            placeholder="e.g. Police complaint"
                            value={caseData.stepsTaken}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="lcm-addcase-buttons">
                        <button type="submit" className="update-case-submit">Update Case</button>
                        <button
                            type="button"
                            className="update-mark-complete"
                            onClick={handleMarkAsComplete}
                        >
                            Mark as Complete
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default CaseUpdate;
