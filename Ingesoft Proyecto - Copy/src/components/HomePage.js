import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css';
import { 
  FaBook, 
  FaChevronLeft, 
  FaChevronRight, 
  FaUser, 
  FaSearch,
  FaBell,
  FaBookmark,
  // Eliminada la importación de FaUsers
  // FaStar eliminado porque no se usa
} from 'react-icons/fa';

// Datos de muestra para los clubes de lectura con URLs de imágenes personalizadas
const sampleClubs = [
  {
    id: 1,
    name: "Club de Lectura Clásico",
    description: "Un club para amantes de la literatura clásica.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/3389/3389081.png",
    book: "Don Quijote de la Mancha"
  },
  {
    id: 2,
    name: "Club de Ciencia Ficción",
    description: "Exploramos mundos futuristas y realidades alternativas.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/2590/2590225.png",
    book: "Dune"
  },
  {
    id: 3,
    name: "Club de Misterio",
    description: "Desciframos enigmas y disfrutamos de relatos de intriga.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/2421/2421391.png",
    book: "Sherlock Holmes: Estudio en escarlata"
  },
  {
    id: 4,
    name: "Club de Fantasía",
    description: "Un espacio para los fans de lo mágico y lo épico.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/5229/5229377.png",
    book: "El Señor de los Anillos"
  },
  {
    id: 5,
    name: "Club de Historia",
    description: "Analizamos eventos históricos y sus repercusiones.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/2784/2784481.png",
    book: "Sapiens: De animales a dioses"
  },
  {
    id: 6,
    name: "Club de Poesía",
    description: "Disfrutamos y compartimos versos que conmueven.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/3330/3330314.png",
    book: "Veinte poemas de amor y una canción desesperada"
  },
  {
    id: 7,
    name: "Club de Novela Negra",
    description: "Discutimos crímenes, detectives y misterios urbanos.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/2622/2622321.png",
    book: "El halcón maltés"
  },
  {
    id: 8,
    name: "Club de Literatura Contemporánea",
    description: "Exploramos obras modernas y su impacto en la sociedad.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/3389/3389081.png",
    book: "La sombra del viento"
  },
  {
    id: 9,
    name: "Club de Ensayos",
    description: "Reflexionamos sobre ideas y pensamientos a través de ensayos.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/3068/3068327.png",
    book: "Meditaciones"
  },
  {
    id: 10,
    name: "Club de Aventura",
    description: "Para los amantes de la adrenalina y la exploración.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/2826/2826187.png",
    book: "La isla del tesoro"
  }
];

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const clubsPerPage = 3;

  // Nuevo efecto para simular carga de datos
  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Nuevo efecto para mostrar una notificación después de cargar
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

  // Simulamos un usuario conectado
  const userName = "Ana Martínez";

  // Ya no filtramos clubes por búsqueda, simplemente usamos todos los clubes
  const filteredClubs = sampleClubs;
    
  // Recalcular paginación
  const totalPages = Math.ceil(filteredClubs.length / clubsPerPage);
  const indexOfLastClub = currentPage * clubsPerPage;
  const indexOfFirstClub = indexOfLastClub - clubsPerPage;
  const currentClubs = filteredClubs.slice(indexOfFirstClub, indexOfLastClub);

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
          <span>¡Bienvenido a BookHunt! Descubre nuevos clubes de lectura.</span>
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
              <li><button type="button" className="nav-button">Mis Clubes</button></li>
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
            {/* Se ha eliminado el bloque hero-stats que contenía las estadísticas */}
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
              {/* Eliminamos el botón que usaba setSearchTerm */}
            </div>
          ) : (
            <div className="book-clubs-grid">
              {currentClubs.map((club, index) => (
                <div 
                  className="club-card" 
                  key={club.id}
                  style={{animationDelay: `${index * 0.15}s`}}
                >
                  <div className="club-header">
                    <div className="club-icon">
                      <img src={club.iconImageUrl || "https://via.placeholder.com/80"} alt={club.name} />
                    </div>
                    {/* Se ha eliminado el elemento members-count con el icono FaUsers */}
                  </div>
                  <div className="club-details">
                    <h4>{club.name}</h4>
                    <p className="club-description">{club.description}</p>
                    <div className="club-current-book">
                      <span className="book-label">Libro actual:</span>
                      <span className="book-title">{club.book}</span>
                    </div>
                  </div>
                  <button className="join-button">
                    <span>Unirse</span>
                    <span className="join-icon">+</span>
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
