import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClubs = async () => {
      const token = localStorage.getItem('sessionToken');
      if (token) {
        try {
          const response = await fetch('http://localhost:8080/home/clubs', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setClubs(data);
          } else {
            console.error('Failed to fetch clubs:', response.statusText);
            // Redirect to login if token is invalid
            navigate('/login');
          }
        } catch (error) {
          console.error('Error fetching clubs:', error);
        }
      } else {
        // Redirect to login if no token is found
        navigate('/login');
      }
    };

    fetchClubs();
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {/* Aquí puedes agregar más contenido para la página de inicio */}
      <div>
        <h2>Reading Clubs</h2>
        <ul>
          {clubs.map((club) => (
            <li key={club.id}>{club.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
