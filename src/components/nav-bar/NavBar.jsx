import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';

const NavBar = ({ isLoggedIn, handleLogout }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={NavLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
                    Jobly
                </Typography>

                <button><NavLink to="/companies" style={{ textDecoration: 'none', color: 'inherit' }}>Companies</NavLink></button>

                <button><NavLink to="/jobs" style={{ textDecoration: 'none', color: 'inherit' }}>Jobs</NavLink></button>

                {isLoggedIn ? (
                    <>
                        <Button color="inherit" component={NavLink} to="/profile">
                            Profile
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={NavLink} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={NavLink} to="/signup">
                            Sign Up
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;