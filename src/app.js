const express = require("express");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
dotenv.config();
const cors = require("cors");
const constants = require("./utils/constants");
const Controller = require("../src/controllers/controller");
const validateRoutes = require("../src/routes/validate.route");
const adminRoutes = require("../src/routes/admin.route");
const userRoutes = require("../src/routes/user.route");
const database = require("../src/configs/database");
const app = express();
const { MESSAGES } = constants;

app.use(cors({ origin: "*" }));
app.use(express.json());
database();
const PORT = process.env.PORT || 5000;

// base API
app.get("/", (req, res) => {
  res.status(200).send({ message: MESSAGES.FETCHED, success: true });
});

// fetch all rooms
app.get("/api/v1/rooms", async (req, res) => {
  try {
    const rooms = await Controller.getAllRooms();
    res
      .status(200)
      .send({ message: MESSAGES.FETCHED, success: true, data: rooms });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

// fetch a particular room by Id
app.get("/api/v1/room/:id", async (req, res) => {
  try {
    const room = await Controller.getRoomById(req.params.id);
    res
      .status(200)
      .send({ message: MESSAGES.FETCHED, success: true, data: room });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

// fetch a room by search or filter
app.get("/api/v1/room-search", async (req, res) => {
  let roomName = req.query.roomName;
  let roomType = req.query.roomType;
  let maxPrice = req.query.maxPrice;
  let minPrice = req.query.minPrice;

  if (roomName === undefined) {
    roomName = "";
  }

  if (roomType === undefined) {
    roomType = "";
  }

  if (maxPrice === undefined) {
    maxPrice = "";
  }

  if (minPrice === undefined) {
    minPrice = 0;
  }

  try {
    const room = await Controller.findRoom(
      roomName,
      roomType,
      maxPrice,
      minPrice
    );
    res.status(200).send({ message: MESSAGES.FETCHED, success: true, room });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

// fetch all room_types
app.get("/api/v1/room-types", async (req, res) => {
  try {
    const roomTypes = await Controller.getAllRoomTypes();
    res
      .status(200)
      .send({ message: MESSAGES.FETCHED, success: true, data: roomTypes });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

// fetch a particular room-type by Id
app.get("/api/v1/room-type/:id", async (req, res) => {
  try {
    const roomType = await Controller.getRoomTypeById(req.params.id);
    res
      .status(200)
      .send({ message: MESSAGES.FETCHED, success: true, data: roomType });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

// create room
app.post("/api/v1/room", async (req, res) => {
  const { name, room_type, price } = req.body;
  try {
    if (!name || !price || !room_type)
      throw new Error("Please provide all the required fields");
    const data = await Controller.addRoom(name, price, room_type);
    res.status(201).send({ message: MESSAGES.CREATED, success: true, data });
  } catch (err) {
    res
      .status(501)
      .send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

// create room_type
app.post("/api/v1/room_type", async (req, res) => {
  try {
    const data = await Controller.addRoomType(req.body);
    res.status(201).send({ message: MESSAGES.CREATED, success: true, data });
  } catch (err) {
    res
      .status(501)
      .send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

// edit room
app.patch("/api/v1/room:roomId", async (req, res) => {
  try {
    const { id } = req.params.roomId;
    const body = req.body;

    const data = await Controller.editRoomById(id, body);
    res.status(201).send({ message: MESSAGES.UPDATED, success: true, data });
  } catch (err) {
    res
      .status(501)
      .send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

// edit room_type
app.patch("/api/v1/room-type:roomTypeId", async (req, res) => {
  try {
    const { id } = req.params.roomTypeId;
    const body = req.body;

    const data = await Controller.editRoomTypeById(id, body);
    res.status(201).send({ message: MESSAGES.UPDATED, success: true, data });
  } catch (err) {
    res
      .status(501)
      .send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

// To delete room
app.delete("/api/v1/room-types:roomId", async (req, res) => {
  try {
    const { id } = req.params.roomId;

    const data = await controller.deleteRoomById(id);
    res.status(200).send({ message: MESSAGES.DELETED, success: true, data });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

// To delete room_type
app.delete("/api/v1/room-types:roomTypeId", async (req, res) => {
  try {
    const { id } = req.params.roomTypeId;

    const data = await controller.deleteRoomTypeById(id);
    res.status(200).send({ message: MESSAGES.DELETED, success: true, data });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

app.listen(PORT, () => {
  // To start up the server

  console.log(`Server started on PORT: ${PORT}`);
});

module.exports = app;
