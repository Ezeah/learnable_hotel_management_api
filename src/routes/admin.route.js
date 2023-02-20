const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Validate = require("../middlewares/validate");
const Authenticate = require("../middlewares/adminauth");
const User = require("../models/user.model");

const router = express.Router();

// Route to create a new room type
router.post('/room-types', verifyToken, isAdmin, async (req, res) => {
  // Only admins can access this route
  try {
    // Add new room type logic here
    res.status(201).json({ message: 'Room type created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update an existing room type
router.put('/room-types/:id', verifyToken, isAdmin, async (req, res) => {
  // Only admins can access this route
  try {
    // Update room type logic here
    res.status(200).json({ message: 'Room type updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete an existing room type
router.delete('/room-types/:id', verifyToken, isAdmin, async (req, res) => {
  // Only admins can access this route
  try {
    // Delete room type logic here
    res.status(200).json({ message: 'Room type deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
