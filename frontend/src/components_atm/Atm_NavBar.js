import React from 'react';
import './Atm_attorney_management.css';
import DescriptionIcon from '@mui/icons-material/Description'; // Icon for Document
import BusinessIcon from '@mui/icons-material/Business'; // Icon for Firm
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; // Icon for Support
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icon for Profile
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Icon for Logout
import { Link } from 'react-router-dom';

function Apm_NavBar() {
  return (
    <div>
      <nav className="ATM_top-navbar">
        <ul className="ATM_nav-list">
          <div className="ATM_left-nav">
            <li className="ATM_nav-item">
              <Link to="/add-lawfrim" className="ATM_nav-link">
                <BusinessIcon />
                <span>Firm</span>
              </Link>
            </li>

            <li className="ATM_nav-item">
              <Link to="/Atm_LawFirm_Details_Dipsply" className="ATM_nav-link">
                <DescriptionIcon />
                <span>Frim Details</span>
              </Link>
            </li>
          </div>

          <div className="ATM_right-nav">
            <li className="ATM_nav-item">
              <Link to="/profile" className="ATM_nav-link">
                <AccountCircleIcon />
              </Link>
            </li>
            <li className="ATM_nav-item">
              <Link to="/logout" className="ATM_nav-link">
                <ExitToAppIcon />
                <span>Logout</span>
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Apm_NavBar;
