import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./ClubCard.css";

function ClubHome() {
  const { clubId } = useParams();
  const [club, setClub] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClub = async () => {
      const token = localStorage.getItem('sessionToken');
      if (token) {
        try {
          const response = await fetch(`http://localhost:8080/clubs/${clubId}/home`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setClub(data);
          } else {
            console.error('Failed to fetch club:', response.statusText);
            navigate('/login');
          }
        } catch (error) {
          console.error('Error fetching club:', error);
        }
      } else {
        navigate('/login');
      }
    };

    fetchClub();
  }, [clubId, navigate]);

  if (!club) {
    return <div>Loading...</div>;
  }

  return (
        <div className="club-container">
          {/* Imagen y detalles del club */}
          <div className="club-header">
            <img src={club.iconImageUrl} alt={`${club.name} icon`} className="club-icon" />
            <div className="club-info">
              <div className="club-title-box">
                <h1 className="club-title">{club.name}</h1>
              </div>
              <p className="club-book-label">📖 Actualmente leyendo:</p>
              <p className="club-book">{club.book ? club.book : "No book selected"}</p>
            </div>
          </div>
    
          {/* Descripción del club */}
          <p className="club-description">{club.description}</p>
    
          {/* Botón de Chat */}
          <button className="club-button chat-button">IR AL CHAT</button>
    
          {/* Lista de miembros */}
          <h2 className="club-members-title">Miembros</h2>
          <ul className="club-members-list">
            {club.members.map((member) => (
              <li key={member} className="club-member">{member}</li>
            ))}
          </ul>
    
          {/* Botón de salir */}
          <button className="club-button leave-button">SALIR DEL CLUB</button>
        </div>
  );
}

export default ClubHome;
