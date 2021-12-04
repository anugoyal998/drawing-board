const mongoose = require("mongoose");

const sch = new mongoose.Schema(
  {
    name: "string",
    email: "string",
    gid: "string",
    img: "string",
    uid: "string",
    board_name: "string",
    board_data: "array",
  },
  {
    timestamps: true,
  }
);

const model = new mongoose.model("board", sch);

module.exports = model;
