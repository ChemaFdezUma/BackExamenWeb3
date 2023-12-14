const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const app = express();

app.use(cors({
  origin: ["http://localhost:3000"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

const port = process.env.PORT || 5000;
app.use(express.json());

const paradasRoutes = require("./routes/paradasRoutes.js");
const logConexionesRoutes = require("./routes/logConexionsRoutes.js");
app.use("/paradas", paradasRoutes);
app.use("/logConexiones", logConexionesRoutes);
mongoose.connect(
  process.env.ATLAS_URI).then(() => {
    console.log("Hemos conectado con mongoDB, BOMBA");
  }).catch((error) => {
    console.error(error);
  });

app.get("/", (req, res) => {
  res.send("Esta es la API");
});

app.listen(port, console.log("Servidor escuchando en el puerto ", port));
