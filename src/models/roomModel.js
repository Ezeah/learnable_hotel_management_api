const { model, Schema } = require("mongoose");
const constants = require("../utils/constants");
const { USER_TYPES, DATABASES } = constants;

const RoomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    room_type: {
      type: Schema.Types.ObjectId,
      ref: "room_type",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Room = model(DATABASES.ROOM, RoomSchema);

module.exports = Room;
