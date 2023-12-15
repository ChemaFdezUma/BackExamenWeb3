// nombre nombre o título del evento (texto corto).
// timestamp fecha y hora a la que comienza el evento.
// lugar dirección postal del evento (texto corto).
// lat, lon coordenadas GPS del lugar.
// organizador email del usuario que ha creado el evento.
// imagen imagen o URI de una imagen promocional del evento.

const mongoose = require("mongoose");
const eventoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    lugar: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required: true
    },
    organizador: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Evento", eventoSchema);
