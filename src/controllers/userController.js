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
  getAll: async function (req, res) {
    try {
      const lista = await User.find(
        {},
        "proyectos _id nombre usuario"
      ).populate("roles");
      res.status(200).json({ items: lista });
    } catch (err) {
      console.log(err);
    }
  },
  getProfesores: async function (req, res) {
    try {
      const usuarios = await User.find(
        {},
        "proyectos _id nombre usuario"
      ).populate("roles");
      let profes = [];
      if (usuarios.length > 0) {
        usuarios.forEach((user) => {
          user.roles.forEach((rol) => {
            if (rol.nombre === "profesor") {
              profes.push(user);
            }
          });
        });
      }
      res.status(200).json({ items: profes });
    } catch (err) {
      console.log(err);
    }
  },
  getCoordinadores: async function (req, res) {
    const usuarios = await User.find(
      {},
      "proyectos _id nombre usuario"
    ).populate("roles");
    let profes = [];
    if (usuarios.length > 0) {
      usuarios.forEach((user) => {
        user.roles.forEach((rol) => {
          if (rol.nombre === "director") {
            profes.push(user);
          }
        });
      });
    }
    res.status(200).json({ items: profes });
  },
  getDirectores: async function (req, res) {
    const usuarios = await User.find(
      {},
      "proyectos _id nombre usuario"
    ).populate("roles");
    let profes = [];
    if (usuarios.length > 0) {
      usuarios.forEach((user) => {
        user.roles.forEach((rol) => {
          if (rol.nombre === "director") {
            profes.push(user);
          }
        });
      });
    }
    res.status(200).json({ items: profes });
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

        res.status(200).json({ msg: "Usuario creado exitosamente" });
      } else {
        res.status(400).json({ msg: errores });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: ["usuario no creado"] });
    }
  },
  delete: async function (req, res) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "Usuario borrado exitosamente" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: ["Ocurrió un error"] });
    }
  },
  update: async function (req, res) {
    try {
      const { nombre, usuario, roles } = req.body;
      const foundRoles = await Rol.find({ nombre: { $in: roles } });
      let finalroles = foundRoles.map((rol) => rol._id);
      await User.findByIdAndUpdate(req.params.id, {
        nombre,
        usuario,
        finalroles,
      });
      res.status(200).json({ msg: "Usuario actualizado exitosamente" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: ["Ocurrió un error"] });
    }
  },
};
