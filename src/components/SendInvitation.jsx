import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../App.css';

const SendInvitation = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/invitations/send', { email });
      setMessage(response.data.message);
      Swal.fire({
        icon: 'success',
        title: 'Invitación Enviada',
        text: response.data.message,
      });
    } catch (error) {
      console.error('Error al enviar la invitación:', error);
      setMessage('Error al enviar la invitación');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al enviar la invitación',
      });
    }
  };

  const buttonStyle = {
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff', // Color azul profesional
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
    width: '100%' // Asegura que el botón ocupe todo el ancho del contenedor
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3' // Color azul más oscuro al pasar el cursor
  };

  const inputStyle = {
    padding: '12px',
    border: '2px solid #ccc', // Borde más grueso
    borderRadius: '5px',
    fontSize: '16px',
    width: '100%', // Asegura que el input ocupe todo el ancho del contenedor
    marginBottom: '10px',
    backgroundColor: '#f0f0f0' // Color de fondo gris
  };

  const linkStyle = {
    display: 'block',
    marginTop: '20px',
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '16px',
    textAlign: 'center'
  };

  const linkHoverStyle = {
    textDecoration: 'underline'
  };

  return (
    <div className="container">
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
            style={inputStyle}
          />
        </div>
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
        >
          Enviar Invitación
        </button>
      </form>
      <Link to="/" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration} onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}>
        Ir a Escanear QR
      </Link>
    </div>
  );
};

export default SendInvitation;