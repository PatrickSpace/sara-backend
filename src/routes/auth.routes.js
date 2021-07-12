const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);

module.exports = router;
// ejemplos
// router.get("/user/:id", (req, res) => {
//   res.json(user1);
//   console.log(req.params);
// });

// router.delete("/user/:id", (req, res) => {
//   res.send(`User ${req.params.id} deleted`);
//   console.log(req.params.id);
// });
