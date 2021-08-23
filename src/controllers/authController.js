const User = require("../models/User");
const Rol = require("../models/Rol");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = {
    login: async function(req, res) {
        try {
            const userFound = await User.findOne({
                usuario: req.body.usuario,
            }).populate("roles");
            if (!userFound) {
                return res.status(400).json({
                    msg: "El nombre de usuario no existe"
                });
            }
            const matchpsw = await User.matchPassword(
                req.body.password,
                userFound.password
            );
            if (!matchpsw) {
                return res
                    .status(400)
                    .json({
                        token: null,
                        msg: "Contraseña incorrecta"
                    });
            }
            const token = await jwt.sign({
                id: userFound._id
            }, process.env.SECRET, {
                expiresIn: 86400,
            });
            const a = jwt.verify(token, secret);
            res.status(200).json({
                token: token,
                metadata: a
            });
        } catch (error) {
            console.log(error);
        }
    },
    logout: async function(req, res) {},
};