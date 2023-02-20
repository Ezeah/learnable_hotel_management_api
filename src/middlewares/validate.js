const express = require('express');
const Joi = require('joi');
const Validate = require("../middlewares/adminauth");
const Authenticate = require("../middlewares/auth");
const Room = require("../models/roomModel");
const RoomTypes = require("../models/roomTypeModel");
const User = require("../models/user.model");

function validateData(schema) {
  return (req, res, next) => {
    // const dataToValidate = req.method === 'GET' ? req.query : req.body;
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    next();
  };
}
