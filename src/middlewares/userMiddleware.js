const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Rol = require("../models/Rol");
const secret = process.env.SECRET;

module.exports = {
    // Related to:
    // HU-D04: CA4
    verifySelfDeletion: async function(req, res, next) {
        try {
            const token = req.headers["x-access-token"];
            if (!token) return res.status(403).json({
                msg: "no hay token USRMD_SPK"
            });
            const decoded = jwt.verify(token, secret);
            if (decoded.id == req.params.id) {
                return res.status(406).json({ msg: "You are trying to delete your own user" })
            }
            next();
        } catch (err) {
            console.log(err)
            return res.status(400).json({ msg: "Internal Error" });
        }
    },
    //Related to 
    //HU-01: CA2
    verifyDuplicatebyReq: async function(req, res, next) {
        try {
            const tgtInfo = req.body;
            const usr = await User.find({ usuario: tgtInfo.usuario });
            console.log(usr)
            if (typeof user != 'undefined') {
                return res.status(406).json({ msg: " El Usuario ya existe", user: usr });
            }
            next();
        } catch (err) {
            console.log(err)
            return res.status(400).json({ msg: "Internal Error Dupe" });
        }
    },
    //Related to:
    // HU-D02: CA8
    // HU-D03: CA8
    // HU-D04: CA3
    verifyExistenceById: async function(req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(406).json({ msg: " El Usuario no existe" });
            }
            next();
        } catch (err) {
            console.log(err)
            return res.status(400).json({ msg: "Internal Error" });
        }
    },
}