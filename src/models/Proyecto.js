const { Schema, model } = require("mongoose");

const proyectoSchema = new Schema(
  {
    codigo: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    documentos: [
      {
        nombre: { type: String, required: true },
        texto: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Proyecto", proyectoSchema, "proyectos");
