import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'; // Reutilizamos los estilos de HomePage
import '../styles/MyClubsPage.css';
import { 
  FaBook, 
  FaChevronLeft, 
  FaChevronRight, 
  FaUser, 
  FaSearch,
  FaBell,
  FaBookmark,
  FaUsers,
  FaCalendarAlt
} from 'react-icons/fa';

function MyClubsPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [userClubs, setUserClubs] = useState([]);
  const clubsPerPage = 4; // Mostramos 4 clubes por página (en lugar de 3)

  // Función para navegar a la página del club
  const navigateToClub = (clubId) => {
    navigate(`/clubs/${clubId}`);
  };

  // Efecto para obtener los datos de los clubes
  useEffect(() => {
    const token = localStorage.getItem('sessionToken'); // Obtener el token del almacenamiento local
    fetch('http://localhost:8080/home/myclubs', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUserClubs(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching clubs:', error);
        navigate('/login');
      });
  }, [navigate]);

  // Efecto para mostrar una notificación después de cargar
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowNotification(true);
        
        // Ocultar después de 5 segundos
        const hideTimer = setTimeout(() => {
          setShowNotification(false);
        }, 5000);
        
        return () => clearTimeout(hideTimer);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  // Funciones para navegar entre páginas
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función para generar los números de página
  const pageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`page-number ${currentPage === i ? 'active' : ''}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  // Obtener el usuario conectado del almacenamiento local
  const userName = localStorage.getItem('username');

  // Filtrar los clubes si fuera necesario (aquí usamos todos)
  const filteredClubs = userClubs;
    
  // Recalcular paginación
  const totalPages = Math.ceil(filteredClubs.length / clubsPerPage);
  const indexOfLastClub = currentPage * clubsPerPage;
  const indexOfFirstClub = indexOfLastClub - clubsPerPage;
  const currentClubs = filteredClubs.slice(indexOfFirstClub, indexOfLastClub);

  // Calculamos cuántos clubes poner por fila (2 filas de 2 clubes cada una)
  const clubsPerRow = 2;

  return (
    <div className="home-container">
      {/* Partículas animadas */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      {isLoading && (
        <div className="loading-overlay">
          <div className="loader">
            <FaBook className="loader-icon" />
            <span>Cargando...</span>
          </div>
        </div>
      )}
      
      {showNotification && (
        <div className="notification-toast">
          <FaBell className="notification-icon" />
          <span>¡Bienvenido a tus clubes de lectura! Tienes {userClubs.length} clubes activos.</span>
          <button 
            className="close-notification" 
            onClick={() => setShowNotification(false)}
          >
            &times;
          </button>
        </div>
      )}
      
      <header className="home-header">
        <div className="header-content">
          <div className="logo-container">
            <FaBook className="logo-icon animated-icon" />
            <h1>BookHunt</h1>
          </div>
          <nav className="main-nav">
            <ul>
              <li><button type="button" className="nav-button" onClick={() => navigate('/home')}>Inicio</button></li>
              <li><button type="button" className="nav-button active">Mis Clubes</button></li>
            </ul>
          </nav>
          <div className="user-profile">
            <FaUser className="user-icon" />
            <span className="username">{userName}</span>
          </div>
        </div>
      </header>
      
      <main className="home-main">
        <section className="book-clubs animate-section">
          <div className="section-header">
            <div className="section-title">
              <FaUsers className="section-icon" />
              <h3>Mis Clubes de Lectura</h3>
            </div>
            <div className="view-options">
              <span className="page-indicator">{currentPage} de {totalPages} páginas</span>
            </div>
          </div>
          
          {filteredClubs.length === 0 ? (
            <div className="no-results">
              <FaSearch className="no-results-icon" />
              <h4>No perteneces a ningún club todavía</h4>
              <p>Explora los clubes disponibles y únete a alguno para comenzar</p>
              <button 
                className="reset-search"
                onClick={() => navigate('/')}
              >
                Explorar Clubes
              </button>
            </div>
          ) : (
            <div className="book-clubs-grid my-clubs-grid">
              {currentClubs.map((club, index) => (
                <div 
                  className="club-card my-club-card" 
                  key={club.id}
                  style={{animationDelay: `${index * 0.15}s`}}
                  onClick={() => navigateToClub(club.id)}
                >
                  <div className="club-header">
                    <div className="club-icon">
                      <img src={club.iconImageUrl || "https://via.placeholder.com/80"} alt={club.name} />
                    </div>
                  </div>
                  <div className="club-details">
                    <h4>{club.name}</h4>
                    <p className="club-description">{club.description}</p>
                    <div className="club-current-book">
                      <span className="book-label">Libro actual:</span>
                      <span className="book-title">{club.book}</span>
                    </div>
                    <div className="club-progress">
                      <span className="progress-label">Tu progreso de lectura:</span>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{width: `${club.progress}%`}}
                        ></div>
                      </div>
                      <span className="progress-percentage">{club.progress}%</span>
                    </div>
                    <div className="next-meeting">
                      <FaCalendarAlt className="meeting-icon" />
                      <span>Próxima reunión: {club.nextMeeting}</span>
                    </div>
                  </div>
                  <button 
                    className="join-button"
                    onClick={(e) => {
                      e.stopPropagation(); // Evita que el clic se propague a la tarjeta
                      navigateToClub(club.id);
                    }}
                  >
                    <span>Ir al club</span>
                    <span className="join-icon">→</span>
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div className="pagination-controls">
            <button 
              className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`} 
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <FaChevronLeft /> Anterior
            </button>
            <div className="page-numbers">
              {pageNumbers()}
            </div>
            <button 
              className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`} 
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Siguiente <FaChevronRight />
            </button>
          </div>
        </section>
      </main>
      
      <footer className="home-footer">
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

export default MyClubsPage;
