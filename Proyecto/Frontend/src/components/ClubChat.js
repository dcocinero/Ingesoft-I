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
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const stompClientRef = useRef(null);
  const [error, setError] = useState(null);
  
  // Utility function to safely get message ID
  const getMessageId = (message) => {
    return message.id || message._id;
  };
  
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
          console.log("Club data fetched successfully:", data);
          
          // Once we have club data, fetch messages
          fetchMessages();
        } else if (response.status === 403) {
          navigate('/myclubs');
        } else {
          console.error('Error fetching club data:', response.statusText);
          setError(`Error fetching club data: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        setError(`Error fetching club: ${error.message}`);
      }
    };

    fetchClubData();

    // Setup WebSocket connection
    const setupStompClient = () => {
      // Deactivate existing client if any
      if (stompClientRef.current) {
        console.log("Deactivating existing STOMP client");
        stompClientRef.current.deactivate();
      }

      setConnectionStatus('connecting');
      console.log("Creating new STOMP client");
      
      const socket = new SockJS('http://localhost:8080/ws');
      const client = new Client({
        webSocketFactory: () => socket,
        onConnect: () => {
          console.log("WebSocket connected");
          setConnectionStatus('connected');
          
          client.subscribe(`/topic/chat/${clubId}`, (message) => {
            if (message.body) {
              const newMessage = JSON.parse(message.body);
              console.log("Received WebSocket message:", newMessage);
              setMessages(prevMessages => {
                // Use the helper function to check for _id or id
                if (!prevMessages.some(msg => getMessageId(msg) === getMessageId(newMessage))) {
                  console.log("Adding new message to state:", newMessage);
                  return [...prevMessages, newMessage];
                }
                console.log("Message already exists in state, not adding:", newMessage);
                return prevMessages;
              });
            }
          });
        },
        onStompError: (frame) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body);
          setConnectionStatus('error');
        },
        onDisconnect: () => {
          console.log("WebSocket disconnected");
          setConnectionStatus('disconnected');
        }
      });
      
      client.activate();
      stompClientRef.current = client;
      setStompClient(client);
    };

    setupStompClient();

    // Cleanup function to properly close WebSocket connection
    return () => {
      if (stompClientRef.current) {
        console.log("Component unmounting: Deactivating STOMP client");
        stompClientRef.current.deactivate();
        stompClientRef.current = null;
        setStompClient(null);
      }
    };
  }, [clubId, navigate]);

  // Fetch messages
  const fetchMessages = async () => {
    const token = localStorage.getItem('sessionToken');
    try {
      console.log(`Fetching messages for club ${clubId}...`);
      const response = await fetch(`http://localhost:8080/clubs/${clubId}/messages`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Messages fetched successfully:", data);
        setMessages(data);
      } else {
        const errorText = await response.text();
        console.error('Error fetching messages:', response.status, errorText);
        setError(`Error fetching messages: ${response.status} ${errorText}`);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setError(`Error fetching messages: ${error.message}`);
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
    
    const username = localStorage.getItem('username');
    setNewMessage('');
    
    try {
      // Send message via WebSocket
      if (stompClientRef.current && connectionStatus === 'connected') {
        stompClientRef.current.publish({
          destination: `/app/chat/${clubId}`,
          body: JSON.stringify({
            sender: username,
            content: newMessage,
            clubId: clubId,
            timestamp: new Date().toISOString()
          })
        });
      } else {
        console.error("Cannot send message: WebSocket not connected");
        // Could display a notification to the user that they're offline
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
            
            {error && (
              <div className="error-message">
                <p>{error}</p>
                <button onClick={() => { setError(null); fetchMessages(); }}>Reintentar</button>
              </div>
            )}
            
            {connectionStatus !== 'connected' && (
              <div className="connection-status">
                <p>Estado de conexión: {connectionStatus === 'connecting' ? 'Conectando...' : 'Desconectado'}</p>
              </div>
            )}
            
            {messages.length > 0 ? messages.map((message) => (
              <div 
                key={getMessageId(message)} 
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