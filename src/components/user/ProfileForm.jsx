import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../../api/api.js";
import UserContext from "../../helpers/UserContext.js";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const ProfileForm = () => {
    const { user } = React.useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (user && user.username) {
                try {
                    const data = await JoblyApi.getCurrentUser(user.token, user.username);
                    setUserData(data);
                    setFormData({
                        firstName: data.firstName || "",
                        lastName: data.lastName || "",
                        email: data.email || "",
                    });
                } catch (err) {
                    console.error("Error fetching user data:", err);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setFormErrors([]);
        setSuccessMessage("");

        try {
            const updatedUser = await JoblyApi.updateUser(user.username, formData);
            setUserData(updatedUser);
            setSuccessMessage("Profile updated successfully!");
        } catch (err) {
            console.error("Error updating profile:", err);
            setFormErrors(err);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Edit Profile</h2>
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
                    backgroundColor: "#ffffff",
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Edit Your Profile
                </Typography>
                <TextField
                    label="Username"
                    name="username"
                    value={userData.username}
                    fullWidth
                    disabled
                />
                <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                />
                {formErrors.length > 0 && (
                    <div>
                        <Typography color="error">Errors:</Typography>
                        <ul>
                            {formErrors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {successMessage && (
                    <Typography color="success.main">{successMessage}</Typography>
                )}
                <Button type="submit" variant="contained" color="primary">
                    Save Changes
                </Button>
            </Box>
        </div>
    );
};

export default ProfileForm;