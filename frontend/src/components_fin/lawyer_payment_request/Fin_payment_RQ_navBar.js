import React from 'react';
import '../lawyer_payment_request/FinNavBar.css';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import { Link } from 'react-router-dom';

function Fin_payment_RQ_navBar() {
  // Assume you have the clientId variable available.
  // You can get this from context, state, or props as necessary.
  const clientId = 'CLI002'; // Replace with the actual client ID or retrieve dynamically

  return (
    <div className="FIN-payment-navbar-container">
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
            <Link to="/payment_proofs_form" className="FIN-nav-link">
              <FormatAlignCenterIcon />
              <span>Clients Payment Proofs Form</span>
            </Link>
          </li>
          <li className="FIN-nav-item">
            {/* Link to the client-specific dashboard */}
            <Link to={`/client-fin-display/${clientId}`} className="FIN-nav-link">
              <FormatAlignCenterIcon />
              <span>Clients Dashboard</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Fin_payment_RQ_navBar;