const express = require("express");
const router = express.Router();
const axios = require("axios");
// const paradasSchema = require("../models/paradas.js");

// //get all
// router.get("/", (req, res) => {
//   paradasSchema
//     .find()
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error }));
// });

// //get by id
// router.get("/:id", (req, res) => {
//   paradasSchema
//     .findById(req.params.id)
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error }));
// });

// //post
// router.post("/", (req, res) => {
//   const parada = new paradasSchema({
//     codLinea: req.body.codLinea,
//     nombreLinea: req.body.nombreLinea,
//     sentido: req.body.sentido,
//     orden: req.body.orden,
//     codParada: req.body.codParada,
//     nombreParada: req.body.nombreParada,
//     direccion: req.body.direccion,
//     lon: req.body.lon,
//     lat: req.body.lat,
//   });
//   parada
//     .save()
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error }));
// });

// //delete
// router.delete("/:id", (req, res) => {
//   paradasSchema
//     .findByIdAndDelete(req.params.id)
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error }));
// });

// //update
// router.put("/:id", (req, res) => {
//   paradasSchema
//     .findByIdAndUpdate(req.params.id, req.body)
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error }));
// });

// // get todos las paradas en la linea x a sentido y
// router.get("/linea/:codLinea/sentido/:sentido", (req, res) => {
//   paradasSchema
//     .find({ codLinea: req.params.codLinea, sentido: req.params.sentido })
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error }));
// });

// // get paradas por parte de nombre
// router.get("/nombre/:nombreParada", (req, res) => {
//   paradasSchema
//     .find({ nombreParada: { $regex: req.params.nombreParada } })
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error }));
// });

// //get paradas que esten a menos de 0,003 grados de longitud y latitud de la direccion X
// router.get("/direccion/:direccion", async (req, res) => {
//     const { direccion } = req.params;
//     console.log(direccion)
//         const respuesta = await axios.get(`https://nominatim.openstreetmap.org/search?q=${direccion}&format=json&limit=1`).then((response) => {
//         const lat = response.data[0].lat
//           const lon = response.data[0].lon
//           paradasSchema.find({ lat: { $gte: lat - 0.003, $lte: lat + 0.003 }, lon: { $gte: lon - 0.003, $lte: lon + 0.003 } })
//               .then((data) => res.json(data))
//               .catch((error) => res.json({ message: error }));
//         }).catch((error) => { console.log(error) });
       

//     }

// );
const eventoSchema = require("../models/eventos");

//CRUD EVENTOS
//Get
router.get("/", async (req, res) => {
    eventoSchema.find().then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

//Get by id
router.get("/:id", async (req, res) => {
    eventoSchema.findById(req.params.id).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

//Post
router.post("/", async (req, res) => {
    eventoSchema.create(req.body).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

//Put
router.put("/:id", async (req, res) => {
    eventoSchema.findByIdAndUpdate(req.params.id, req.body).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

//Delete
router.delete("/:id", async (req, res) => {
    eventoSchema.findByIdAndDelete(req.params.id).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

//Get eventos que esten a una distancia de menos de 0.2 unidades de latitud y longitud, ordenados por timestamp
router.get("/cercanos/:lat/:lon", async (req, res) => {
    const { direccion } = req.params;
    console.log(direccion);
    await axios.get(`https://nominatim.openstreetmap.org/search?q=${direccion}&format=json&limit=1`).then((response) => {

        const { lat, lon } = response.data[0];
        eventoSchema.find({
            lat: { $gt: lat - 0.2, $lt: lat + 0.2 },
            lon: { $gt: lon - 0.2, $lt: lon + 0.2 }
        }).sort({ timestamp: 1 }).then((data) => {
            res.json(data);
        }).catch((error) => {
            res.status(500).json({ error: error.message });
        });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

module.exports = router;
module.exports = router;


