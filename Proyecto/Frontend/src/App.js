import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home';
import IndexPage from './pages/index';
import SearchPage from './pages/search';
import ClubHomePage from './pages/clubhome';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import SearchClubsPage from './pages/searchclubs';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App-content">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/clubhome" element={<ClubHomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/searchclubs" element={<SearchClubsPage />} />
          </Routes>
        </div>
        <footer className="footer">
          <img src="/images/logofooter.png" alt="Logo Footer" className="footer-logo" />
        </footer>
      </Router>
    </div>
  );
}

export default App;
