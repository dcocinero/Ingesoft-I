import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfilePage.css';
import { FaUser, FaEnvelope, FaCamera, FaEdit } from 'react-icons/fa';

function ProfilePage() {
  const [fullName, setFullName] = useState('Juan Pérez');
  const [email, setEmail] = useState('juan.perez@example.com');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [bio, setBio] = useState('Amante de la lectura y la tecnología.');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('profile-page-active');
    return () => {
      document.body.classList.remove('profile-page-active');
    };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <div className="profile-image-section">
          <div className="profile-image-wrapper">
            <img src={profileImage} alt="Profile" className="profile-image" />
            {isEditing && (
              <label className="profile-image-edit">
                <FaCamera />
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>
            )}
          </div>
        </div>

        <div className="profile-info-section">
          <div className="profile-header">
            <h2>Perfil</h2>
            <button className="edit-button" onClick={handleEditToggle}>
              <FaEdit /> {isEditing ? 'Cancelar' : 'Editar'}
            </button>
          </div>

          <div className="profile-details">
            <div className="profile-field">
              <FaUser className="profile-icon" />
              {isEditing ? (
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              ) : (
                <span>{fullName}</span>
              )}
            </div>

            <div className="profile-field">
              <FaEnvelope className="profile-icon" />
              {isEditing ? (
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              ) : (
                <span>{email}</span>
              )}
            </div>

            <div className="profile-field">
              <label>Biografía:</label>
              {isEditing ? (
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
              ) : (
                <p>{bio}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <button className="save-button" onClick={handleSave}>Guardar Cambios</button>
          )}

          <button className="logout-button" onClick={() => navigate('/login')}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;