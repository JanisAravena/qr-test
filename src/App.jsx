import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import QrScanner from './components/QrScanner';
import Bienvenido from './components/Bienvenido';
import SendInvitation from './components/SendInvitation';
import { QrProvider, QrContext } from './QrContext';
import './App.css';

const ProtectedRoute = ({ element }) => {
  const { isQrValid } = useContext(QrContext);
  return isQrValid ? element : <Navigate to="/" />;
};

const App = () => (
  <QrProvider>
    <Router>
      <Routes>
        <Route path="/bienvenido" element={<ProtectedRoute element={<Bienvenido />} />} />
        <Route path="/enviar-invitacion" element={<SendInvitation />} />
        <Route path="/" element={<QrScanner />} />
      </Routes>
    </Router>
  </QrProvider>
);

export default App;