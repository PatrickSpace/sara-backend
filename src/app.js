require("dotenv").config();
const express = require("express");
require("./db.js");
const morgan = require("morgan");
const authroutes = require("./routes/auth.routes");

//rutas por entidad
const profesoroutes = require("./routes/profesor.routes");
const directorroutes = require("./routes/director.routes");
const proyectoroutes = require("./routes/proyecto.routes");
const analisisroutes = require("./routes/analisis.routes");

//set app
const app = express();

//settings
app.set("port", process.env.PORT || 3000);
app.use(express.json());

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); //extended es para verificar que envian texto chiqquito (cambiar cuando se reciba el PDF)

//routes
app.use("/api/auth", authroutes);
app.use("/api/profesor", profesoroutes);
app.use("/api/director", directorroutes);
app.use("/api/proyecto", proyectoroutes);
app.use("/api/analisis", analisisroutes);

//init
app.listen(app.get("port"), () => {
  console.log(`API running at http://localhost:${app.get("port")}`);
});
