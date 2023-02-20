const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require("../models/user.model");
const UserAuthenticate = require("../middlewares/auth");
const AdminAuthenticate = require("../middlewares/adminauth");

const router = express.Router();

// Joi schema for validating user registration data
const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Dynamic validation middleware for user registration data
const validateRegisterData = validateData(registerSchema);

// Route to register a new user
router.post('/signup', validateRegisterData, async (req, res) => {
  try {
    // User registration logic here
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Joi schema for validating user login data
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Dynamic validation middleware for user login data
const validateLoginData = validateData(loginSchema);

// Route to log in a user
router.post('/login', validateLoginData, async (req, res) => {
  try {
    // User login logic here
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
