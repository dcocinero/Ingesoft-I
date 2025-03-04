import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchClubs() {
  const [popularClubs, setPopularClubs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularClubs = async () => {
      const token = localStorage.getItem('sessionToken');
      if (token) {
        try {
          const response = await fetch('http://localhost:8080/clubs/popular', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setPopularClubs(data);
          } else {
            console.error('Failed to fetch popular clubs:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching popular clubs:', error);
        }
      } else {
        console.error('No token found');
      }
    };

    fetchPopularClubs();
  }, []);

  const handleJoinClub = async (clubId) => {
    const token = localStorage.getItem('sessionToken');
    if (token) {
      try {
        const response = await fetch(`http://localhost:8080/clubs/${clubId}/join`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          navigate(`/club/${clubId}/home`);
        } else {
          console.error('Failed to join club:', response.statusText);
        }
      } catch (error) {
        console.error('Error joining club:', error);
      }
    } else {
      console.error('No token found');
    }
  };

  return (
    <div>
      <h1>Popular Clubs</h1>
      <ul>
        {popularClubs.map((club) => (
          <li key={club.id}>
            {club.name}
            <button onClick={() => handleJoinClub(club.id)}>Entrar Club</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchClubs;
