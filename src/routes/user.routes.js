const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authjwt } = require("../middlewares/index");
const userMD = require("../middlewares/userMiddleware");
const projMD = require("../middlewares/proyectoMiddleware");

router.get(
    "/", [authjwt.verificarToken, authjwt.isDirector],
    userController.getAll
);
router.get(
    "/profesores", [authjwt.verificarToken, authjwt.isDirector],
    userController.getProfesores
);
router.get(
    "/directores", [authjwt.verificarToken, authjwt.isDirector],
    userController.getDirectores
);
router.get(
    "/coordinadores", [authjwt.verificarToken, authjwt.isDirector],
    userController.getCoordinadores
);
router.get(
    "/:id", [authjwt.verificarToken, authjwt.isDirector],
    userController.userbyID
);
router.post(
    "/", [authjwt.verificarToken, authjwt.isDirector, userMD.userDuplicateReq],
    userController.createuser
);
router.put(
    "/:id", [authjwt.verificarToken, authjwt.isDirector, userMD.userExistenceId],
    userController.update
);
router.delete(
    "/:id", [authjwt.verificarToken, authjwt.isDirector, userMD.userExistenceId, userMD.userSelfDeletion],
    userController.delete
);
router.put(
    "/asignar/:id", [authjwt.verificarToken, authjwt.isDirector, projMD.projExistencebyBody],
    userController.asignProyect
);
module.exports = router;