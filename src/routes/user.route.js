const express = require("express");
const User = require("../models/user.model");
const Validate = require("../middlewares/validate");
const Authenticate = require("../middlewares/auth");

const Room = require("..models/roomModel");

const router = express.Router();

// Route for user signup
router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
});

// Route for user login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

module.exports = router;


