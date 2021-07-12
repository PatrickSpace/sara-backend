const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authjwt } = require("../middlewares/index");
router.get("/", userController.getAll);

router.post(
  "/",
  [authjwt.verificarToken, authjwt.isDirector],
  userController.createuser
);

module.exports = router;
