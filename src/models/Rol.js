const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const rolSchema = new Schema(
  {
    name: { type: String },
  },
  { versionKey: false }
);
