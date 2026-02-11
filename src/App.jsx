import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import './App.css'
import NavBar from './components/nav-bar/NavBar.jsx'
import Home from './components/home.jsx'
import LoginForm from './components/auth/LoginForm.jsx'
import SignUpForm from './components/auth/SignUpForm.jsx'
import CompaniesList from './components/companies/CompaniesList.jsx'
import CompanyDetail from './components/companies/CompanyDetail.jsx'
import JobsList from './components/jobs/JobsList.jsx'
import JobDetail from './components/jobs/JobDetail.jsx'
import Profile from './components/profile.jsx'
import JoblyApi from './api/api.js'
import useLocal from "./hooks/useLocal";
import UserContext from "./helpers/UserContext.js";
import ProfileForm from './components/user/ProfileForm.jsx';

function App() {
  const [user, setUser] = useLocal("user", null); // Persist user in local memory
  const [token, setToken] = useLocal("token", null);
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const onLogin = async (formData) => {
    try {
      const token = await JoblyApi.login(formData); // Call API to get token
      const userData = { token, username: formData.username }; // Include username in userData
      setUser(userData); // Persist user data in local memory
      setToken(token); // Persist token in local memory
      console.log("Login successful, user and token stored in localStorage", userData);
      return true; // Indicate successful login
    } catch (err) {
      console.error("Login failed:", err);
      return false; // Indicate failed login
    }
  };

  const onSignUp = async (formData) => {
    try {
      const token = await JoblyApi.signup(formData); // Call API to get token
      const userData = { token, username: formData.username }; // Include username in userData
      setUser(userData); // Persist user data in local memory
      setToken(token); // Persist token in local memory
      console.log("Sign-up successful, user and token stored in localStorage", userData);
      return true; // Indicate successful sign-up
    } catch (err) {
      console.error("Sign-up failed:", err);
      return false; // Indicate failed sign-up
    }
  };

  const handleLogout = () => {
    setUser(null); // Clear user from local memory
    setToken(null); // Clear token from local memory
    JoblyApi.token = null; // Clear token for API requests
    console.log("User logged out, user and token removed from localStorage");
  };


  return (
    <UserContext.Provider value={{ user, setUser, token, onLogin, welcomeMessage, onSignUp, handleLogout }}>
      <BrowserRouter>
        <NavBar isLoggedIn={!!user} handleLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/companies" element={<CompaniesList />} />
            <Route path="/companies/:company" element={<CompanyDetail />} />
            <Route path="/jobs" element={<JobsList />} />
            <Route path="/jobs/:jobId" element={<JobDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileForm />} />
            <Route path="*" element={<p>Hmmm. I can't seem to find what you want.</p>} />
          </Routes>
        </main>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
