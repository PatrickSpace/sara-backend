const express = require("express");
const router = express.Router();
const califController = require("../controllers/calificacionController")
const { authjwt } = require("../middlewares/index");


router.get("/", [authjwt.verificarToken,authjwt.isProfesor],
    califController.findAll);

router.post("/", [authjwt.verificarToken,authjwt.isProfesor],
    califController.add);

module.exports = router;