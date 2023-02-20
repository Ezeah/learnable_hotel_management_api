const Room = require("../models/roomModel");
const Room_Types = require("../models/roomTypeModel");
const USER = require("../models/user.model");

class Controller {
  async getAllRooms() {
    return await Room.find();
  }

  async addRoom(name, price, room_type) {
    const newRoom = {
      name,
      price,
      room_type,
    };
    return await new Room(newRoom).save();
  }

  async getRoomById(id) {
    return await Room.findOne({ _id: id });
  }

  async findRoom(roomName, roomType, maxPrice, minPrice) {
    return await Room.find()
      .and([
        {
          $or: [
            { name: roomName },
            { price: { $lt: maxPrice, $gt: minPrice } },
          ],
        },
        {
          $or: [
            { path: "room_type", match: roomType },
            { price: { $lt: maxPrice, $gt: minPrice } },
          ],
        },
      ])
      .populate("room_type");
  }

  async editRoomById(id, data) {
    return await Room.findByIdAndUpdate({ _id: id }, data, { new: true });
  }

  async deleteRoomById(id) {
    return await Room.findByIdAndDelete({ _id: id });
  }

  async deleteRoomTyprById(id) {
    return await Room.findByIdAndDelete({ _id: id });
  }

  async getAllRoomTypes() {
    return await Room_Types.find();
  }

  async addRoomType(room) {
    return await Room_Types.create(room);
  }

  async getRoomTypeById(id) {
    return await Room_Types.findOne({ _id: id });
  }

  async editRoomTypeById(id, data) {
    return await Room_Types.findByIdAndUpdate({ _id: id }, data, { new: true });
  }

  async deleteRoomTypesById(id) {
    return await Room_Types.findByIdAndDelete({ _id: id });
  }
}

module.exports = new Controller();
