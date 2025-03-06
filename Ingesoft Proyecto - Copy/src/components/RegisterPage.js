import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';
import { FaUser, FaLock, FaEnvelope, FaBookOpen } from 'react-icons/fa';

function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);
  const navigate = useNavigate();

  // Efecto para animar la entrada del formulario
  useEffect(() => {
    setAnimateForm(true);
    // Agregar clase al body para manejar estilos globales
    document.body.classList.add('register-page-active');
    return () => {
      document.body.classList.remove('register-page-active');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulamos una carga para mostrar la animación
    setTimeout(() => {
      console.log('Register attempt with:', fullName, email, password);
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="register-container">
      <div className={`register-box ${animateForm ? 'animate-in' : ''}`}>
        {/* Lado izquierdo - Imagen arriba y texto abajo */}
        <div className="register-image-side">
          {/* Contenedor de la imagen en la parte superior */}
          <div className="register-image-container">
            <img 
              src="https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-cute-owl-bird-in-illustration-character-png-image_9195054.png"
              alt="Register" 
              className="register-image" 
            />
            <div className="register-overlay"></div>
          </div>
          
          {/* Contenedor del texto en la parte inferior */}
          <div className="register-text-container">
            <div className="register-image-text">
              <div className="register-logo-wrapper">
                <FaBookOpen className="register-logo-icon" />
                <h2>BookHunt</h2>
              </div>
              <p>Únete a nuestra comunidad de lectores</p>
              <div className="register-features-list">
                <div className="register-feature-item">
                  <span className="register-feature-dot"></span>
                  <span>Encuentra clubes de lectura</span>
                </div>
                <div className="register-feature-item">
                  <span className="register-feature-dot"></span>
                  <span>Descubre nuevos géneros</span>
                </div>
                <div className="register-feature-item">
                  <span className="register-feature-dot"></span>
                  <span>Crea tu propio club</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Formas decorativas opcionales */}
          <div className="register-shapes">
            <div className="register-shape register-shape-1"></div>
            <div className="register-shape register-shape-2"></div>
            <div className="register-shape register-shape-3"></div>
          </div>
        </div>
        
        {/* Lado derecho - Formulario */}
        <div className="register-form-side">
          <div className="register-form-header">
            <h2>Crear Cuenta</h2>
            <p className="register-subtitle">Completa tus datos para registrarte</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="register-form-group">
              <label htmlFor="fullName">Nombre completo</label>
              <div className="register-input-with-icon">
                <FaUser className="register-input-icon" />
                <input
                  type="text"
                  id="fullName"
                  placeholder="Ingresa tu nombre completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="register-form-group">
              <label htmlFor="email">Correo electrónico</label>
              <div className="register-input-with-icon">
                <FaEnvelope className="register-input-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="register-form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="register-input-with-icon">
                <FaLock className="register-input-icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Crea tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="register-form-group">
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <div className="register-input-with-icon">
                <FaLock className="register-input-icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirma tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className={`register-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? <span className="register-spinner"></span> : 'Registrarse'}
            </button>
          </form>
          
          <p className="register-login-text">
            ¿Ya tienes una cuenta? <button type="button" className="register-login-link" onClick={() => navigate('/login')}>Iniciar sesión</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;