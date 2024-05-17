"use client"
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import Navbar from '../service/Navbar';

const ComposeMessageForm = () => {
  const [content, setContent] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const authToken = Cookies.get('accessToken');
  const [loading, setLoading] = useState(true);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [socket, setSocket] = useState(null);

  // Create a ref for the message history container
  const messageHistoryRef = useRef(null);

  useEffect(() => {
    const newSocket = io('http://localhost:4000', {
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on('newMessage', (newMessage) => {
      setMessageHistory((prevHistory) => [...prevHistory, newMessage]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/messages/received-users', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Error fetching user data. Please try again.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authToken]);

  const handleNameClick = async (userId) => {
    setRecipientId(userId);
    setShowMessageForm(true);
    try {
      const response = await axios.get(`http://localhost:4000/messages/${userId}/received`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setMessageHistory(response.data);
    } catch (error) {
      console.error('Error fetching message history:', error);
      setErrorMessage('Error fetching message history. Please try again.');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/messages', {
        content,
        recipientId,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log('Message sent successfully:', response.data);
      socket.emit('sendMessage', response.data);
      setContent('');
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('Error sending message. Please try again.');
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default behavior of new line on Enter key
      handleSendMessage(e);
    }
  };


  // Scroll to bottom when messageHistory changes
  useEffect(() => {
    if (messageHistoryRef.current) {
      messageHistoryRef.current.scrollTop = messageHistoryRef.current.scrollHeight;
    }
  }, [messageHistory]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="user-list" style={{ top: '100px', right: '40px' }}>
          <h2>Received User List</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {userData.map((user) => (
                <div key={user.id} onClick={() => handleNameClick(user.id)} className="user-name">
                  {user.username}
                </div>
              ))}
            </>
          )}
        </div>
        {showMessageForm && (
          <div className="message-form" style={{ top: '100px', right: '10px' }}>
            <div className="message-history" ref={messageHistoryRef} >
              <h3>Message History</h3>
              <div>
                {messageHistory.map((message) => (
                  <div key={message.id} className="message">
                    <p>{message.content}</p>
                    <p>Sent by: {message.senderName}</p>
                    <p>Date: {new Date(message.created_at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={handleSendMessage}>
              <div className="compose-message">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={handleKeyDown}
                  required
                ></textarea>
              </div>
              <div className="send-button">
                <button type="submit">Send Message</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComposeMessageForm;
