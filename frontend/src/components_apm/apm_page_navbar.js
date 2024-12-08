import React, { useState } from "react";
import List from '@mui/material/List';
import { Box, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MenuIcon from '@mui/icons-material/Menu';

function ApmNavbar(){

    const [openMenu, setOpenMenu] = useState(false)
    const menuOptions = [
        {
            text: "Dashboard",
            icon: <DashboardIcon/>
        },

        {
            text: "View All Appointment",
            icon: <CalendarMonthIcon/>
        },  

        {
            text: "Support Ticket",
            icon: <SupportAgentIcon/>
        }, 

        {
            text: "Logout",
            icon: <LogoutIcon/>
        }
    ] 

    return(
        <nav className="apm-navBar">
            <div className="apm-logo-container">
                <p>AMS</p>
            </div>

            <div className="apm-navbar-links-container">
                <a className="apm-navbar-links-container-links" href="/appointment-manager-dashboard">Dashboard</a>
                <a className="apm-navbar-links-container-links" href="/user-support-dashboard/user456">Support Ticket</a>
                <a className="apm-navbar-primary-button" href="/login">Logout</a>
            </div>

            <div className="apm-navbar-menu-container">
                <MenuIcon onClick = {() => setOpenMenu(true)}/>
            </div>

            <Drawer open={openMenu} onClose={()=> setOpenMenu(false)}
            anchor="right">
                <Box sx={{ width: 250 }}
                    role= "presentation"
                    onClick={() => setOpenMenu(false)}
                    onKeyDown={() => setOpenMenu(false)}
                >
                    <List>
                        {menuOptions.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </nav>
    )
}

export default ApmNavbar;