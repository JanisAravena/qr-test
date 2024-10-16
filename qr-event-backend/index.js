const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar a MongoDB usando la URI desde el archivo .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Rutas
const invitationsRoutes = require('./routes/invitations');
app.use('/api/invitations', invitationsRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));