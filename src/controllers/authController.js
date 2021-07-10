const User = require("../models/User");

module.exports = {
  test: function (req, res) {
    res.send("login");
  },
  login: function (req, res) {
    res.send("login funciona");
  },
  createuser: async function (req, res) {
    try {
      const { nombre, usuario, password, roles } = req.body;
      const newUser = new User({
        nombre,
        usuario,
        password: await User.encryptPassword(password),
      });
      await newUser.save();
      res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
      res.status(400).json("usuario no creado");
    }
  },
};
