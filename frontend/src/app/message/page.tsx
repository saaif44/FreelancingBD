"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import io from 'socket.io-client';

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
  const [isOpen, setIsOpen] = useState(false);
  const[profileData, setProfileData] = useState(null);
  const [logouts, setLogouts] = useState(false);


  const profileOptions = [

    {
        label: 'Dashboard',
        onClick: () => {
            console.log('dashboard clicked');
            window.location.href = '/dashboard';
        },
      },
    {
      label: 'Profile',
      onClick: () => {
        console.log('Profile clicked');
        window.location.href = '/profile';
      },
    },
    {
      label: 'Messages',
      onClick: () => {
        console.log('Messages clicked');
        window.location.href = '/message';
      },
    },
    {
    label: 'Balance',
    onClick: () => {
        console.log('Balance clicked');
        window.location.href = '/transaction';
    },
  },
  
    {
      label: 'Logout',
      onClick: () => {
        handleLogout();
      },
    },
  ];
    
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  


    if (logouts) {
        Cookies.remove('accessToken');
        window.location.href='/signin';
         }

         
  const handleLogout = async () => {
    try {
        setLogouts(true);
            } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  useEffect(() => {
    // Establish WebSocket connection
    const newSocket = io('http://localhost:4000');

    // Set the socket state
    setSocket(newSocket);

    // Event handler for new messages
    newSocket.on('newMessage', (newMessage) => {
      setMessageHistory((prevHistory) => [...prevHistory, newMessage]);
    });

    // Cleanup function
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile/allusers', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
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
          Authorization: `Bearer ${authToken}`
        }
      });
      setMessageHistory(response.data);
    } catch (error) {
      console.error('Error fetching message history:', error);
      setErrorMessage('Error fetching message history. Please try again.');
    }
  };

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:4000/messages', {
        content,
        recipientId
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      console.log('Message sent successfully:', response.data);
      // Emit the new message to the server through the WebSocket connection
      socket.emit('sendMessage', response.data);

      // Optionally, you can show a success message or clear the form fields here
      setContent('');
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('Error sending message. Please try again.');
    }
  };

  return (


    


    <div className="container">


<div className="dropdown"  style={{ position: 'absolute', top: '10px', right: '800px' }}>
<button className="dropdown-toggle" onClick={toggleDropdown}>
{profileData && profileData.username ? profileData.username : 'Menu'}
</button>
{isOpen && (
<div className="dropdown-menu">
  <ul>
    {profileOptions.map((option, index) => (
      <li key={index} onClick={option.onClick}>
        {option.label === 'Balance' ? ( <span> Balance ${userData && userData.balance} </span> ) : option.label}
      </li>

    ))}
  </ul>
</div>
)}
</div>



      <div className="user-list" style={{  top: '100px', right: '40px' }}>
        <h2>User List</h2>
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
        <div className="message-form" style={{ top: '100 px', right: '10px' }} >
          <div className="message-history">
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
  );
};

export default ComposeMessageForm;
