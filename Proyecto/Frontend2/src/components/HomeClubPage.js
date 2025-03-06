import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/HomeClubPage.css';
import { 
  FaBook, 
  FaUser, 
  FaArrowLeft,
  FaBell,
  FaUsers,
  FaComments,
  FaSignOutAlt,
  FaCalendarAlt
} from 'react-icons/fa';

function HomeClubPage() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchClubData = async () => {
      const token = localStorage.getItem('sessionToken');
      try {
        const response = await fetch(`http://localhost:8080/clubs/${clubId}/home`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 404) {
          //nothing
        } else if (response.status === 403) {
          navigate('/myclubs');
        } else if (response.ok) {
          const data = await response.json();
          setClub(data);
        } else {
          console.error('Error fetching club data:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubData();
  }, [clubId, navigate]);

  // Efecto para mostrar notificación de bienvenida
  useEffect(() => {
    if (!isLoading && club) {
      const timer = setTimeout(() => {
        setShowNotification(true);
        
        // Ocultar después de 5 segundos
        const hideTimer = setTimeout(() => {
          setShowNotification(false);
        }, 5000);
        
        return () => clearTimeout(hideTimer);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, club]);

  // Función para volver a la página principal
  const goBack = () => {
    navigate('/myclubs');
  };

  // Función para ir al chat del club
  const goToChat = () => {
    navigate(`/clubs/${clubId}/chat`);
  };

  // Función para salir del club
  const leaveClub = async () => {
    const token = localStorage.getItem('sessionToken');
    try {
      const response = await fetch(`http://localhost:8080/clubs/${clubId}/remove`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log(`Saliendo del club ${clubId}`);
        navigate('/myclubs');
      } else {
        console.error('Error al salir del club:', response.statusText);
      }
    } catch (error) {
      console.error('Error durante la solicitud de salida:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loader">
          <FaBook className="loader-icon" />
          <span>Cargando...</span>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="error-container">
        <h2>Lo sentimos</h2>
        <p>No se pudo encontrar el club solicitado.</p>
        <button className="back-button" onClick={goBack}>
          <FaArrowLeft /> Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="club-page-container">
      {/* Partículas animadas */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      {showNotification && (
        <div className="notification-toast">
          <FaBell className="notification-icon" />
          <span>¡Bienvenido al club: {club.name}!</span>
          <button 
            className="close-notification" 
            onClick={() => setShowNotification(false)}
          >
            &times;
          </button>
        </div>
      )}
      
      <header className="club-page-header">
        <div className="header-content">
          <button className="back-button" onClick={goBack}>
            <FaArrowLeft /> Volver
          </button>
          <div className="logo-container">
            <FaBook className="logo-icon animated-icon" />
            <h1>BookHunt</h1>
          </div>
          <div className="user-profile">
            <FaUser className="user-icon" />
            <span className="username">{localStorage.getItem('username')}</span>
          </div>
        </div>
      </header>
      
      <main className="club-page-main">
        <div className="club-header">
          <div className="club-icon-container">
            <img src={club.iconImageUrl} alt={`${club.name} icon`} className="club-icon-large" />
          </div>
          <div className="club-info">
            <h2 className="club-name">{club.name}</h2>
            <div className="club-reading">
              <span className="reading-label">📖 Actualmente leyendo:</span>
              <span className="book-title">{club.book}</span>
            </div>
            <div className="club-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{width: `${club.progress || 0}%`}}
                ></div>
              </div>
              <span className="progress-text">{club.progress || 0}% completado</span>
            </div>
          </div>
        </div>
        
        <section className="club-description-section">
          <h3 className="section-title">Acerca del club</h3>
          <p className="club-description">{club.description}</p>
        </section>
        
        <div className="club-content-grid">
          <section className="club-meetings-section">
            <div className="section-header">
              <FaCalendarAlt className="section-icon" />
              <h3 className="section-title">Próximas reuniones</h3>
            </div>
            {club.meetings && club.meetings.length > 0 ? (
              <ul className="meetings-list">
                {club.meetings.map((meeting, index) => (
                  <li key={index} className="meeting-item">
                    <div className="meeting-date">{meeting.date}</div>
                    <div className="meeting-details">
                      <div className="meeting-time">{meeting.time}</div>
                      <div className="meeting-topic">{meeting.topic}</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-meetings">No hay reuniones programadas</p>
            )}
          </section>
          
          <section className="club-members-section">
            <div className="section-header">
              <FaUsers className="section-icon" />
              <h3 className="section-title">Miembros ({club.members ? club.members.length : 0})</h3>
            </div>
            <ul className="members-list">
              {club.members && club.members.map((member, index) => (
                <li key={index} className="member-item">
                  <FaUser className="member-icon" />
                  <span className="member-name">{member}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
        
        <div className="club-actions">
          <button className="action-button chat-button" onClick={goToChat}>
            <FaComments className="button-icon" />
            <span>Ir al chat</span>
          </button>
          <button className="action-button leave-button" onClick={leaveClub}>
            <FaSignOutAlt className="button-icon" />
            <span>Salir del club</span>
          </button>
        </div>
      </main>
      
      <footer className="club-page-footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <FaBook className="footer-icon" />
              <h4>BookHunt - Tu portal de clubes de lectura</h4>
            </div>
            <p>Conéctate con otros amantes de la lectura y descubre títulos fascinantes</p>
          </div>
          <div className="footer-nav">
            <button className="footer-link">Acerca de</button>
            <button className="footer-link">Términos</button>
            <button className="footer-link">Privacidad</button>
            <button className="footer-link">Contacto</button>
          </div>
          <div className="copyright">
            &copy; {new Date().getFullYear()} BookHunt. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomeClubPage;