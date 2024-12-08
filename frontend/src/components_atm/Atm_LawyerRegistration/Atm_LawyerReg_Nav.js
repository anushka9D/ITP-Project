import React from 'react';
import './Atm_LawyerReg_Nav.css';

import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BusinessIcon from '@mui/icons-material/Business';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

function Atm_LawyerReg_Nav() {
    return (
        <div>
            <nav className="ATM_top-navbar">
                <ul className="ATM_nav-list">
                    <li className="ATM_nav-item">
                        <Link to="mainHome" className="ATM_nav-link">
                            <HomeIcon />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="ATM_nav-item">
                        <Link to="/Fin_nav_Login" className="ATM_nav-link">
                            <PersonAddIcon />
                            <span>Add Attorney</span>
                        </Link>
                    </li>
                    <li className="ATM_nav-item active">
                        <Link to="/Fin_nav_Rq_form" className="ATM_nav-link">
                            <BusinessIcon />
                            <span>Law Firm Details</span>
                        </Link>
                    </li>
                    <li className="ATM_nav-item">
                        <Link to="/Fin_nav_History" className="ATM_nav-link">
                            <AssessmentIcon />
                            <span>Law Firm Reports</span>
                        </Link>
                    </li>
                    <li className="ATM_nav-item">
                        <Link to="/user_details" className="ATM_nav-link">
                            <SettingsIcon />
                            <span>Law Firm Settings</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Atm_LawyerReg_Nav;
