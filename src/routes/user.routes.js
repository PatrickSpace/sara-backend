const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authjwt } = require("../middlewares/index");

router.get(
  "/",
  [authjwt.verificarToken, authjwt.isDirector],
  userController.getAll
);
router.get(
  "/profesores",
  [authjwt.verificarToken, authjwt.isDirector],
  userController.getProfesores
);
router.get(
  "/directores",
  [authjwt.verificarToken, authjwt.isDirector],
  userController.getDirectores
);
router.get(
  "/coordinadores",
  [authjwt.verificarToken, authjwt.isDirector],
  userController.getCoordinadores
);

router.post(
  "/",
  [authjwt.verificarToken, authjwt.isDirector],
  userController.createuser
);

module.exports = router;
