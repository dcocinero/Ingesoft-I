import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';
import { FaUser, FaLock, FaEnvelope, FaBookOpen } from 'react-icons/fa';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setAnimateForm(true);
    document.body.classList.add('register-page-active');
    return () => {
      document.body.classList.remove('register-page-active');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('Todos los campos son obligatorios');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        console.log('Registration successful');
        navigate('/login');
      } else {
        setErrorMessage('Error en el registro');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Error en el registro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className={`register-box ${animateForm ? 'animate-in' : ''}`}>
        <div className="register-image-side">
          <div className="register-image-container">
            <img 
              src="https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-cute-owl-bird-in-illustration-character-png-image_9195054.png"
              alt="Register" 
              className="register-image" 
            />
            <div className="register-overlay"></div>
          </div>
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
          <div className="register-shapes">
            <div className="register-shape register-shape-1"></div>
            <div className="register-shape register-shape-2"></div>
            <div className="register-shape register-shape-3"></div>
          </div>
        </div>
        <div className="register-form-side">
          <div className="register-form-header">
            <h2>Crear Cuenta</h2>
            <p className="register-subtitle">Completa tus datos para registrarte</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="register-form-group">
              <label htmlFor="username">Usuario</label>
              <div className="register-input-with-icon">
                <FaUser className="register-input-icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Ingresa tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
            {errorMessage && <p className="register-error-message">{errorMessage}</p>}
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