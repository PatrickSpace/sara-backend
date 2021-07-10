const Proyecto = require("../models/Proyecto");

module.exports = {
  test: function (req, res) {
    res.send("rutas proyecto funcionan");
  },
  findAll: async function (req, res) {
    try {
      const lista = await Proyecto.find();
      res.status(200).json(lista);
    } catch (err) {
      console.log(err);
    }
  },
  findbyID: async function (req, res) {
    const proyectofound = await Proyecto.findById(req.params.id);
    res.status(200).json(proyectofound);
  },
  add: async function (req, res) {
    const { codigo, nombre } = req.body;
    const newproyecto = new Proyecto({ codigo, nombre });
    await newproyecto.save();
    res.send("El proyecto fue agregado");
  },
  update: async function (req, res) {
    try {
      const { codigo, nombre } = req.body;
      await Proyecto.findByIdAndUpdate(req.params.id, { codigo, nombre });
      res.status(200).json(`El Proyecto ${nombre} fue actualizado`);
    } catch (err) {
      console.log(err);
      res.send("ocurrió un error");
    }
  },
  delete: async function (req, res) {
    try {
      await Proyecto.findByIdAndDelete(req.params.id);
      res.status(204).json(`El Proyecto ${req.params.id} fue borrado`);
    } catch (err) {
      console.log(err);
      res.send("ocurrió un error");
    }
  },
};
