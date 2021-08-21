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
router.get(
  "/:id",
  [authjwt.verificarToken, authjwt.isDirector],
  userController.userbyID
);

router.post(
  "/",
  [authjwt.verificarToken, authjwt.isDirector],
  userController.createuser
);

router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;
