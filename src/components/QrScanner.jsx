// import React from 'react';
import QrReader from 'react-qr-scanner';
import axios from 'axios';

const QrScanner = () => {
  const handleScan = (data) => {
    if (data) {
      // Enviar el código QR al backend para validarlo
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

  return (
    <div>
      <h2>Escanear Código QR</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default QrScanner;
