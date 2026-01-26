import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/nav-bar/NavBar.jsx'
import Home from './components/home.jsx'
import LoginForm from './components/auth/LoginForm.jsx'
import SignUpForm from './components/auth/SignUpForm.jsx'



function App() {
  const [user, setUser] = useState(null);

  const onLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
  };

  const handleLogout = () => {
    setUser(null);
  };


  return (
    <>
      <BrowserRouter>
        <NavBar isLoggedIn={false} handleLogout={() => {
          console.log("Logout clicked")
        }} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm onLogin={onLogin} />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="*" element={<p>Hmmm. I can't seem to find what you want.</p>} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App;
