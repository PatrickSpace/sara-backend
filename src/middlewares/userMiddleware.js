const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Rol = require("../models/Rol");
const secret = process.env.SECRET;

module.exports = {
  // Related to:
  // HU-D04: CA4
  userSelfDeletion: async function (req, res, next) {
    try {
      const token = req.headers["x-access-token"];
      if (!token) return res.status(403).json({ msg: ["no hay token"] });
      const decoded = jwt.verify(token, secret);
      if (decoded.id == req.params.id) {
        return res
          .status(400)
          .json({ msg: ["No puede eliminar su propio usuario"] });
      }
      next();
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: ["Ocurrió un error"] });
    }
  },
  //Related to
  //HU-01: CA2
  userDuplicateReq: async function (req, res, next) {
    try {
      const userfound = await User.findOne({ usuario: req.body.usuario });
      console.log(userfound);
      if (userfound) {
        return res
          .status(400)
          .json({ msg: ["Este nombre de usuario ya se encuentra en uso"] });
      }
      next();
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: ["Ocurrió un error"] });
    }
  },
  //Related to:
  // HU-D06: CA2
  // HU-D02: CA8
  // HU-D03: CA8
  // HU-D04: CA3
  // HU-D10: CA3
  userExistenceId: async function (req, res, next) {
    try {
      id = req.params.id;
      if (id.length != 24) {
        return res.status(400).json({ msg: ["Este usuario no existe"] });
      }
      const user = await User.findById(id);
      if (!user) {
        return res.status(400).json({ msg: ["Este usuario no existe"] });
      }
      next();
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: ["Ocurrió un error"] });
    }
  },
};
