const User = require("../models/User");
const Rol = require("../models/Rol");
const jwt = require("jsonwebtoken");

const errors = async (nombre, usuario, password, roles) => {
  const errorsarray = [];
  if (!nombre || nombre === "") errorsarray.push("Ingrese un nombre");
  if (!usuario || usuario === "") errorsarray.push("Ingrese un usuario");
  if (!password || password === "") errorsarray.push("Ingrese una contraseña");
  if (!roles || roles.length === 0) errorsarray.push("Ingrese almenos un rol");
  if (usuario) {
    const userFound = await User.findOne({ usuario: usuario });
    if (userFound) {
      errorsarray.push("Este nombre de usuario ya está en uso");
    }
  }
  if (roles) {
    const foundRoles = await Rol.find({ nombre: { $in: roles } });
    if (foundRoles.length === 0) {
      errorsarray.push("Los roles no son validos");
    }
  }
  return errorsarray;
};

module.exports = {
  test: function (req, res) {
    res.send("funciona");
  },
  getAll: async function (req, res) {
    try {
      const lista = await User.find(
        {},
        "roles proyectos _id nombre usuario"
      ).populate("roles");
      res.status(200).json({ items: lista });
    } catch (err) {
      console.log(err);
    }
  },
  createuser: async function (req, res) {
    try {
      const { nombre, usuario, password, roles } = req.body;
      const errores = await errors(nombre, usuario, password, roles);
      if (errores.length === 0) {
        const newUser = new User({
          nombre,
          usuario,
          password: await User.encryptPassword(password),
        });
        const foundRoles = await Rol.find({ nombre: { $in: roles } });
        newUser.roles = foundRoles.map((rol) => rol._id);
        const savedUser = await newUser.save();
        const token = await jwt.sign(
          { id: savedUser._id },
          process.env.SECRET,
          {
            expiresIn: 86400,
          }
        );
        res.status(200).json({ token: token });
      } else {
        res.status(400).json({ msg: errores });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: ["usuario no creado"] });
    }
  },
};
