const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const QRCode = require('qrcode');
const Invitation = require('../models/Invitation');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

// Inicializar Resend con la API Key
const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  console.error('Falta la API Key de Resend. Asegúrate de que RESEND_API_KEY esté definida en el archivo .env');
  process.exit(1);
}

// Endpoint para enviar invitación por correo electrónico
router.post('/send', async (req, res) => {
  const { email } = req.body;

  // Generar un código QR único
  const code = Math.random().toString(36).substring(2, 15);

  // Crear una nueva invitación en la base de datos
  const invitation = new Invitation({ code });

  try {
    await invitation.save();

    // Generar el código QR
    const qrCodeDataURL = await QRCode.toDataURL(code);
    console.log('QR Code Data URL:', qrCodeDataURL); // Verificar la URL del QR

    // Configurar el correo electrónico
    const msg = {
      from: 'onboarding@resend.dev', // Usa una dirección de correo válida
      to: email,
      subject: 'Invitación al Evento',
      html: `<p>Has sido invitado a un evento. Usa este código QR para acceder:</p><img src="${qrCodeDataURL}" alt="Código QR" />`
    };

    // Enviar el correo electrónico
    const response = await resend.emails.send(msg);
    console.log('Correo enviado:', response);

    if (response.error) {
      console.error('Error al enviar el correo electrónico:', response.error);
      return res.status(500).json({ message: 'Error al enviar el correo electrónico', error: response.error });
    }
    
    res.status(200).json({ message: 'Invitación enviada correctamente' });
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).json({ message: 'Error al enviar el correo electrónico', error: error.toString() });
  }
});

module.exports = router;
