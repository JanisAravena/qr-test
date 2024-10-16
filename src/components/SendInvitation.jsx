import React, { useState } from 'react';
import axios from 'axios';

const SendInvitation = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/invitations/send', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error al enviar la invitación:', error);
      setMessage('Error al enviar la invitación');
    }
  };

  return (
    <div>
      <h2>Enviar Invitación</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar Invitación</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SendInvitation;