const Proyecto = require("../models/Proyecto");
const axios = require("axios");
//const url = "http://3.219.193.15:5000/preguntar"; //microservicio
const url = "http://192.168.1.9:5000/preguntar";
module.exports = {
  test: function (req, res) {
    res.send("analisis funciona");
  },
  preguntar: async function (req, res) {
    try {
      const proyectofound = await Proyecto.findById(req.params.id);
      if (proyectofound) {
        const texto = proyectofound.doctext;
        console.log(texto);
        const rpta = await axios.post(url, {
          pregunta: req.body.pregunta,
          contexto: texto,
        });
        rpta.data.Score = (rpta.data.Score * 100).toFixed(2);
        res.status(200).json(rpta.data);
      } else console.log("No existe el proyecto");
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .send(
          "An error has occured while trying to communicate with the server"
        );
    }
  },
};
