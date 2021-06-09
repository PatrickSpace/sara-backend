const express = require("express");
const router = express.Router();
const analisisController = require("../controllers/analisisController");

//test
router.get("/", analisisController.test);

router.post("/preguntar", analisisController.preguntar);

module.exports = router;
