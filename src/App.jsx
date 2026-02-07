import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/nav-bar/NavBar.jsx'
import Home from './components/home.jsx'
import LoginForm from './components/auth/LoginForm.jsx'
import SignUpForm from './components/auth/SignUpForm.jsx'
import CompaniesList from './components/companies/CompaniesList.jsx'
import CompanyDetail from './components/companies/CompanyDetail.jsx'
import JobsList from './components/jobs/JobsList.jsx'
import JobDetail from './components/jobs/JobDetail.jsx'
import JoblyApi from './api/api.js'



function App() {
  const [user, setUser] = useState(null);

  const onLogin = async (formData) => {
    try {
      const token = await JoblyApi.login(formData); // Call API to get token
      const userData = { token }; // Construct userData object
      setUser(userData);
      localStorage.setItem("token", token);
      console.log("Login successful, token stored in localStorage");
      return true; // Indicate successful login
    } catch (err) {
      console.error("Login failed:", err);
      return false; // Indicate failed login
    }
  };

  const onSignUp = async (formData) => {
    try {
      const token = await JoblyApi.signup(formData); // Call API to get token
      const userData = { token }; // Construct userData object
      setUser(userData);
      localStorage.setItem("token", token);
      console.log("Sign-up successful, token stored in localStorage");
      return true; // Indicate successful sign-up
    } catch (err) {
      console.error("Sign-up failed:", err);
      return false; // Indicate failed sign-up
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    JoblyApi.token = null; // Clear token for API requests
  };


  return (
    <>
      <BrowserRouter>
        <NavBar isLoggedIn={!!user} handleLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm onLogin={onLogin} />} />
            <Route path="/signup" element={<SignUpForm onSignUp={onSignUp} />} />
            <Route path="/companies" element={<CompaniesList />} />
            <Route path="/companies/:company" element={<CompanyDetail />} />
            <Route path="/jobs" element={<JobsList />} />
            <Route path="/jobs/:jobId" element={<JobDetail />} />
            <Route path="/profile" element={<p>Edit Profile Page</p>} />
            <Route path="*" element={<p>Hmmm. I can't seem to find what you want.</p>} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App;
