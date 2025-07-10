const express = require('express');
const router = express.Router();

const {
    obtenerLibros,
    obtenerLibrosPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro
} = require('../controllers/libroController');

router.get('/', obtenerLibros);
router.get('/:id', obtenerLibrosPorId);
router.post('/', crearLibro);
router.put('/:id', actualizarLibro);
router.delete('/:id', eliminarLibro);

module.exports = router;