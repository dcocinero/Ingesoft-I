import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
// Removemos los iconos que ya no se usarán
import { FaUser, FaLock, FaBookOpen } from 'react-icons/fa';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);
  const navigate = useNavigate();

  // Efecto para animar la entrada del formulario
  useEffect(() => {
    setAnimateForm(true);
    // Agregar clase al body para manejar estilos globales
    document.body.classList.add('login-page-active');
    return () => {
      document.body.classList.remove('login-page-active');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulamos una carga para mostrar la animación
    setTimeout(() => {
      console.log('Login attempt with:', username, password);
      navigate('/home');
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className={`login-box ${animateForm ? 'animate-in' : ''}`}>
        {/* Lado izquierdo - Imagen arriba y texto abajo */}
        <div className="login-image-side">
          {/* Contenedor de la imagen en la parte superior */}
          <div className="image-container">
            <img 
              src="https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-cute-owl-bird-in-illustration-character-png-image_9195054.png"
              alt="Login" 
              className="login-image" 
            />
            <div className="overlay"></div>
          </div>
          
          {/* Contenedor del texto en la parte inferior */}
          <div className="text-container">
            <div className="image-text">
              <div className="logo-wrapper">
                <FaBookOpen className="logo-icon" />
                <h2>BookHunt</h2>
              </div>
              <p>Tu portal de clubes de lectura</p>
              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-dot"></span>
                  <span>Descubre nuevos libros</span>
                </div>
                <div className="feature-item">
                  <span className="feature-dot"></span>
                  <span>Conecta con lectores</span>
                </div>
                <div className="feature-item">
                  <span className="feature-dot"></span>
                  <span>Comparte tus ideas</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Formas decorativas opcionales */}
          <div className="shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        
        {/* Lado derecho - Formulario */}
        <div className="login-form-side">
          <div className="form-header">
            <h2>Iniciar Sesión</h2>
            <p className="subtitle">Ingresa tus datos para acceder</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="ejemplo@correo.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <div className="password-label-row">
                <label htmlFor="password">Contraseña</label>
              </div>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? <span className="spinner"></span> : 'Ingresar'}
            </button>
          </form>
          
          <p className="signup-text">
          
            ¿Aún no tienes una cuenta? <button type="button" className="signup-link"onClick={() => navigate('/register')}>Regístrate</button>
          </p>
        </div>
      </div>
      
      {/* Eliminamos la sección de decoración de fondo con los iconos flotantes */}
    </div>
  );
}

export default LoginPage;
