import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import axios from 'axios';

const QrScanner = () => {
  const [facingMode, setFacingMode] = useState('environment');

  const handleScan = (data) => {
    if (data) {
      axios.post('http://localhost:5000/api/invitations/validate', { code: data.text })
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.error(error);
          alert('Error al validar la invitación');
        });
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const toggleFacingMode = () => {
    setFacingMode((prevMode) => (prevMode === 'environment' ? 'user' : 'environment'));
  };

  return (
    <div>
      <h2>Escanear Código QR PRUEBA 1</h2>
      <button onClick={toggleFacingMode}>
        {facingMode === 'environment' ? 'Cambiar a cámara frontal' : 'Cambiar a cámara trasera'}
      </button>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
        facingMode={{ exact: facingMode }} // Ajuste aquí
      />
    </div>
  );
};

export default QrScanner;
