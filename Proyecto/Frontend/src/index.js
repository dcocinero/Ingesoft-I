import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './Login';
import Home from './Home';
import ClubHome from './ClubHome';
import Register from './Register';
import SearchClubs from './SearchClubs'; // Import the new component
import Chat from './Chat'; // Import the Chat component
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/club/:clubId/home" element={<ClubHome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search-clubs" element={<SearchClubs />} />
        <Route path="/clubs/:clubId/chat" element={<Chat />} /> {/* Add new route */}
        <Route path="/" element={<Login />} />
      </Routes>
      <footer className="footer">
        <img src="/images/logofooter.png" alt="Logo Footer" className="footer-logo" />
      </footer>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals.console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
