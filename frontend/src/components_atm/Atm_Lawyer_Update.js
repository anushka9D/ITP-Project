import React, { useEffect, useState } from 'react';
import './Atm_lawyer_Update.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Use navigate to redirect after update



function Atm_Lawyer_Update() {
    const [inputs, setInputs] = useState({
        userId: '',
        fName: '',
        lName: '',
        nic: '',
        email: '',
        phoneNumber: '',
        phoneNumber: '',
        address: '',
        userType: '',
        education: '',
    });

    const [successMessage, setSuccessMessage] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate(); // Use navigate to redirect after update

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/userRegistration/userRegistration/${id}`);
                //console.log("Fetched data:", response.data); // Log the data for debugging
                setInputs(response.data || {});
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        try {
            const response = await axios.put(`http://localhost:8070/userRegistration/update-userRegistration/${id}`, inputs);
            console.log('Update response:', response.data);
            setSuccessMessage(true);
            setTimeout(() => {
                setSuccessMessage(false);
                // Redirect to another page after successful update
                navigate(`/view-user/${id}`);
            }, 3000);
        } catch (error) {
            console.error("Error updating data", error);
        }
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest(); // Trigger the update when form is submitted
    };

    if (!inputs || Object.keys(inputs).length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="ATM_form-container">
            <h1>Update Lawyer</h1>
            {successMessage && <div className="ATM_success-message">Successfully updated!</div>}
            <form onSubmit={handleSubmit}>
                <div className="ATM_form-group">
                    <label>User ID</label>
                    <input type="text" name="userId" value={inputs.userId || ''} onChange={handleChange} />
                </div>
                <div className="ATM_form-group">
                    <label>First Name</label>
                    <input type="text" name="fName" value={inputs.fName || ''} onChange={handleChange} />
                </div>
                <div className="ATM_form-group">
                    <label>Last Name</label>
                    <input type="text" name="lName" value={inputs.lName || ''} onChange={handleChange} />
                </div>
                <div className="ATM_form-group">
                    <label>NIC</label>
                    <input type="text" name="nic" value={inputs.nic || ''} onChange={handleChange} />
                </div>
                <div className="ATM_form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={inputs.email || ''} onChange={handleChange} />
                </div>
                <div className="ATM_form-group">
                    <label>Phone Number</label>
                    <input type="text" name="phoneNumber" value={inputs.phoneNumber || ''} onChange={handleChange} />
                </div>
                <div className="ATM_form-group">
                    <label>Address</label>
                    <input type="text" name="address" value={inputs.address || ''} onChange={handleChange} />
                </div>
                <div className="ATM_form-group">
                    <label>User Type</label>
                    <input type="text" name="userType" value={inputs.userType || ''} onChange={handleChange} />
                </div>
                <div className="ATM_form-group">
                    <label>Education</label>
                    <input type="text" name="education" value={inputs.education || ''} onChange={handleChange} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default Atm_Lawyer_Update;
