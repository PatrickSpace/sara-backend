const express = require("express");
const router = express.Router();

//test
router.get("/", (req, res) => {
  res.send("funciona");
});

// ejemplos
// router.get("/user/:id", (req, res) => {
//   res.json(user1);
//   console.log(req.params);
// });

// router.delete("/user/:id", (req, res) => {
//   res.send(`User ${req.params.id} deleted`);
//   console.log(req.params.id);
// });

// router.post("/user", (req, res) => {
//   const name = req.body.name;
//   console.log(req.body.name);
//   res.json(name);
// });

module.exports = router;
