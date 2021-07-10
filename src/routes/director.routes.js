const express = require("express");
const router = express.Router();
const directorController = require("../controllers/directorController");

router.get("/", directorController.test);
router.get("/createuser", directorController.createuser);

module.exports = router;
