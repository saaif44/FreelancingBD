"use client"
import React, { useState } from 'react';
import axios from 'axios';

const ComposeMessageForm = () => {
  const [content, setContent] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/messages', {
        content,
        recipientId
      });

      console.log('Message sent successfully:', response.data);
      // Optionally, you can show a success message or clear the form fields here
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('Error sending message. Please try again.');
    }
  };

  return (
    <div>
      <h2>Compose Message</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Message Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="recipientId">Recipient ID:</label>
          <input
            type="text"
            id="recipientId"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ComposeMessageForm;
