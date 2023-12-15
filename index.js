const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary');

const app = express();
const port = 5001;
app.use(express.json());
app.use(cors());
cloudinary.config({ 
  cloud_name: 'dgqruvvjr', 
  api_key: '961825855861132', 
  api_secret: 'OMToah82AGwg_ZlI5FiSZ2IYQOU' 
});

const logConexionesRoutes = require("./routes/logConexionsRoutes");
const pardasRoutes = require("./routes/paradasRoutes");
app.use("/logConexiones", logConexionesRoutes);
app.use("/paradas", pardasRoutes);

app.post('/subir', upload.single('imagen'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Falta la imagen en la solicitud' });
    }

    const imagen = req.file;

    const resultado = await cloudinary.uploader.upload(imagen.path);

    console.log(resultado); // Imprime los detalles de la imagen subida en la consola
    res.json(resultado); // Devuelve los detalles de la imagen subida como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al subir la imagen a Cloudinary' });
  }
});

mongoose.connect(
  "mongodb+srv://grupoWeb:grupoWeb@cluster0.1cxeafx.mongodb.net/examenWeb").then(()=>
    console.log("Hemos conectado con mongoDB")
  ).catch((error)=>
    console.error(error)
  )

app.get("/",(req,res) =>{
  res.send("Esta es la API prueba")}
)

app.listen(port, console.log("Servidor Backend escuchando en el puerto ", port))