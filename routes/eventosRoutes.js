const express = require('express');
const router = express.Router();
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