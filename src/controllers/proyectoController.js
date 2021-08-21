const Proyecto = require("../models/Proyecto");
const Documento = require("../models/Documento");

module.exports = {
  findAll: async function (req, res) {
    try {
      const lista = await Proyecto.find();
      res.status(200).json({ items: lista });
    } catch (err) {
      res.status(400).json({ msg: "Ocurrió un error" });
      console.log(err);
    }
  },
  findbyID: async function (req, res) {
    try {
      const proyectofound = await Proyecto.findById(req.params.id);
      if (!proyectofound) {
        res.status(400).json({ msg: "Este proyecto no existe" });
      }
      res.status(200).json({ proyectofound });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "Ocurrio un error" });
    }
  },
  add: async function (req, res) {
    try {
      const { codigo, nombre } = req.body;
      const newproyecto = new Proyecto({ codigo, nombre });
      const usersaved = await newproyecto.save();
      res
        .status(200)
        .json({ msg: "El proyecto fue agregado", id: usersaved._id });
    } catch (err) {
      res.status(400).json({ msg: "ocurrió un error" });
    }
  },
  update: async function (req, res) {
    try {
      const { codigo, nombre } = req.body;
      await Proyecto.findByIdAndUpdate(req.params.id, { codigo, nombre });
      res.status(200).json({ msg: `El Proyecto ${nombre} fue actualizado` });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: ["Ocurrió un error"] });
    }
  },
  delete: async function (req, res) {
    try {
      await Proyecto.findByIdAndDelete(req.params.id);
      res.status(204).json({ msg: `El Proyecto fue borrado exitosamente` });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: ["Ocurrió un error"] });
    }
  },
  addDoc: async function (req, res) {
    try {
      const { nombre, texto } = req.body;
      const proyectofound = await Proyecto.findById(req.params.id);
      if (!proyectofound)
        return res.status(400).json({ msg: "este proyecto no existe" });
      const newdoc = new Documento({ nombre, texto });
      const docsaved = await newdoc.save();
      proyectofound.documentos.push(docsaved._id);
      const proyectosaved = await proyectofound.save();
      res
        .status(201)
        .json({ msg: "documento guardado", proyecto: proyectosaved._id });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "ocurrió un error" });
    }
  },
  deleteDoc: async function (req, res) {
    try {
      let borrado = false;
      const proyectofound = await Proyecto.findById(req.params.id);
      if (!proyectofound) {
        return res.status(400).json({ msg: "el proyecto no existe" });
      }
      for (var i = 0; i < proyectofound.documentos.length; i++) {
        console.log(proyectofound.documentos[i]);
        console.log(req.params.docid);
        if (proyectofound.documentos[i] == req.params.docid) {
          proyectofound.documentos.splice(i, 1);
          borrado = true;
        }
      }
      if (borrado) {
        await proyectofound.save();
        await Proyecto.findByIdAndDelete(req.params.docid);
        res.status(200).json({ msg: "El Documento fue borrado" });
      } else {
        return res.status(400).json({
          msg: "el Documento que intenta borrar no existe en este proyecto",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "ocurrió un error" });
    }
  },
};
