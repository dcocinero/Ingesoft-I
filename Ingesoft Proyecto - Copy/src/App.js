import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import RegisterPage from './components/RegisterPage';
import HomeClubPage from './components/HomeClubPage';
import MyClubsPage from './components/MyClubsPage';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/clubs/:clubId" element={<HomeClubPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/myClubs" element={<MyClubsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
