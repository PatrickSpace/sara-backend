const Rol = require("../models/Rol.js");

module.exports = {
  createRol: async function () {
    try {
      const count = await Rol.estimatedDocumentCount();
      if (count > 0) return;
      const values = await Promise.all([
        new Rol({ nombre: "profesor" }).save(),
        new Rol({ nombre: "director" }).save(),
        new Rol({ nombre: "coordinador" }).save(),
      ]);
      console.log(values);
    } catch (err) {
      console.log(err);
    }
  },
};
