const express = require("express");
const router = express.Router();
const pC = require("../controllers/proyectoController");
const projMD = require("../middlewares/proyectoMiddleware");
const {
    authjwt
} = require("../middlewares/index");

//listar todos
router.get("/", [authjwt.verificarToken, authjwt.isCoordinador],
    pC.findAll);
//listar por id
router.get("/:id", [authjwt.verificarToken, authjwt.isProfesor, projMD.projExistenceId],
    pC.findbyID);
// add proyecto
router.post("/", [authjwt.verificarToken, authjwt.isDirector, projMD.projDuplicatedCode, projMD.projDuplicatedName],
    pC.add);
// update proyecto
router.put("/:id", [authjwt.verificarToken, authjwt.isDirector],
 pC.update);
// delete proyecto
router.delete("/:id", [authjwt.verificarToken, authjwt.isDirector],
 pC.delete);
//add documento
router.post(
    "/doc/:id", [authjwt.verificarToken, authjwt.isProfesor],
    pC.addDoc);
//borrar documento
router.delete(
    "/doc/:id/:docid", [authjwt.verificarToken, authjwt.isProfesor],
    pC.deleteDoc
);

module.exports = router;