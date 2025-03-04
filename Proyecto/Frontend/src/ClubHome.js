import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ClubHome() {
  const { clubId } = useParams();
  const [club, setClub] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClub = async () => {
      const token = localStorage.getItem('sessionToken');
      if (token) {
        try {
          const response = await fetch(`http://localhost:8080/clubs/${clubId}/home`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setClub(data);
          } else {
            console.error('Failed to fetch club:', response.statusText);
            navigate('/login');
          }
        } catch (error) {
          console.error('Error fetching club:', error);
        }
      } else {
        navigate('/login');
      }
    };

    fetchClub();
  }, [clubId, navigate]);

  if (!club) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{club.name}</h1>
      <img src={club.iconImageUrl} alt={`${club.name} icon`} />
      <p>{club.description}</p>
      <p>Current Book: {club.book ? club.book : 'No book selected'}</p>
      <h2>Members</h2>
      <ul>
        {club.members.map((member) => (
          <li key={member}>{member}</li>
        ))}
      </ul>
    </div>
  );
}

export default ClubHome;
