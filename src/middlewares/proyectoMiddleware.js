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
    //Related to:
    //HU-D07: CA7
    //HU-D09: CA7
    projDuplicatedCode: async function(req, res, next) {
        try {
            const proj = await Proyecto.find({ codigo: req.body.codigo });
            console.log(proj[0])
            if (proj[0]!=undefined) {
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
    //Related to:
    //HU-D12: CA2
    projDuplicatedId: async function(req, res, next) {
        try {
            const proj = await Proyecto.find({ codigo: req.body.id })
            if (proj[0]!=undefined) {
                return res.status(406).json({ msg: "El id del proyecto ya existe" });
            }
            next();
        } catch (err) {
            console.log(err)
            return res.status(400).json({
                msg: "Internal Error"
            });
        }
    },
    //Related to:
    //HU-D07: CA8
    projDuplicatedName: async function(req, res, next) {
        try {
            const proj = await Proyecto.find({ nombre: req.body.nombre });
            if (proj[0]!=undefined) {
                return res.status(406).json({ msg: "El nombre del proyecto ya existe" });
            }
            next();
        } catch (err) {
            console.log(err)
            return res.status(400).json({
                msg: "Internal Error"
            });
        }
    },
    //Related to:
    //HU-D12: CA2
    projExistenceId: async function(req,res,next ){
        try {
            const proj = await Proyecto.find({ codigo: req.body.id })
            if (proj[0]==undefined) {
                return res.status(406).json({ msg: "El id del proyecto no existe" });
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