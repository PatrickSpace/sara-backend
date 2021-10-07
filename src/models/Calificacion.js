const { Schema, model } = require("mongoose");

const calificacionSchema = new Schema(
    {
      pregunta: { type: String, required: true },
      respuesta: { type: String, required: true },
      calificacion: { type: String, required: true },
      presicion: { type: String, required: true },
    }
  );

module.exports = model("Calificacion", calificacionSchema);
