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
    documentos: [
      {
        ref: "Document",
        type: Schema.Types.ObjectId,
        required: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Proyecto", proyectoSchema);
