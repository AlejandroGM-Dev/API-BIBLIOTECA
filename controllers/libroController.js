const Libro = require('../models/Libro');

//<--------------------------------------------


//Controladores publicos
const obtenerLibros = async (req, res) => {
    try {
        const libros = await Libro.find().sort({createdAt: -1});
        res.json(libros);
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: 'Error al obtener libros', error: error.mensaje});
    }
};

const obtenerLibrosPorId = async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        if(!libro) return res.status(404).json({mensaje: 'Libro no encontrado'});
        res.json(libro);
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: 'Error al obtener libro', error: error.mensaje});
    }
}

//Controladores protegidos
const crearLibro = async (req, res) => {
    try {
        //Validar el ISBN unico
        const {isbn} = req.body;
        if (isbn) {
            const existe = await Libro.findOne({isbn});
            if (existe) return res.status(400).json({mensaje: 'ISBN ya registrado'});
        }

        //Creamos el libro
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.status(201).json(nuevoLibro);
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: 'Error al crear libro', error: error.mensaje});
    }
};

const actualizarLibro = async (req, res) => {
    try {
        const {id} = req.params;
        const {isbn} = req.body;

        //Verificacion de cambio ISBN para que no pertenezca a otro libro
        const existe = await Libro.findOne({isbn, _id: {$ne: id}});
        if (existe) return res.status(400).json({ mensaje: 'ISBN ya registrado por otro libro' });

        const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!libro) return res.status(404).json({mensaje: 'Libro no encontrado'});
        res.json(libro);
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: 'Error al actualizar libro', error: error.mensaje});
    }
}

const eliminarLibro = async (req, res) => {
    try {
        const libro = await Libro.findByIdAndDelete(req.params.id);
        if(!libro) return res.status(404).json({mensaje: 'Libro no encontrado'});
        res.json({mensaje: 'Libro eliminado correctamente'});
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: 'Error al eliminar el libro', error: error.mensaje});
    }
}

module.exports = {
    obtenerLibros,
    obtenerLibrosPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro
};