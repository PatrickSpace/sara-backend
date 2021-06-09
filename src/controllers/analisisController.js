const axios = require("axios");
const url = "http://127.0.0.1:5000/preguntar"; //microservicio

module.exports = {
  test: function (req, res) {
    res.send("rutas analisis funciona");
  },
  async preguntar(req, res) {
    //console.log(req.body);
    try {
      const rpta = await axios.post(url, req.body);
      console.log(rpta.data);
      res.send(rpta.data);
    } catch (error) {
      console.log(error);
      res.send("f");
    }
  },
};
