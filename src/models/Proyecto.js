const { Schema, model } = require("mongoose");

const proyectoSchema = new Schema(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    docname: { type: String, required: false },
    doctext: [{ type: String, required: false }],
  },
  { timestamps: true }
);

module.exports = model("Proyecto", proyectoSchema);
