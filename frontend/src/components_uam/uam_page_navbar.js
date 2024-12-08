import React, { useState } from "react";
import List from '@mui/material/List';
import { Box, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

function UamNavbar(){

    const [openMenu, setOpenMenu] = useState(false)
    const menuOptions = [
        {
            text: "Dashboard",
            icon: <DashboardIcon/>
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
                <a className="apm-navbar-links-container-links" href="/support-agent-dashboard/SUP001">Dashboard</a>
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

export default UamNavbar;