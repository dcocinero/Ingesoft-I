import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import { FaUser, FaLock, FaBookOpen } from 'react-icons/fa';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setAnimateForm(true);
    document.body.classList.add('login-page-active');
    return () => {
      document.body.classList.remove('login-page-active');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        localStorage.setItem('sessionToken', data.token);
        localStorage.setItem('username', username); // Guardar el usuario
        navigate('/home');
      } else {
        setErrorMessage('Usuario y/o contraseña incorrecta');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Usuario y/o contraseña incorrecta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className={`login-box ${animateForm ? 'animate-in' : ''}`}>
        <div className="login-image-side">
          <div className="image-container">
            <img 
              src="https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-cute-owl-bird-in-illustration-character-png-image_9195054.png"
              alt="Login" 
              className="login-image" 
            />
            <div className="overlay"></div>
          </div>
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
          <div className="shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        <div className="login-form-side">
          <div className="form-header">
            <h2>Iniciar Sesión</h2>
            <p className="subtitle">Ingresa tus datos para acceder</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button 
              type="submit" 
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? <span className="spinner"></span> : 'Ingresar'}
            </button>
          </form>
          <p className="signup-text">
            ¿Aún no tienes una cuenta? <button type="button" className="signup-link" onClick={() => navigate('/register')}>Regístrate</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
