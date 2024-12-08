import React from 'react';
import './Atm_LawFrim_Nav.css';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BusinessIcon from '@mui/icons-material/Business';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

function Atm_LawFrim_Nav() {
  return (
    <div className=".ATM_body">
      <nav className="ATM_top-navbar">
        <ul className="ATM_nav-list">
          <li className="ATM_nav-item">
            <Link to="mainHome" className="ATM_nav-link">
              <HomeIcon />
              <span>Home</span>
            </Link>
          </li>
          <li className="ATM_nav-item">
            <Link to="/Atm_LawyerRegistration" className="ATM_nav-link">
              <PersonAddIcon />
              <span>Add Attorney</span>
            </Link>
          </li>
          <li className="ATM_nav-item ATM_active">
            <Link to="/Atm_LawFirm_Details_Dipsply" className="ATM_nav-link">
              <BusinessIcon />
              <span>Law Firm Details</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Atm_LawFrim_Nav;