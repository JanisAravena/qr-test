const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/qrevent')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
const invitationsRoutes = require('./routes/invitations');
app.use('/api/invitations', invitationsRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));