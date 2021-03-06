const Proyecto = require("../models/Proyecto");
const Documento = require("../models/Documento");
const Usuario = require("../models/User");
const User = require("../models/User");
const pdfjs = require("pdfjs-dist/legacy/build/pdf.js");
const { compareSync } = require("bcryptjs");

function parsetxt(stream) {
  return stream.promise.then(function (pdf) {
    var mpages = pdf._pdfInfo.numPages;
    var arrPromises = [];
    for (var i = 1; i <= mpages; i++) {
      arrPromises.push(
        pdf.getPage(i).then(function (page) {
          return page.getTextContent().then(function (text) {
            return text.items
              .map(function (s) {
                return s.str;
              })
              .join("");
          });
        })
      );
    }
    return Promise.all(arrPromises).then(function (txt) {
      return txt;
    });
  });
}
module.exports = {
  findAll: async function (req, res) {
    try {
      const lista = await Proyecto.find();
      res.status(200).json({ items: lista });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: ["Ocurrió un error"] });
    }
  },
  findbyprofe: async function (req, res) {
    try {
      const id = req.params.id;
      let user = await Usuario.findById(id);
      if (user.proyectos.length === 0) {
        res.status(400).json({ msg: ["No cuenta con proyectos"] });
      } else {
        user = await Usuario.findById(id).populate("proyectos");
        res.status(200).json({ proyectos: user.proyectos });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: ["Ocurrió un error"] });
    }
  },
  findbyID: async function (req, res) {
    try {
      const proyectofound = await Proyecto.findById(req.params.id);
      if (!proyectofound) {
        res.status(400).json({ msg: ["Este proyecto no existe"] });
      }
      res.status(200).json({ proyectofound });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: ["Ocurrió un error"] });
    }
  },
  add: async function (req, res) {
    try {
      const { codigo, nombre } = req.body;
      const newproyecto = new Proyecto({ codigo, nombre });
      const usersaved = await newproyecto.save();
      res.status(200).json({
        msg: "Proyecto agregado satisfactoriamente",
        id: usersaved._id,
      });
    } catch (error) {
      return res.status(400).json({ msg: ["Ocurrió un error"] });
    }
  },
  update: async function (req, res) {
    try {
      const { codigo, nombre } = req.body;
      const proj = await Proyecto.findById(req.params.id);
      let payload = {};
      if (proj.nombre !== nombre) payload.nombre = nombre;
      if (proj.codigo !== codigo) payload.codigo = codigo;
      console.log(payload);
      if (payload === {}) res.status(200).json({ msg: "No hay cambios" });
      else {
        await Proyecto.findByIdAndUpdate(req.params.id, payload);
        return res
          .status(200)
          .json({ msg: "Proyecto actualizado satisfactoriamente" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: ["Ocurrió un error"] });
    }
  },
  delete: async function (req, res) {
    try {
      await Proyecto.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "Proyecto eliminado satisfactoriamente" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: ["Ocurrió un error"] });
    }
  },
  /*
  //Deprecated, do not use
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
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "ocurrió un error" });
    }
  },*/
  getAllDocuments: async function (req, res) {
    try {
      const alldocs = await Documento.findAll();
      return res.status(200).json(200);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: ["Ocurrió un error"] });
    }
  },
  deleteDoc: async function (req, res) {
    try {
      let borrado = false;
      const proyectofound = await Proyecto.findById(req.params.id);
      if (!proyectofound) {
        return res.status(400).json({ msg: ["el proyecto no existe"] });
      }
      for (var i = 0; i < proyectofound.documentos.length; i++) {
        if (proyectofound.documentos[i] == req.params.docid) {
          proyectofound.documentos.splice(i, 1);
          borrado = true;
        }
      }
      if (borrado) {
        await proyectofound.save();
        await Documento.findByIdAndDelete(req.params.docid);
        res.status(200).json({ msg: "El Documento fue borrado" });
      } else {
        return res.status(400).json({
          msg: ["el Documento que intenta borrar no existe en este proyecto"],
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: ["Ocurrió un error"] });
    }
  },
  UploadDoc: async function (req, res) {
    try {
      let data = new Uint8Array(req.file.buffer);
      let stream = await pdfjs.getDocument(data);
      var doc = await parsetxt(stream);
      batch = [];
      final = [];
      var WordLimit = 200;
      for (let i = 1; i < doc.length; i++) {
        batch = [
          ...batch,
          ...doc[i].split(" ").filter(function (n) {
            return n != "";
          }),
        ];
        n = batch.length;
        while (n > WordLimit) {
          final.push(batch.slice(0, WordLimit).join(" ").toString());
          batch = batch.slice(WordLimit, n);
          n = batch.length;
        }
      }
      //final = final.join("[],[]");
      console.log(final.length);
      let name = req.file.originalname;
      const proyectofound = await Proyecto.findById(req.params.id);
      proyectofound.docname = name;
      proyectofound.doctext = final;
      await proyectofound.save();
      return res.status(200).json({
        msg: "Documento agregado satisfactoriamente",
        documento_id: 0,
      });
      //return res.status(200).json({msg: "documento guardado",documento: final})
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: ["Ocurrió un error"] });
    }
  },
  findFree: async function (req, res) {
    try {
      const users = await User.find();
      const projs = await Proyecto.find();
      var UsrIDs = [];
      var free = [];
      users.forEach((user) => {
        if (user != "") {
          user.proyectos.forEach((pr) => {
            UsrIDs = UsrIDs.concat(pr.toString());
          });
        }
      });
      projs.forEach((proj) => {
        if (UsrIDs.indexOf(proj.id) == -1) {
          free.push(proj);
        }
      });
      return res.status(200).json({ items: free });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: ["Ocurrió un error"] });
    }
  },
};
