const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {type: String, required: true, trim: true},
    correo: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true},
    rol: {type: String, default: 'lector', enum: ['lector', 'admin']}
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);