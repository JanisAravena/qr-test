const express = require('express');
const router = express.Router();
const Invitation = require('../models/Invitation'); // Import the Invitation model

// Get all invitations
router.get('/', async (req, res) => {
  try {
    const invitations = await Invitation.find();
    res.json(invitations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new invitation
router.post('/', async (req, res) => {
  const invitation = new Invitation({
    code: req.body.code, // Assuming the code is sent in the request body
    used: req.body.used || false // Default to false if not provided
  });

  try {
    const savedInvitation = await invitation.save();
    res.status(201).json(savedInvitation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export the router
module.exports = router;