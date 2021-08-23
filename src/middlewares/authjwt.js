const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Rol = require("../models/Rol");
const secret = process.env.SECRET;

module.exports = {
    verificarToken: async(req, res, next) => {
        try {
            const token = req.headers["x-access-token"];
            if (!token) return res.status(403).json({
                msg: "no hay token"
            });
            const decoded = jwt.verify(token, secret);
            req.userid = decoded.id;
            const user = await User.findById(req.userid, {
                password: 0
            });
            if (!user) return res.status(400).json({
                msg: "Usuario no encontrado"
            });
            next();
        } catch (err) {
            return res.status(401).json({
                msg: "No autorizado"
            });
        }
    },
    isDirector: async function(req, res, next) {
        const user = await User.findById(req.userid);
        const roles = await Rol.find({
            _id: {
                $in: user.roles
            }
        });
        let autorizado = false;
        roles.forEach(function(r) {
            if (r.nombre === "director") {
                autorizado = true;
            }
        });
        if (autorizado) {
            next();
            return;
        } else {
            return res.status(401).json({
                msg: "Se necesitan permisos de Director"
            });
        }
    },
    isProfesor: async function(req, res, next) {
        const user = await User.findById(req.userid);
        const roles = await Rol.find({
            _id: {
                $in: user.roles
            }
        });
        let autorizado = false;
        roles.forEach(function(r) {
            if (r.nombre === "profesor") {
                autorizado = true;
            }
        });
        if (autorizado) {
            next();
            return;
        } else {
            return res.status(401).json({
                msg: "Se necesitan permisos de Profesor"
            });
        }
    },
    isCoordinador: async function(req, res, next) {
        const user = await User.findById(req.userid);
        const roles = await Rol.find({
            _id: {
                $in: user.roles
            }
        });
        let autorizado = false;
        roles.forEach(function(r) {
            if (r.nombre === "coordinador") {
                autorizado = true;
            }
        });
        if (autorizado) {
            next();
            return;
        } else {
            return res
                .status(401)
                .json({
                    msg: "Se necesitan permisos de Coordinador"
                });
        }
    },
};