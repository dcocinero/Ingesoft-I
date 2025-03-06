import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaBook, 
  FaUser, 
  FaArrowLeft,
  FaPaperPlane,
  FaUsers,
  FaSmile
} from 'react-icons/fa';
import '../styles/ClubChat.css';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import EmojiPicker from 'emoji-picker-react';

function ClubChat() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [club, setClub] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  // Fetch club data
  useEffect(() => {
    const fetchClubData = async () => {
      const token = localStorage.getItem('sessionToken');
      try {
        const response = await fetch(`http://localhost:8080/clubs/${clubId}/home`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setClub(data);
          
          // Once we have club data, fetch messages
          fetchMessages();
        } else if (response.status === 403) {
          navigate('/myclubs');
        } else {
          console.error('Error fetching club data:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchClubData();

    // Connect to WebSocket if not already connected
    if (!stompClient) {
      const socket = new SockJS('http://localhost:8080/ws');
      const client = new Client({
        webSocketFactory: () => socket,
        onConnect: () => {
          client.subscribe(`/topic/chat/${clubId}`, (message) => {
            if (message.body) {
              const newMessage = JSON.parse(message.body);
              setMessages(prevMessages => {
                if (!prevMessages.some(msg => msg.id === newMessage.id)) {
                  return [...prevMessages, newMessage];
                }
                return prevMessages;
              });
            }
          });
        },
        onStompError: (frame) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body);
        }
      });
      client.activate();
      setStompClient(client);
    }

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [clubId, navigate, stompClient]);

  // Fetch messages
  const fetchMessages = async () => {
    const token = localStorage.getItem('sessionToken');
    try {
      // This endpoint should be updated to match your actual backend
      const response = await fetch(`http://localhost:8080/clubs/${clubId}/messages`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('Error fetching messages:', response.statusText);
        // If API is not ready, use sample data

      }
    } catch (error) {
      console.error('Error during fetch:', error);
      // If API is not ready, use sample data

    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle sending a new message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const token = localStorage.getItem('sessionToken');
    const username = localStorage.getItem('username');
    
    // Optimistic UI update
    const tempMessage = {
      id: Date.now(),
      sender: username,
      content: newMessage,
      timestamp: new Date().toISOString(),
      pending: true
    };
    
    setMessages(prevMessages => [...prevMessages, tempMessage]);
    setNewMessage('');
    
    try {
      // Send message via WebSocket
      if (stompClient) {
        stompClient.publish({
          destination: `/app/chat/${clubId}`,
          body: JSON.stringify({
            sender: username,
            content: newMessage,
            timestamp: new Date().toISOString()
          })
        });
      }
    } catch (error) {
      console.error('Error during send:', error);
      // Handle error by showing an alert or updating UI
    }
  };

  // Handle emoji selection
  const onEmojiClick = (emojiObject) => {
    setNewMessage(prevMessage => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  // Toggle emoji picker
  const toggleEmojiPicker = (e) => {
    e.preventDefault();
    setShowEmojiPicker(!showEmojiPicker);
  };

  // Function to go back to club home
  const goToClubHome = () => {
    navigate(`/clubs/${clubId}`);
  };

  // Format timestamp to readable time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

  return (
    <div className="chat-page-container">
      {/* Partículas animadas */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      <header className="chat-page-header">
        <div className="header-content">
          <button className="back-button" onClick={goToClubHome}>
            <FaArrowLeft /> Volver al club
          </button>
          <div className="logo-container">
            <FaBook className="logo-icon animated-icon" />
            <h1>BookHunt</h1>
          </div>
          <div className="user-profile">
            <FaUser className="user-icon" />
            <span className="username">{localStorage.getItem('username')}</span>
          </div>
        </div>
      </header>
      
      <main className="chat-page-main">
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-info">
              <img 
                src={club?.iconImageUrl || 'https://via.placeholder.com/40'} 
                alt="Club icon" 
                className="chat-club-icon" 
              />
              <div className="chat-title">
                <h2>{club?.name || 'Club de lectura'}</h2>
                <div className="chat-subtitle">
                  <FaUsers className="members-icon" />
                  <span>{club?.members?.length || 0} miembros</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="chat-messages">
            <div className="book-info-banner">
              <div className="book-icon">📖</div>
              <div className="book-details">
                <span className="reading-now">Leyendo actualmente:</span>
                <span className="book-title">{club?.book || 'Cargando...'}</span>
              </div>
            </div>
            
            {messages.length > 0 ? messages.map((message) => (
              <div 
                key={message.id} 
                className={`message-container ${message.sender === localStorage.getItem('username') ? 'own-message' : ''}`}
              >
                <div className="message-bubble">
                  {message.sender !== localStorage.getItem('username') && (
                    <div className="message-sender">{message.sender}</div>
                  )}
                  <div className="message-content">{message.content}</div>
                  <div className="message-timestamp">
                    {formatTime(message.timestamp)}
                    {message.pending && <span className="message-pending"> ✓</span>}
                  </div>
                </div>
              </div>
            )) : (
              <div className="no-messages">
                <p>No hay mensajes aún. ¡Sé el primero en escribir!</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chat-input-form" onSubmit={sendMessage}>
            <div className="emoji-button-wrapper">
              <button 
                type="button" 
                className="emoji-button"
                onClick={toggleEmojiPicker}
              >
                <FaSmile />
              </button>
              {showEmojiPicker && (
                <div className="emoji-picker-container">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="chat-input"
            />
            <button 
              type="submit" 
              className="send-button"
              disabled={!newMessage.trim()}
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </main>
      
      <footer className="chat-page-footer">
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

export default ClubChat;