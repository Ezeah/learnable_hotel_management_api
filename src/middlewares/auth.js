// Import required modules
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const Validate = require("../middlewares/validate");
const User = require("../models/user.model");
const Room = require("../models/roomModel");

// Define the middleware function
const auth = async (req, res, next) => {
  try {
    // Extract token from Authorization header and verify it
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "mytaskersecret");

    // Find user with matching id and token
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    // If no user is found, throw an error
    if (!user) {
      throw new Error();
    }

    // Add token and user to request object and pass control to next middleware
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    // If any errors occur during verification, send a 401 Unauthorized response
    res.status(401).send({ error: "Please authenticate." });
  }
};

// Export the middleware function
module.exports = auth;
