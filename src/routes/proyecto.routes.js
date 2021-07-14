const express = require("express");
const router = express.Router();
const pC = require("../controllers/proyectoController");
const { authjwt } = require("../middlewares/index");

//listar
router.get("/", [authjwt.verificarToken, authjwt.isCoordinador], pC.findAll);

//listar por id
router.get("/:id", [authjwt.verificarToken, authjwt.isProfesor], pC.findbyID);

// add proyecto
router.post("/", [authjwt.verificarToken, authjwt.isDirector], pC.add);

// update proyecto
router.put("/:id", [authjwt.verificarToken, authjwt.isDirector], pC.update);
// delete proyecto
router.delete("/:id", [authjwt.verificarToken, authjwt.isDirector], pC.delete);
//add documento
router.post(
  "/doc/:id",
  [authjwt.verificarToken, authjwt.isProfesor],
  pC.addDoc
);
//borrar documento
router.delete(
  "/doc/:id/:docid",
  [authjwt.verificarToken, authjwt.isProfesor],
  pC.deleteDoc
);

module.exports = router;
