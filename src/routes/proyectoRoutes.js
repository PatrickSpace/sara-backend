const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");

//test
router.get("/", proyectoController.test);

module.exports = router;
