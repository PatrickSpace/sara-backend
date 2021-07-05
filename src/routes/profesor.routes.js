const express = require("express");
const router = express.Router();
const profesorController = require("../controllers/profesorController");

//test
router.get("/", profesorController.test);

//getallprofes
router.get("/all", profesorController.getprofes);

module.exports = router;
