import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Chat() {
  const { clubId } = useParams();
  const [username, setUsername] = useState('');
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (connected) {
      const ws = new WebSocket(`ws://localhost:8080/app/chat`);
      setSocket(ws);

      ws.onopen = () => {
        console.log('WebSocket connection established');
        ws.send(JSON.stringify({ sender: username, type: 'JOIN' }));
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return () => {
        ws.close();
      };
    }
  }, [connected, clubId, username]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (newMessage.trim() && socket) {
      const chatMessage = {
        sender: username,
        content: newMessage,
        type: 'CHAT'
      };
      socket.send(JSON.stringify(chatMessage));
      setNewMessage('');
    }
  };

  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    if (username.trim()) {
      setConnected(true);
    }
  };

  return (
    <div>
      {!connected ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            background: '#fff',
            boxShadow: '0 1px 11px rgba(0, 0, 0, 0.27)',
            borderRadius: '2px',
            width: '100%',
            maxWidth: '500px',
            display: 'inline-block',
            marginTop: '42px',
            verticalAlign: 'middle',
            position: 'relative',
            padding: '35px 55px 35px',
            minHeight: '250px',
            position: 'absolute',
            top: '50%',
            left: '0',
            right: '0',
            margin: '0 auto',
            marginTop: '-160px'
          }}>
            <h1 style={{ fontSize: '1.7em' }}>Type your username</h1>
            <form id="usernameForm" onSubmit={handleUsernameSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <input
                  type="text"
                  id="name"
                  placeholder="Username"
                  autoComplete="off"
                  style={{
                    width: '100%',
                    minHeight: '38px',
                    fontSize: '15px',
                    border: '1px solid #c8c8c8',
                    paddingLeft: '10px',
                    outline: 'none'
                  }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <button type="submit" style={{
                  backgroundColor: '#ff4743',
                  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.12)',
                  color: '#fff',
                  border: '1px solid transparent',
                  fontSize: '14px',
                  outline: 'none',
                  lineHeight: '100%',
                  whiteSpace: 'nowrap',
                  verticalAlign: 'middle',
                  padding: '0.6rem 1rem',
                  borderRadius: '2px',
                  transition: 'all 0.2s ease-in-out',
                  cursor: 'pointer',
                  minHeight: '38px'
                }}>Start Chatting</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div style={{ position: 'relative', height: '100%' }}>
          <div style={{
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: '#fff',
            boxShadow: '0 1px 11px rgba(0, 0, 0, 0.27)',
            marginTop: '30px',
            height: 'calc(100% - 60px)',
            maxHeight: '600px',
            position: 'relative'
          }}>
            <div style={{ textAlign: 'center', padding: '15px', borderBottom: '1px solid #ececec' }}>
              <h2 style={{ margin: '0', fontWeight: '500' }}>Spring WebSocket Chat Demo</h2>
            </div>
            <div style={{ paddingTop: '5px', textAlign: 'center', color: '#777', position: 'absolute', top: '65px', width: '100%' }}>Connecting...</div>
            <ul style={{
              listStyleType: 'none',
              backgroundColor: '#FFF',
              margin: '0',
              overflow: 'auto',
              overflowY: 'scroll',
              padding: '0 20px 0px 20px',
              height: 'calc(100% - 150px)'
            }}>
              {messages.map((msg, index) => (
                <li key={index} style={{
                  lineHeight: '1.5rem',
                  padding: '10px 20px',
                  margin: '0',
                  borderBottom: '1px solid #f4f4f4',
                  ...(msg.type === 'JOIN' || msg.type === 'LEAVE' ? { textAlign: 'center', color: '#777', fontSize: '14px' } : { paddingLeft: '68px', position: 'relative' })
                }}>
                  {msg.type === 'CHAT' && (
                    <>
                      <i style={{
                        position: 'absolute',
                        width: '42px',
                        height: '42px',
                        overflow: 'hidden',
                        left: '10px',
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        fontSize: '18px',
                        lineHeight: '42px',
                        color: '#fff',
                        textAlign: 'center',
                        borderRadius: '50%',
                        fontStyle: 'normal',
                        textTransform: 'uppercase',
                        backgroundColor: getAvatarColor(msg.sender)
                      }}>{msg.sender[0]}</i>
                      <span style={{ color: '#333', fontWeight: '600' }}>{msg.sender}</span>
                    </>
                  )}
                  <p style={{ color: '#43464b' }}>{msg.content}</p>
                </li>
              ))}
            </ul>
            <form id="messageForm" onSubmit={sendMessage} style={{ padding: '20px' }}>
              <div style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    id="message"
                    placeholder="Type a message..."
                    autoComplete="off"
                    style={{
                      flex: '1',
                      minHeight: '38px',
                      fontSize: '15px',
                      border: '1px solid #c8c8c8',
                      paddingLeft: '10px',
                      outline: 'none'
                    }}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button type="submit" style={{
                    backgroundColor: '#128ff2',
                    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.12)',
                    color: '#fff',
                    border: '1px solid transparent',
                    fontSize: '14px',
                    outline: 'none',
                    lineHeight: '100%',
                    whiteSpace: 'nowrap',
                    verticalAlign: 'middle',
                    padding: '0.6rem 1rem',
                    borderRadius: '2px',
                    transition: 'all 0.2s ease-in-out',
                    cursor: 'pointer',
                    minHeight: '38px',
                    marginLeft: '5px'
                  }}>Send</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function getAvatarColor(messageSender) {
  const colors = ['#2196F3', '#32c787', '#00BCD4', '#ff5652', '#ffc107', '#ff85af', '#FF9800', '#39bbb0'];
  let hash = 0;
  for (let i = 0; i < messageSender.length; i++) {
    hash = 31 * hash + messageSender.charCodeAt(i);
  }
  const index = Math.abs(hash % colors.length);
  return colors[index];
}

export default Chat;
