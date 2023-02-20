const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const Validate = require("../middlewares/validate");
const Room = require("../models/roomModel");
const RoomTypes = require("../models/roomTypeModel");
const User = require("../models/user.model");

// Authorization middleware function
const adminAuth = async (req, res, next) => {
  try {
    // Extract token from Authorization header and verify it
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'blublablue');

    // Find user with matching id and token
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    // If no user is found, throw an error
    if (!user) {
      throw new Error();
    }

    // Check if user is an admin
    const isAdmin = user.role === 'admin';

    // If user is not an admin, throw an error
    if (!isAdmin) {
      throw new Error();
    }

    // Add token and user to request object and pass control to next middleware
    req.token = token;
    req.admin = admin;
    next();
  } catch (error) {
    // If any errors occur during verification, send a 401 Unauthorized response
    res.status(401).send({ error: 'Unauthorized access' });
  }
};

module.exports = adminAuth;
