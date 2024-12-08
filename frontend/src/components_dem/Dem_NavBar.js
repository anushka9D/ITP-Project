import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, IconButton, ListItemIcon, InputBase } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import './deed_management.css';

function DeedNavbar() {
  const [openMenu, setOpenMenu] = useState(false);

  const menuOptions = [
    { text: "Dashboard", link: "/dem_dashboard" },
    { text: "Document", link: "/document" },
    { text: "Support", link: "/support" },
    { text: "Payment", link: "/payment" },
    { text: "Client", link: "/client" },
    { text: "Appointment", link: "/apm_dashboard" },
    { text: "Profile", link: "/profile", icon: <AccountCircle /> },
    { text: "Logout", link: "/logout" }
  ];

  const renderMenuOptions = () => (
    menuOptions.map((item) => (
      <ListItem key={item.text} disablePadding>
        <ListItemButton component={Link} to={item.link}>
          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          <ListItemText primary={item.text} />
        </ListItemButton>
      </ListItem>
    ))
  );

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <nav className="dem-home-navBar">
        <div className="dem-logo-container">
          <Link to="/home" aria-label="Go to homepage"><p>AMS</p></Link>
        </div>

        <div className="navbar-links-container">
          <Link className="navbar-links-container-links" to="/dem_dashboard/DEM003" aria-label="Go to Deed Dashboard"> Dashboard</Link>
          <Link className="navbar-links-container-links" to="/document" aria-label="Go to Document">Document</Link>
          <Link className="navbar-links-container-links" to="/support" aria-label="Go to Support">Support</Link>
          <Link className="navbar-links-container-links" to="/payment" aria-label="Go to Payment">Payment</Link>
          <Link className="navbar-links-container-links" to="/client" aria-label="Go to Client">Client</Link>
          <Link className="navbar-links-container-links" to="/apm_dashboard" aria-label="Go to Appointment">Appointment</Link>
          <IconButton component={Link} to="/profile" aria-label="Go to Profile" color="inherit">
            <AccountCircle />
          </IconButton>
          <Link className="navbar-primary-button" to="/logout" aria-label="Log out">Logout</Link>
        </div>

        <div className="navbar-menu-container">
          <IconButton
            aria-label="Open menu"
            onClick={() => setOpenMenu(true)}
            edge="end"
          >
            <MenuIcon />
          </IconButton>
        </div>

        <Drawer
          open={openMenu}
          onClose={() => setOpenMenu(false)}
          anchor="right"
          aria-labelledby="menu-drawer"
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setOpenMenu(false)}
            onKeyDown={() => setOpenMenu(false)}
          >
            <List>
              {renderMenuOptions()}
            </List>
          </Box>
        </Drawer>
      </nav>

      {/* Sub-navbar */}
      <div className="subnav-container">
        
        <div className="search-container">
          <InputBase
            placeholder="Search deeds..."
            inputProps={{ 'aria-label': 'search' }}
            className="subnav-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown} 
          />
          <SearchIcon className="search-icon" onClick={handleSearch} />
        </div>
        <div className="link-container">
        <Link to="/add_deed" className="subnav-link" aria-label="Add Deed">Add Deed</Link>
        <Link to="/read_all_deeds" className="subnav-link" aria-label="View Recent Deeds">View Recent</Link>
        </div>
      </div>
    </>
  );
}

export default DeedNavbar;
