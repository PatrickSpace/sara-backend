const Proyecto = require("../models/Proyecto");
module.exports = {
    adderrors: async function(req, res, next) {
        let errors = [];
        const {
            codigo,
            nombre
        } = req.body;
        if (!codigo || codigo === "") errors.push("Ingrese el codigo del proyecto");
        if (!nombre || nombre === "") errors.push("Ingrese el nombre del proyecto");
        if (nombre) {
            const proyectofoundbyname = await Proyecto.find({
                nombre: nombre
            });
            if (proyectofoundbyname) {
                errors.push("Este nombre ya está en uso");
            }
        }
        if (codigo) {
            const proyectofoundbycod = await Proyecto.find({
                codigo: codigo
            });
            if (proyectofoundbycod) {
                errors.push("Este codigo ya está en uso");
            }
        }
        if (errors.length === 0) {
            next();
        } else {
            res.status(400).json({
                msg: errors
            });
            return;
        }
    },
    ProjVerifyExistenceByCode: async function(req, res, next) {
        try {
            //TBR: Where does this criteria come from
            const proj = await Proyecto.find({ codigo: codigo })
            if (!project) {
                return res.status(406).json({ msg: "El codigo ya existe" });
            }
            next();
        } catch (err) {
            console.log(err)
            return res.status(400).json({
                msg: "Internal Error"
            });
        }
    },
    ProjVerifyExistenceByID: async function(req, res, next) {
        try {
            //TBR: Where does this criteria come from
            const proj = await Proyecto.find({ codigo: codigo })
            if (!project) {
                return res.status(406).json({ msg: "El proyecto ya existe" });
            }
            next();
        } catch (err) {
            console.log(err)
            return res.status(400).json({
                msg: "Internal Error"
            });
        }
    },
    ProjVerifyExistenceByName: async function(req, res, next) {
        try {
            //TBR: Where does this criteria come from
            const proj = await Proyecto.find({ nombre: nombre });
            if (!project) {
                return res.status(406).json({ msg: "El nombre de usuario ya existe" });
            }
            next();
        } catch (err) {
            console.log(err)
            return res.status(400).json({
                msg: "Internal Error"
            });
        }
    }
};