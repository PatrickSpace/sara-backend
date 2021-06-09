const express = require("express");
const morgan = require("morgan");
const router = require("./src/routes/index");

//rutas por entidad
const profesoroutes = require("./src/routes/profesorRoutes");
const uniroutes = require("./src/routes/universidadRoutes");
const proyectoroutes = require("./src/routes/proyectoRoutes");
const analisisroutes = require("./src/routes/analisisRoutes");

//set app
const app = express();

//settings
app.set("port", process.env.PORT || 3000);
app.use(express.json());

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); //extended es para verificar que envian texto chiqquito (cambiar cuando se reciba el PDF)

//routes
app.use("/", router);
app.use("/profesor", profesoroutes);
app.use("/universidad", uniroutes);
app.use("/proyecto", proyectoroutes);
app.use("/analisis", analisisroutes);

//init
app.listen(app.get("port"), () => {
  console.log(`API running at http://localhost:${app.get("port")}`);
});
