const axios = require("axios");
const url = "http://127.0.0.1:5000/preguntar"; //microservicio
//const pdfparse = require("pdf-parse");

//trayendo el PDF
//const pdf = fs.readFileSync("D:/Proyectos/sara/Web/Backend/v0/src/pdfs/1.pdf");

module.exports = {
  test: function (req, res) {
    res.send("analisis funciona");
  },
  //text: function (req, res) {
  // pdfparse(pdf).then((data) => {
  //   const texto = {
  //     info: data.text,
  //   };
  // res.send(texto);
  // });
  //},
  preguntar: async function (req, res) {
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
