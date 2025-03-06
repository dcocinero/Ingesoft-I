import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importación de useNavigate
import '../styles/HomePage.css';
import { 
  FaBook, 
  FaChevronLeft, 
  FaChevronRight, 
  FaUser, 
  FaSearch,
  FaBell,
  FaBookmark,
} from 'react-icons/fa';

function HomePage() {
  const navigate = useNavigate(); // Hook para la navegación
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [clubs, setClubs] = useState([]);
  const clubsPerPage = 3;

  // Función para navegar a la página del club
  const navigateToClub = (clubId) => {
    navigate(`/clubs/${clubId}`);
  };

  // Nuevo efecto para cargar datos de clubes
  useEffect(() => {
    const fetchClubs = async () => {
      const token = localStorage.getItem('sessionToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/home/list', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setClubs(data || []); // Asegúrate de que los datos se asignen correctamente
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching clubs:', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubs();
  }, [navigate]);

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

  // Obtener el usuario del localStorage
  const userName = localStorage.getItem('username') || "Usuario Correcto";

  // Ya no filtramos clubes por búsqueda, simplemente usamos todos los clubes
  const filteredClubs = clubs;
    
  // Recalcular paginación
  const totalPages = Math.ceil(filteredClubs.length / clubsPerPage);
  const indexOfLastClub = currentPage * clubsPerPage;
  const indexOfFirstClub = indexOfLastClub - clubsPerPage;
  const currentClubs = filteredClubs.slice(indexOfFirstClub, indexOfLastClub);

  // Función para unirse al club
  const joinClub = async (clubId) => {
    const token = localStorage.getItem('sessionToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/clubs/${clubId}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
        navigate(`/clubs/${clubId}`);
      } else {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }
    } catch (error) {
      console.error('Error joining club:', error);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }
  };

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
          <span>Error al entrar al club</span>
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
              <li><button type="button" className="nav-button active">Inicio</button></li>
              <li><button type="button" className="nav-button"onClick={() => navigate('/myClubs')}>Mis Clubes</button></li>
            </ul>
          </nav>
          <div className="user-profile">
            <FaUser className="user-icon" />
            <span className="username">{userName}</span>
          </div>
        </div>
      </header>
      
      <main className="home-main">
        <section className="hero">
          <div className="hero-content">
            <h2 className="animated-text">Descubre Clubes de Lectura</h2>
            <p>Únete a comunidades de lectores, comparte tus ideas y explora nuevas obras literarias</p>
          </div>
          <div className="hero-decoration">
            <div className="floating-shape shape1"></div>
            <div className="floating-shape shape2"></div>
            <div className="floating-shape shape3"></div>
          </div>
        </section>
        
        <section className="book-clubs animate-section">
          <div className="section-header">
            <div className="section-title">
              <FaBookmark className="section-icon" />
              <h3>Clubes de Lectura Disponibles</h3>
            </div>
            <div className="view-options">
              <span className="page-indicator">{currentPage} de {totalPages} páginas</span>
            </div>
          </div>
          
          {filteredClubs.length === 0 ? (
            <div className="no-results">
              <FaSearch className="no-results-icon" />
              <h4>No se encontraron resultados</h4>
              <p>No hay clubes disponibles en este momento</p>
            </div>
          ) : (
            <div className="book-clubs-grid">
              {currentClubs.map((club, index) => (
                <div 
                  className="club-card" 
                  key={club.id}
                  style={{animationDelay: `${index * 0.15}s`}}
                  onClick={() => navigateToClub(club.id)} // Añadir el manejador de eventos aquí
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
                  </div>
                  <button 
                    className="join-button"
                    onClick={(e) => {
                      e.stopPropagation(); // Evita que el clic se propague a la tarjeta
                      joinClub(club.id);
                    }}
                  >
                    <span>Únete</span>
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

export default HomePage;
