const User = require("../models/User");
module.exports = {
  //test
  test: function (req, res) {
    res.send("rutas director funcionan");
  },
  createuser: function (req, res) {
    try {
      const { nombre, usuario, password } = req.body;
      const newUser = new User({
        nombre,
        usuario,
        password: User.encryptPassword(password),
      });
      res.send(newUser);
    } catch (err) {
      console.log(err);
      res.send("usuario no creado");
    }
  },
};
