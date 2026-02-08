import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api.js";
import UserContext from "../helpers/UserContext.js";

const Profile = () => {
    const { user } = React.useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    console.debug("Profile component rendered", { user });

    useEffect(() => {
        const fetchUserData = async () => {
            if (user && user.username) {
                try {
                    const data = await JoblyApi.getCurrentUser(user.token, user.username);
                    setUserData(data);
                    console.debug("User data fetched successfully", data);
                } catch (err) {
                    console.error("Error fetching user data:", err);
                } finally {
                    setIsLoading(false);
                }
            } else {
                console.warn("No user or username found in context");
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    if (isLoading) {
        return <p>Loading...</p>;
    }


    return (
        <div>
            <h2>Profile Page</h2>
            {userData ? (
                <div>
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>First Name:</strong> {userData.firstName}</p>
                    <p><strong>Last Name:</strong> {userData.lastName}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>
            ) : (
                <p>User data not available.</p>
            )}

        </div>
    );
};

export default Profile;