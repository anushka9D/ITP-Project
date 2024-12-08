import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./Dem_NavBar.js";
import Footer from "./Dem_Footer.js";
import './deed_add.css';
export default function AddDeed() {
    const [formData, setFormData] = useState({
        assignedLawyer: "",
        deedType: "",
        preRegisteredNo: "",
        title: "",
        district: "",
        division: "",
        considerationValue: "",
        grantorNic: "",
        granteeNic: "",
        deedStatus: "Created"
    });
    const [loading, setLoading] = useState(false);
    const [lawyers, setLawyers] = useState([]);
    const [districts] = useState([
        "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", 
        "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", 
        "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", 
        "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", 
        "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
    ]);
    
    useEffect(() => {
        const fetchLawyers = async () => {
            try {
                const response = await axios.get("http://localhost:8070/deedmanager/view-all-deed-managers");
                setLawyers(response.data);
            } catch (err) {
                console.error("Error fetching lawyers:", err);
                window.alert("Error fetching lawyers: " + (err.response?.data?.message || err.message));
            }
        };
    
        fetchLawyers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateInputs = () => {
        const { grantorNic, granteeNic, preRegisteredNo, considerationValue } = formData;

        // NIC validation
        const nicPattern = /^(?:\d{12}|\d{9}[V])$/;
        if (!nicPattern.test(grantorNic)) {
            window.alert("Grantor NIC must be 12 digits or 9 digits followed by 'V'.");
            return false;
        }
        if (!nicPattern.test(granteeNic)) {
            window.alert("Grantee NIC must be 12 digits or 9 digits followed by 'V'.");
            return false;
        }

        // Pre-registered number validation
        const preRegPattern = /^[A-Za-z]\d{5}$/;
        if (!preRegPattern.test(preRegisteredNo)) {
            window.alert("Pre-registered number must start with a letter and followed by 5 digits.");
            return false;
        }

        // Consideration value validation
        if (considerationValue <= 0) {
            window.alert("Consideration Value must be a positive number.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate inputs
        if (!validateInputs()) {
            setLoading(false);
            return;
        }

        try {
            const selectedLawyer = lawyers.find(lawyer => lawyer._id === formData.assignedLawyer);

            if (!selectedLawyer) {
                window.alert("Selected lawyer not found.");
                setLoading(false);
                return;
            }

            
            const response = await axios.post("http://localhost:8070/deeds/add", formData);
            window.alert(response.data.message); 
            
            
            setFormData({
                assignedLawyer: "",
                deedType: "",
                preRegisteredNo: "",
                title: "",
                district: "",
                division: "",
                considerationValue: "",
                grantorNic: "",
                granteeNic: "",
                deedStatus: "Created"
            });
        } catch (err) {
            
            
            window.alert("Error: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <NavBar />
            <br />
        <div className="dem_add">
            <div className="dem_form_container">
                <h2 class="dem-form-main-heading">Add a New Deed</h2>
                <form onSubmit={handleSubmit}>
                    {/* Assigned Lawyer */}
                    <label htmlFor="assignedLawyer">Assigned Lawyer:</label>
                    <select 
                        id="assignedLawyer" 
                        name="assignedLawyer" 
                        value={formData.assignedLawyer} 
                        onChange={handleInputChange} 
                        required
                    >
                        <option value="" disabled>Select a lawyer</option>
                        {lawyers.map(lawyer => (
                            <option key={lawyer._id} value={lawyer._id}>
                                {lawyer.fName} {lawyer.lName}
                            </option>
                        ))}
                    </select><br /><br />

                    {/* Deed Type */}
                    <label htmlFor="deedType">Deed Type:</label>
                    <select 
                        id="deedType" 
                        name="deedType" 
                        placeholder="Nature of the deed"
                        value={formData.deedType} 
                        onChange={handleInputChange} 
                        required
                    >
                        <option value="" disabled>Select a deed type</option>
                        <option value="Deed of Transfer (Sale Deed)">Deed of Transfer (Sale Deed)</option>
                        <option value="Deed of Gift">Deed of Gift</option>
                        <option value="Deed of Lease">Deed of Lease</option>
                        <option value="Deed of Mortgage">Deed of Mortgage</option>
                        <option value="Power of Attorney (POA)">Power of Attorney (POA)</option>
                        <option value="Deed of Partition">Deed of Partition</option>
                        <option value="Deed of Agreement">Deed of Agreement</option>
                        <option value="Deed of Declaration">Deed of Declaration</option>
                        <option value="Deed of Exchange">Deed of Exchange</option>
                    </select><br /><br />

                    {/* Pre-Registered Number */}
                    <label htmlFor="preRegisteredNo">Pre-Registered No:</label>
                    <input 
                        type="text" 
                        id="preRegisteredNo" 
                        name="preRegisteredNo" 
                        placeholder="[Starts with a letter and followed by 5 numbers]"
                        value={formData.preRegisteredNo} 
                        onChange={handleInputChange} 
                        required
                    /><br /><br />

                    {/* Title */}
                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleInputChange} 
                        placeholder="Name of the property"
                        required 
                    /><br /><br />

                    {/* District */}
                    <label htmlFor="district">District:</label>
                    <select 
                        id="district" 
                        name="district" 
                        value={formData.district} 
                        placeholder="District of the property"
                        onChange={handleInputChange} 
                        required
                    >
                        <option value="" disabled>Select a district</option>
                        {districts.map(district => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select><br /><br />

                    {/* Division */}
                    <label htmlFor="division">Division:</label>
                    <input 
                        type="text" 
                        id="division" 
                        name="division" 
                        placeholder="Division of the property"
                        value={formData.division} 
                        onChange={handleInputChange} 
                        required 
                    /><br /><br />

                    {/* Consideration Value */}
                    <label htmlFor="considerationValue">Consideration Value:</label>
                    <input 
                        type="number" 
                        id="considerationValue" 
                        name="considerationValue"
                        placeholder="Value of the property" 
                        value={formData.considerationValue} 
                        onChange={handleInputChange} 
                        step="0.01" 
                        required 
                    /><br /><br />

                    {/* Grantor NIC */}
                    <label htmlFor="grantorNic">Grantor NIC:</label>
                    <input 
                        type="text" 
                        id="grantorNic" 
                        name="grantorNic" 
                        placeholder="Enter NIC"
                        value={formData.grantorNic} 
                        onChange={handleInputChange} 
                        required 
                    /><br /><br />

                    {/* Grantee NIC */}
                    <label htmlFor="granteeNic">Grantee NIC:</label>
                    <input 
                        type="text" 
                        id="granteeNic" 
                        name="granteeNic" 
                        placeholder="Enter NIC"
                        value={formData.granteeNic} 
                        onChange={handleInputChange} 
                        required 
                    /><br /><br />

                    {/* Submit Button */}
                    <button type="submit" disabled={loading}>
                        {loading ? "Adding Deed..." : "Add Deed"}
                    </button>
                </form>
            </div>
        </div>
        <Footer/>
        </div>
    );
}
