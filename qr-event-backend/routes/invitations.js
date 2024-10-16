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
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="color: #007bff; text-align: center;">Invitación al Evento</h2>
          <p style="font-size: 16px; color: #333;">Has sido invitado a un evento. Usa este código QR para acceder:</p>
          <div style="text-align: center; margin: 20px 0;">
            <img src="${qrCodeDataURL}" alt="Código QR" style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 10px;" />
          </div>
          <p style="font-size: 16px; color: #333;">¡Esperamos verte allí!</p>
        </div>
      `
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

// Endpoint para validar el código QR
router.post('/validate', async (req, res) => {
  const { code } = req.body;

  try {
    // Buscar la invitación en la base de datos
    const invitation = await Invitation.findOne({ code });

    if (!invitation) {
      return res.status(404).json({ message: 'Código QR no válido' });
    }

    // Redirigir a la página de bienvenida
    res.status(200).json({ redirect: '/bienvenido' });
  } catch (error) {
    console.error('Error al validar el código QR:', error);
    res.status(500).json({ message: 'Error al validar el código QR', error: error.toString() });
  }
});

module.exports = router;