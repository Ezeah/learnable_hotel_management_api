const { model, Schema } = require("mongoose");
const constants = require("../utils/constants");
const Room = require("./roomModel");
const { USER_TYPES, DATABASES } = constants;

const RoomTypesSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ["Single", "Double", "Triple", "Quad", "Queen", "King", "Twin"],
  },
  description: {
    type: String,
    required: false,
  },
});

const RoomTypes = model(DATABASES.ROOM_TYPES, RoomTypesSchema);

module.exports = RoomTypes;
