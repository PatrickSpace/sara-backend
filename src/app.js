require("dotenv").config();
const express = require("express");
require("./db.js");
const morgan = require("morgan");

//rutas por entidad
const authroutes = require("./routes/auth.routes");
const proyectoroutes = require("./routes/proyecto.routes");
const userroutes = require("./routes/user.routes");
const analisisroutes = require("./routes/analisis.routes");

//basic config
const basicconfig = require("./libs/basicConfig");

//set app
const app = express();

//settings
basicconfig.createRol();
app.set("port", process.env.PORT || 3000);
app.use(express.json());

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); //extended es para verificar que envian texto chiqquito (cambiar cuando se reciba el PDF)

//routes
app.use("/api/auth", authroutes);
app.use("/api/profesor", proyectoroutes);
app.use("/api/user", userroutes);
app.use("/api/analisis", analisisroutes);

//init
app.listen(app.get("port"), () => {
  console.log(`API running at http://localhost:${app.get("port")}`);
});
