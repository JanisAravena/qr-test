import React from 'react';

const Bienvenido = () => {
  const containerStyle = {
    maxWidth: '600px',
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
    fontSize: '32px',
    color: '#007bff',
    marginBottom: '20px'
  };

  const paragraphStyle = {
    fontSize: '18px',
    color: '#333'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Bienvenido al Evento</h1>
      <p style={paragraphStyle}>Gracias por asistir.</p>
    </div>
  );
};

export default Bienvenido;