import React from 'react';
import QrScanner from './components/QrScanner';
import SendInvitation from './components/SendInvitation';

function App() {
  return (
    <div className="App">
      <h1>Escáner de Eventos QR</h1>
      <QrScanner />
      <SendInvitation />
    </div>
  );
}

export default App;