const Calificacion = require('../models/Calificacion');

module.exports = {
    findAll: async function (req, res) {
        try {
            const list = await Calificacion.find();
            return res.status(200).json({ items:list})
        } catch (error) {
            console.log(error);
            return res.status(400).json({ msg: ["Ocurrió un error"] });
        }
    },
    add: async function (req, res) {
        try {
            const { pregunta, respesta, calificacion, presicion } = req.body;
            const newCalif = new Calificacion(req.body);
            console.log(newCalif);
            const saved = await newCalif.save();
            res.status(200).json({msg:"Calificacion guardada",id:saved._id});
        } catch (error) {
            console.log('Error')
            return res.status(400).json({ msg: ["Ocurrio un error"] });
        }
    },
};