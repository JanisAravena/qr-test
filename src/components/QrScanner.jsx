import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import axios from 'axios';

const QrScanner = () => {
  const [facingMode] = useState('environment'); // Predeterminado a 'environment' para la cámara trasera

  const handleScan = (data) => {
    if (data) {
      axios.post('http://localhost:5000/api/invitations/validate', { code: data.text })
        .then((response) => {
          window.location.href = response.data.redirectUrl; // Redirigir a otra página
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

  return (
    <div>
      <h2>Escanear Código QR TEST 2</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
        facingMode={{ exact: 'environment' }} // Usar siempre la cámara trasera
      />
    </div>
  );
};

export default QrScanner;