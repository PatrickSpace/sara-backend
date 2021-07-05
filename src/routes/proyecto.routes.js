const express = require("express");
const router = express.Router();
const pC = require("../controllers/proyectoController");

//test
router.get("/", pC.test);
//listar
router.get("/all", pC.findAll);
//listar por id
router.get("/:id", pC.findbyID);
// add proyecto
router.post("/", pC.add);
// update proyecto
router.put("/:id", pC.update);
// delete proyecto
router.delete("/:id", pC.delete);

module.exports = router;
