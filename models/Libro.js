const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    autor: {type: String, required: true},
    isbn: {type: String, required: true, unique: true},
    publicado: {type: Date},
    disponible: {type: Boolean, default: true}
}, {timestamps: true});

module.exports = mongoose.model('Libro', libroSchema);