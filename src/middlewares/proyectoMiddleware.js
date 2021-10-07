const Proyecto = require("../models/Proyecto");

module.exports = {
    adderrors: async function (req, res, next) {
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
            res.status(400).json({ msg: errors });
            return;
        }
    },
    checkDuplicate(value) {
        return async (req, res, next) => {
            switch (value) {
                //Related to:
                //HU-D07: CA7
                //HU-D09: CA7
                case "Codigo":
                    val = { codigo: req.body.codigo };
                    rsp=1;
                    break;
                //Related to:
                //HU-D12: CA2
                case "Id":
                    val = { id: req.body.id };
                    rsp=2;
                    break;
                //Related to:
                //HU-D07: CA8
                case "Nombre":
                    val = { nombre: req.body.nombre };
                    rsp=3;
                    break;
            }
            try {
                const proj = await Proyecto.find(val);
                if (proj[0] != undefined) {
                    switch (rsp) {
                        case 1:
                            errmsg = "El codigo del proyecto ya existe";
                            break;
                        case 2:
                            errmsg = "El codigo ya esta en uso";
                            break;
                        case 3:
                            errmsg = "Este nombre del proyecto ya esta en uso";
                            break;
                    }
                    return res.status(400).json({ msg: [errmsg] });
                }
                next();
            } catch (error) {
                console.log(err)
                return res.status(400).json({ msg: ["Ocurrió un error"] });
            }
        }
    },
    //Related to:
    //HU-D12: CA2
    projExistenceId: async function (req, res, next) {
        try {
            pid = req.params.id
            if (pid.length != 24) {
                return res.status(400).json({ msg: ["El id del proyecto es invalido"] });
            }
            const proj = await Proyecto.findById(pid)
            if (!proj) {
                return res.status(400).json({ msg: ["Este proyecto no existe"] });
            }
            next();
        } catch (err) {
            console.log(err)
            return res.status(400).json({ msg: ["Ocurrió un error"] });
        }
    },
    docIsPdf: async function (req, res, next) {
        try {
            if (req.file.mimetype != "application/pdf") {
                return res.status(400).json({ msg: ["El documento no es un pdf"] });
            }
            next();
        } catch (err) {
            console.log(err);
            return res.status(400).json({ msg: ["Ocurrió un error"] });
        }

    },
    projExistencebyBody: async function (req, res, next) {
        try {
            const records = await Proyecto.find().where('_id').in(req.body.id);
            const aux = []
            records.forEach(rec => {
                aux.push(rec.id);
            })
            req.body.id = aux
            next();
        } catch (err) {
            console.log(err)
            return res.status(400).json({ msg: ["Ocurrió un error"] });
        }
    }
};