const express = require("express");
const router = express.Router();
const pC = require("../controllers/proyectoController");
const projMD = require("../middlewares/proyectoMiddleware");
const { authjwt } = require("../middlewares/index");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

//listar todos
router.get("/", [authjwt.verificarToken, authjwt.isCoordinador], pC.findAll);
//listar proyectos no asignados
router.get(
  "/free",
  [authjwt.verificarToken, authjwt.isCoordinador],
  pC.findFree
);
//listar por id
router.get(
  "/:id",
  [authjwt.verificarToken, authjwt.isProfesor, projMD.projExistenceId],
  pC.findbyID
);

//listar por profesor
router.get(
  "/my/:id",
  [authjwt.verificarToken, authjwt.isProfesor],
  pC.findbyprofe
);
// add proyecto
router.post(
  "/",
  [
    authjwt.verificarToken,
    authjwt.isCoordinador,
    projMD.checkDuplicate("Codigo"),
    projMD.checkDuplicate("Nombre"),
  ],
  pC.add
);
// update proyecto
router.put(
  "/:id",
  [authjwt.verificarToken, authjwt.isCoordinador, projMD.projExistenceId],
  projMD.checkDuplicate("Codigo"),
  projMD.checkDuplicate("Nombre"),
  pC.update
);
// delete proyecto
router.delete(
  "/:id",
  [authjwt.verificarToken, authjwt.isCoordinador],
  pC.delete
);
//add documento
//Deprecated, do not use
//router.post(
//    "/doc/:id", [authjwt.verificarToken, authjwt.isProfesor],
//    pC.addDoc);
//upload Documentos
router.post(
  "/upload/:id",
  [
    authjwt.verificarToken,
    authjwt.isProfesor,
    projMD.projExistenceId,
    upload.single("document"),
    projMD.docIsPdf,
  ],
  pC.UploadDoc
);
//borrar documento
router.delete(
  "/doc/:id/:docid",
  [authjwt.verificarToken, authjwt.isProfesor],
  pC.deleteDoc
);

module.exports = router;
