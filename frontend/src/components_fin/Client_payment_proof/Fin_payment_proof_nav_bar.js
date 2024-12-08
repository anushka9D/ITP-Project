import React from 'react';
import '../Client_payment_proof/FinNavBar_proofs.css';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import SummarizeIcon from '@mui/icons-material/Summarize';
import HistoryIcon from '@mui/icons-material/History';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { Link } from 'react-router-dom';

function Fin_payment_RQ_navBar() {
  return (
    <div>
      <nav className="FIN-top-navbar">
        <ul className="FIN-nav-list">
          <li className="FIN-nav-item">
            <Link to="mainHome" className="FIN-nav-link">
              <HomeIcon />
              <span>Home</span>
            </Link>
          </li>
          <li className="FIN-nav-item">
            <Link to="/Fin_nav_Login" className="FIN-nav-link">
              <MenuIcon />
              <span>Menu</span>
            </Link>
          </li>
          <li className="FIN-nav-item active">
            <Link to="/Fin_nav_Rq_form" className="FIN-nav-link">
              <SummarizeIcon />
              <span>Payment Request Form</span>
            </Link>
          </li>
          <li className="FIN-nav-item">
            <Link to="/Fin_nav_History" className="FIN-nav-link">
              <HistoryIcon />
              <span>History</span>
            </Link>
          </li>
          <li className="FIN-nav-item">
            <Link to="/user_details" className="FIN-nav-link">
              <ManageAccountsIcon />
              <span>User Details</span>
            </Link>
          </li>
          <li className="FIN-nav-item">
            <Link to="/payment_proofs_list" className="FIN-nav-link">
              <PriceCheckIcon />
              <span>Clients Uploaded Payment Proofs</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Fin_payment_RQ_navBar;