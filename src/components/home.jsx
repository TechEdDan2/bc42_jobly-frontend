import { react } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import reactLogo from './../assets/react.svg'
import viteLogo from '/vite.svg'

const home = () => {
    return (
        <div>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h2>Welcome to Vite + React Jobly!</h2>
            <p>A solution for job searching and career growth.</p>
            <div>
                <Button variant="contained" color="primary" component={NavLink} to="/login" sx={{ mr: 2 }}>
                    Login
                </Button>
                <Button variant="outlined" color="primary" component={NavLink} to="/signup">
                    Sign Up
                </Button>
            </div>
        </div>
    );
}

export default home;