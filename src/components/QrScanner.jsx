import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QrReader from 'react-qr-scanner';
import axios from 'axios';
import Swal from 'sweetalert2';
import { QrContext } from '../QrContext';
import '../App.css';

const QrScanner = () => {
  const [facingMode] = useState('environment'); // Predeterminado a 'environment' para la cámara trasera
  const { setIsQrValid } = useContext(QrContext);
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      console.log('QR Data:', data);
      axios.post('http://localhost:5000/api/invitations/validate', { code: data.text })
        .then((response) => {
          console.log('Server Response:', response);
          setIsQrValid(true);
          navigate('/bienvenido');
        })
        .catch((error) => {
          console.error('Validation Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al validar la invitación',
            text: 'Por favor, vuelva a intentar o comuníquese con el administrador.',
            confirmButtonText: 'Aceptar'
          });
        });
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const containerStyle = {
    maxWidth: '500px',
    width: '100%',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '50px'
  };

  const headingStyle = {
    fontSize: '24px',
    color: '#007bff',
    marginBottom: '20px',
  
    padding: '10px', // Añade padding para que el texto no esté pegado al borde
    borderRadius: '5px' // Bordes redondeados
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
    marginTop: '20px',
    width: '100%' // Asegura que el botón ocupe todo el ancho del contenedor
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3' // Color azul más oscuro al pasar el cursor
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Escanear Código QR</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <Link to="/enviar-invitacion">
        <button
          style={buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
        >
          Crear invitación
        </button>
      </Link>
    </div>
  );
};

export default QrScanner;