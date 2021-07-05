const Proyecto = require("../models/Proyecto");

module.exports = {
  test: function (req, res) {
    res.send("rutas proyecto funcionan");
  },
  findAll: async function (req, res) {
    const lista = await Proyecto.find();
    res.send(lista);
  },
  findbyID: function (req, res) {
    res.send(`Retorna el Proyecto ${req.params.id}`);
    // const proy = await Proyecto.find();
  },
  add: async function (req, res) {
    const { codigo, nombre } = req.body;
    const newproyecto = new Proyecto({ codigo, nombre });
    await newproyecto.save();
    res.send("El proyecto fue agregado");
  },
  update: async function (req, res) {
    const { codigo, nombre } = req.body;
    await Proyecto.findByIdAndUpdate(req.params.id, { codigo, nombre });
    res.send(`El Proyecto ${nombre} fue actualizado`);
  },
  delete: async function (req, res) {
    await Proyecto.findByIdAndDelete(req.params.id);
    res.send(`El Proyecto ${req.params.id} fue borrado`);
  },
};
