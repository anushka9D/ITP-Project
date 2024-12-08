import './login.css';

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components_home/Home_Footer';
import HomeNavbar from '../components_home/Home_NavBar';

const LegalCaseManagerLogin = () => {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8070/legalcasemanager/login', { userId, password });
            if (response.status === 200) {
                // Store the user ID, NIC, and clientName in localStorage
                localStorage.setItem('userId', response.data.legalCaseManager.userId);
                localStorage.setItem('userName', response.data.legalCaseManager.fName);
                localStorage.setItem('userNic', response.data.legalCaseManager.nic);

                // Redirect to ClientPortalHome with the user's ID
                navigate(`/Lcm_Dashboard/${response.data.legalCaseManager.userId}`);
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };
    

    return (
       <div className="login-container">

        <HomeNavbar />
        <hr/>
            <div class="homeNavbar" />
            <div className="login-form-container">
                <h2 className="login-form-head-text">Login Legal Case manager</h2>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="un" className="form-label">User Name :</label>
                        <input 
                            type="text" 
                            id="un"
                            className="form-input" 
                            value={userId} 
                            onChange={(e) => setUserId(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input 
                            type="password" 
                            id="password"
                            className="form-input" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default LegalCaseManagerLogin;