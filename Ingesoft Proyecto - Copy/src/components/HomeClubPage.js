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

// Función para encontrar los datos del club usando el ID desde nuestra lista de muestra
const findClubById = (id, sampleClubs) => {
  const club = sampleClubs.find(club => club.id === parseInt(id));
  // Añadimos datos de muestra para miembros y próximas reuniones
  if (club) {
    return {
      ...club,
      members: [
        "Ana Martínez", 
        "Carlos Rodríguez", 
        "Elena López", 
        "Javier García", 
        "Lucía Fernández"
      ],
      meetings: [
        { 
          date: "15 de marzo, 2025", 
          time: "18:00 - 19:30", 
          topic: "Discusión de capítulos 1-5"
        },
        { 
          date: "29 de marzo, 2025", 
          time: "18:00 - 19:30", 
          topic: "Discusión de capítulos 6-10" 
        }
      ],
      progress: 35 // Porcentaje de progreso en la lectura
    };
  }
  return null;
};

// Datos de muestra para los clubes de lectura con URLs de imágenes personalizadas
const sampleClubs = [
  {
    id: 1,
    name: "Club de Lectura Clásico",
    description: "Un club para amantes de la literatura clásica. Nos reunimos quincenalmente para discutir obras que han perdurado a través del tiempo, analizando su contexto histórico, impacto cultural y relevancia contemporánea. Nuestro enfoque está en apreciar la belleza de la prosa clásica mientras desentrañamos los temas universales que la hacen atemporal.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/3389/3389081.png",
    book: "Don Quijote de la Mancha"
  },
  {
    id: 2,
    name: "Club de Ciencia Ficción",
    description: "Exploramos mundos futuristas y realidades alternativas. Nuestro club se especializa en obras que desafían los límites de la imaginación, desde clásicos fundamentales del género hasta nuevas voces innovadoras. Discutimos las implicaciones filosóficas, científicas y sociales de estas narrativas visionarias, celebrando la capacidad de la ciencia ficción para cuestionar nuestras suposiciones sobre el presente y el futuro.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/2590/2590225.png",
    book: "Dune"
  },
  {
    id: 3,
    name: "Club de Misterio",
    description: "Desciframos enigmas y disfrutamos de relatos de intriga. Nuestro grupo está dedicado a descubrir las mejores obras de misterio, desde clásicos policiales hasta thrillers contemporáneos. Analizamos técnicas narrativas, pistas, giros argumentales y la psicología de personajes, celebrando el ingenio de aquellos autores que logran mantenernos en vilo hasta la última página.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/2421/2421391.png",
    book: "Sherlock Holmes: Estudio en escarlata"
  },
  {
    id: 4,
    name: "Club de Fantasía",
    description: "Un espacio para los fans de lo mágico y lo épico. Nos sumergimos en mundos imaginarios llenos de magia, criaturas mitológicas y aventuras épicas. Exploramos desde sagas clásicas hasta nuevas series innovadoras, apreciando la construcción de mundos, sistemas mágicos y el desarrollo de personajes memorables que nos transportan a reinos donde todo es posible.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/5229/5229377.png",
    book: "El Señor de los Anillos"
  },
  {
    id: 5,
    name: "Club de Historia",
    description: "Analizamos eventos históricos y sus repercusiones a través de libros que exploran momentos cruciales del pasado. Combinamos obras de no ficción rigurosas con novelas históricas que nos ofrecen perspectivas más personales de las épocas que representan. Nuestras discusiones conectan el pasado con el presente, examinando cómo los eventos históricos continúan moldeando nuestro mundo actual.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/2784/2784481.png",
    book: "Sapiens: De animales a dioses"
  },
  {
    id: 6,
    name: "Club de Poesía",
    description: "Disfrutamos y compartimos versos que conmueven el alma. Nuestro club celebra la expresión poética en todas sus formas, desde sonetos clásicos hasta poesía contemporánea experimental. Exploramos colecciones de poetas consagrados y emergentes, discutimos técnicas, significados e interpretaciones, y ocasionalmente compartimos nuestras propias creaciones en un ambiente de apreciación mutua.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/3330/3330314.png",
    book: "Veinte poemas de amor y una canción desesperada"
  },
  {
    id: 7,
    name: "Club de Novela Negra",
    description: "Discutimos crímenes, detectives y misterios urbanos del género noir. Nos fascinan los ambientes sombríos, los personajes moralmente ambiguos y las tramas complejas que caracterizan al género. Analizamos tanto clásicos definitivos como nuevas obras que reinventan las convenciones, apreciando las reflexiones sobre la justicia, la moralidad y la condición humana que estas historias nos ofrecen.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/2622/2622321.png",
    book: "El halcón maltés"
  },
  {
    id: 8,
    name: "Club de Literatura Contemporánea",
    description: "Exploramos obras modernas y su impacto en la sociedad actual. Nuestro club se centra en novelas y ensayos recientes que abordan temas relevantes de nuestro tiempo. Valoramos especialmente aquellas voces que ofrecen perspectivas diversas e innovadoras, ayudándonos a comprender mejor el mundo complejo en que vivimos a través de la literatura de nuestros días.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/3389/3389081.png",
    book: "La sombra del viento"
  },
  {
    id: 9,
    name: "Club de Ensayos",
    description: "Reflexionamos sobre ideas y pensamientos a través de ensayos filosóficos y literarios. Nuestro club explora la rica tradición del pensamiento humano expresado en forma de ensayo, desde meditaciones filosóficas clásicas hasta análisis contemporáneos sobre cultura, sociedad y ciencia. Valoramos la claridad de ideas, la profundidad de pensamiento y la capacidad de estos textos para desafiar nuestras preconcepciones.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/3068/3068327.png",
    book: "Meditaciones"
  },
  {
    id: 10,
    name: "Club de Aventura",
    description: "Para los amantes de la adrenalina y la exploración literaria. Nos sumergimos en relatos de aventuras extraordinarias, desde expediciones a tierras desconocidas hasta viajes de autodescubrimiento. Celebramos historias que capturan el espíritu de la exploración y el coraje frente a lo desconocido, transportándonos a experiencias emocionantes mientras permanecemos cómodamente en nuestros sillones.",
    iconImageUrl: "https://cdn-icons-png.flaticon.com/512/2826/2826187.png",
    book: "La isla del tesoro"
  }
];

function HomeClubPage() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Simulamos la carga de datos
    const timer = setTimeout(() => {
      const foundClub = findClubById(clubId, sampleClubs);
      setClub(foundClub);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [clubId]);

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
    navigate('/');
  };

  // Función para ir al chat del club
  const goToChat = () => {
    // En un escenario real, esto navegaría al chat del club
    console.log(`Navegando al chat del club ${clubId}`);
    // navigate(`/clubs/${clubId}/chat`);
  };

  // Función para salir del club
  const leaveClub = () => {
    console.log(`Saliendo del club ${clubId}`);
    // Aquí iría la lógica para salir del club
    // Después de procesarlo, volvemos a la página principal
    navigate('/');
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
            <span className="username">Ana Martínez</span>
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
                  style={{width: `${club.progress}%`}}
                ></div>
              </div>
              <span className="progress-text">{club.progress}% completado</span>
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
            {club.meetings.length > 0 ? (
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
              <h3 className="section-title">Miembros ({club.members.length})</h3>
            </div>
            <ul className="members-list">
              {club.members.map((member, index) => (
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