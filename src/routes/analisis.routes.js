const express = require("express");
const router = express.Router();
const analisisController = require("../controllers/analisisController");
const { authjwt } = require("../middlewares/index");
//texto de pdf
router.get("/pdf", analisisController.test);

//acceso a microservicio
router.post(
  "/preguntar/:did",
  [authjwt.verificarToken, authjwt.isProfesor],
  analisisController.preguntar
);

module.exports = router;
