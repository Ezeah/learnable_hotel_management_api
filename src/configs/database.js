const mongoose = require("mongoose");
const constants = require("../utils/constants");

function database() {
  console.log("connecting to Mongodb...");
  console.log(constants.DATABASE_URI);
  mongoose
    .set("strictQuery", true)
    .connect(constants.DATABASE_URI, {})
    .then(() => {
      console.log("yes, mongodb is connected.");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = database;
