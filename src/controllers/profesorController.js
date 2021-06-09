const profes = ["Mansilla", "Quispe", "Barrientos"];

module.exports = {
  test: function (req, res) {
    res.send("rutas profesor funciona");
  },

  getprofes: function (req, res) {
    res.send(profes);
  },
};
