require("dotenv").config();
const express = require("express");
require("./db.js");
const morgan = require("morgan");
const cors = require("cors");

//rutas por entidad
const authroutes = require("./routes/auth.routes");
const proyectoroutes = require("./routes/proyecto.routes");
const userroutes = require("./routes/user.routes");
const analisisroutes = require("./routes/analisis.routes");
const calificacionroutes = require("./routes/calificacion.routes");

//basic config
const basicconfig = require("./libs/basicConfig");

//set app
const app = express();

//settings
basicconfig.createRol();
app.set("port", process.env.PORT || 3000);
app.use(express.json());

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: false,
  })
); //extended es para verificar que envian texto chiqquito (cambiar cuando se reciba el PDF)

//routes
app.use("/api/auth", authroutes);
app.use("/api/proyecto", proyectoroutes);
app.use("/api/user", userroutes);
app.use("/api/analisis", analisisroutes);
app.use("/api/calificacion", calificacionroutes);

//init
app.listen(app.get("port"), () => {
  console.log(`API running at http://localhost:${app.get("port")}`);
});
