const express = require("express");
const router = express.Router();
const universidadController = require("../controllers/universidadController");

//test
router.get("/", universidadController.test);

module.exports = router;
