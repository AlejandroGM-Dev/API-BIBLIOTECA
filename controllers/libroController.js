const Libro = require('../models/Libro');

const obtenerLibros = async (req, res) => {
    const libros = await Libro.find();
    res.json(libros);
};

const obtenerLibrosPorId = async (req, res) => {
    const libro = await Libro.findById(req.params.id);
    if(!libro) return res.status(404).json({mensaje: 'Libro no encontrado'});
    res.json(libro);
}

const crearLibro = async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.status(201).json(nuevoLibro);
    } catch (error) {
        res.status(400).json({mensaje: 'Error al crear libro', error});
    }
};

const actualizarLibro = async (req, res) => {
    const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!libro) return res.status(404).json({mensaje: 'Libro no encontrado'});
    res.json(libro);
}

const eliminarLibro = async (req, res) => {
    const libro = await Libro.findByIdAndDelete(req.params.id);
    if(!libro) return res.status(404).json({mensaje: 'Libro no encontrado'});
    res.json({mensaje: 'Libro eliminado correctamente'});
}

module.exports = {
    obtenerLibros,
    obtenerLibrosPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro
};