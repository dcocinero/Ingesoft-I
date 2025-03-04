import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const HomePage = () => {
  const navigate = useNavigate();

  const clubs = [
    { id: 1, name: 'Club de Lectura Clásico' },
    { id: 2, name: 'Club de Ciencia Ficción' },
    { id: 3, name: 'Club de Misterio' },
    { id: 4, name: 'Club de Fantasía' },
    { id: 5, name: 'Club de Historia' },
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Home Page</h1>
      <h2 className="home-subtitle">Reading Clubs</h2>
      <ul className="club-list">
        {clubs.map((club) => (
          <li key={club.id} className="club-item">
            <span className="club-name">{club.name}</span>
            <button className="club-button" onClick={() => navigate(`/club/${club.id}/home`)}>Go to Club Home</button>
          </li>
        ))}
      </ul>
      <button className="search-button" onClick={() => navigate('/searchclubs')}>Busqueda de nuevos clubs</button>
    </div>
  );
};

export default HomePage;
