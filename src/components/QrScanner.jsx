import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QrReader from 'react-qr-scanner';
import axios from 'axios';
import Swal from 'sweetalert2';
import { QrContext } from '../QrContext';
import { FaCamera } from 'react-icons/fa'; // Import the camera icon
import '../App.css';

const QrScanner = () => {
  const [facingMode, setFacingMode] = useState('environment'); // State for camera mode
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

  const toggleFacingMode = () => {
    setFacingMode((prevMode) => (prevMode === 'environment' ? 'user' : 'environment'));
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
    padding: '10px',
    borderRadius: '5px'
  };

  const buttonStyle = {
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '20px',
    width: '100%'
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3'
  };

  const iconButtonStyle = {
    padding: '10px',
    border: 'none',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '20px'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Escanear Código QR</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
        facingMode={facingMode}
      />
      <button
        style={iconButtonStyle}
        onClick={toggleFacingMode}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = iconButtonStyle.backgroundColor}
      >
        <FaCamera />
      </button>
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