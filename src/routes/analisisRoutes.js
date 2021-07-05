const express = require("express");
const router = express.Router();
const analisisController = require("../controllers/analisisController");

//************ IMPORTANTE **************/
// ruta: /analisis

//test
router.get("/", analisisController.test);

//texto de pdf
router.get("/pdf", analisisController.text);

//acceso a microservicio
router.post("/preguntar", analisisController.preguntar);

router.get("/preguntar", (req, res) => {
  res.send("preguntar funciona");
});
module.exports = router;
