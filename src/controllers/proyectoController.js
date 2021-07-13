const Proyecto = require("../models/Proyecto");

module.exports = {
  findAll: async function (req, res) {
    try {
      const lista = await Proyecto.find();
      res.status(200).json({ items: lista });
    } catch (err) {
      console.log(err);
    }
  },
  findbyID: async function (req, res) {
    const proyectofound = await Proyecto.findById(req.params.id);
    res.status(200).json({ proyectofound });
  },
  add: async function (req, res) {
    const { codigo, nombre } = req.body;
    const newproyecto = new Proyecto({ codigo, nombre });
    await newproyecto.save();
    res.status(200).json({ msg: "El proyecto fue agregado" });
  },
  update: async function (req, res) {
    try {
      const { codigo, nombre } = req.body;
      await Proyecto.findByIdAndUpdate(req.params.id, { codigo, nombre });
      res.status(200).json({ msg: `El Proyecto ${nombre} fue actualizado` });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "ocurrió un error" });
    }
  },
  delete: async function (req, res) {
    try {
      await Proyecto.findByIdAndDelete(req.params.id);
      res.status(204).json({ msg: `El Proyecto ${req.params.id} fue borrado` });
    } catch (err) {
      console.log(err);
      res.send({ msg: "ocurrió un error" });
    }
  },
};
