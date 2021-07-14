const { Schema, model } = require("mongoose");

const documentoSchema = new Schema(
  {
    nombre: { type: String, required: true },
    texto: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Documento", documentoSchema);
