import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import JoblyApi from "../../api/api"; // Import API class


/** 
 * SignUp form component
 * Allows user to sign up for an account
 * Uses onSignUp prop to call parent function on successful sign up
 */
const SignUpForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });

    const onSignUp = async (data) => {
        try {
            const token = await JoblyApi.signup(data); // Call backend API
            localStorage.setItem("token", token); // Store token in localStorage
            console.log("Sign-up successful, token stored in localStorage");
            return true; // Indicate successful sign-up
        } catch (err) {
            console.error("Sign-up failed:", err);
            alert("Sign-up failed: " + err[0]); // Display error message
            return false; // Indicate failed sign-up
        }
    };

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const success = await onSignUp(formData);
        if (success) {
            navigate("/");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 400,
                margin: "0 auto",
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#ffffff" // Set a white background for the form
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Sign Up
            </Typography>
            <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                sx={{
                    "& .MuiInputLabel-root": { color: "#000" }, // Label color
                    "& .MuiInputBase-input": { color: "#000" }  // Input text color
                }}
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{
                    "& .MuiInputLabel-root": { color: "#000" },
                    "& .MuiInputBase-input": { color: "#000" }
                }}
            />
            <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                sx={{
                    "& .MuiInputLabel-root": { color: "#000" },
                    "& .MuiInputBase-input": { color: "#000" }
                }}
            />
            <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                sx={{
                    "& .MuiInputLabel-root": { color: "#000" },
                    "& .MuiInputBase-input": { color: "#000" }
                }}
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{
                    "& .MuiInputLabel-root": { color: "#000" },
                    "& .MuiInputBase-input": { color: "#000" }
                }}
            />
            <Button type="submit" variant="contained" color="primary">
                Sign Up
            </Button>
        </Box>
    );
};

export default SignUpForm;