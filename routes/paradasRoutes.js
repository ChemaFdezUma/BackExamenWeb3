const express = require("express");
const router = express.Router();

const paradasSchema = require("../models/paradas.js");

//get all
router.get("/", (req, res) => {
  paradasSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//get by id
router.get("/:id", (req, res) => {
  paradasSchema
    .findById(req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//post
router.post("/", (req, res) => {
  const parada = new paradasSchema({
    codLinea: req.body.codLinea,
    nombreLinea: req.body.nombreLinea,
    sentido: req.body.sentido,
    orden: req.body.orden,
    codParada: req.body.codParada,
    nombreParada: req.body.nombreParada,
    direccion: req.body.direccion,
    lon: req.body.lon,
    lat: req.body.lat,
  });
  parada
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//delete
router.delete("/:id", (req, res) => {
  paradasSchema
    .findByIdAndDelete(req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//update
router.put("/:id", (req, res) => {
  paradasSchema
    .findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;


