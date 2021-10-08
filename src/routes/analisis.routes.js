const express = require("express");
const router = express.Router();
const analisisController = require("../controllers/analisisController");
const projMD = require("../middlewares/proyectoMiddleware");
const { authjwt } = require("../middlewares/index");
//texto de pdf
router.get("/pdf", analisisController.test);

//acceso a microservicio
router.post(
  "/preguntar/:id",
  [authjwt.verificarToken, authjwt.isProfesor, projMD.projExistenceId],
  analisisController.preguntar
);

module.exports = router;
