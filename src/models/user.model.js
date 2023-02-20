const { model, Schema } = require("mongoose");
const Room = require("./roomModel");
const RoomTypes = require("./roomTypeModel");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const constants = require("../utils/constants");
const { USER_TYPES, DATABASES } = constants;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        const isValidUsername = validator.isUsername(value);
        if (!isValidUsername) {
          const errorMessage = "Username is invalid";
          throw new Error(errorMessage);
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        const isValidEmail = validator.isEmail(value);
        if (!isValidEmail) {
          const errorMessage = "Email is invalid";
          throw new Error(errorMessage);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password cannot contain 'password'");
        }
      },
    },
    role: {
      type: String,
      required: true,
      trim: true,
      enum: ["guest", "admin"],
      default: "guest",
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "alabaster");
  user.tokens.push({ token });
  await user.save();
  return token;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = model("User", userSchema);

module.exports = User;
