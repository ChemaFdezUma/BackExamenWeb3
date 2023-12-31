const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose")
const multer = require('multer');
const fileUpload = multer();
const cloudinary = require('cloudinary');

const app = express();
const port = 5001;
app.use(express.json());
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  headers: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
};
app.use(cors(corsOptions));
cloudinary.config({
  cloud_name: 'dgqruvvjr',
  api_key: '961825855861132',
  api_secret: 'OMToah82AGwg_ZlI5FiSZ2IYQOU'
});

const logConexionesRoutes = require("./routes/logConexionsRoutes");
const pardasRoutes = require("./routes/paradasRoutes");
app.use("/logConexiones", logConexionesRoutes);
app.use("/paradas", pardasRoutes);
const eventosRoutes = require("./routes/eventosRoutes");
app.use("/eventos", eventosRoutes);

app.post('/subir', fileUpload.single('imagen'), function (req, res, next) {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        (result, error) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  async function upload(req) {
    try {
      let result = await streamUpload(req);
      res.status(200).json({ message: 'Imagen subida correctamente', imageUrl: result.url });
    } catch (error) {
      console.log('Error al subir la imagen: ', error)
      res.status(500).json({ message: 'Error al subir la imagen:', error });
    }
  }

  upload(req);
});

app.get("/comprobar/:tokenId/:token", verificarConexion = async (req, res) => {
  try {
    const { tokenId, token } = req.params;
    var userObjetct = jwtDecode(token)
    var epochExpire = new Date((userObjetct.exp + 3600) * 1000)

    var fechaActual = new Date()
    fechaActual.setHours(fechaActual.getHours() + 1);

    console.log(fechaActual)

    if (tokenId == userObjetct.jti) {
      if (epochExpire < fechaActual) {
        res.send("expired");
      } else {
        res.send("ok");
      }
    } else {
      res.send("invalid token")
    }


  } catch (error) {
    console.log('Error en la consulta de usuarios en la base de datos: ', error)
    res.status(500).json({ message: 'Error al obtener el usuarios' })
  }
});

mongoose.connect(
  "mongodb+srv://grupoWeb:grupoWeb@cluster0.1cxeafx.mongodb.net/examenWeb").then(() =>
    console.log("Hemos conectado con mongoDB")
  ).catch((error) =>
    console.error(error)
  )

app.get("/", (req, res) => {
  res.send("Esta es la API prueba")
}
)

app.listen(port, console.log("Servidor Backend escuchando en el puerto ", port))