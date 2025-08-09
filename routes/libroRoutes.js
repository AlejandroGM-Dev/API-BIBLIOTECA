const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const validarCampos = require('../middlewares/validarCampos');
const validarJWT = require('../middlewares/validarJWT');
const esAdminRol = require('../middlewares/esAdminRol')

const {
    obtenerLibros,
    obtenerLibrosPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro
} = require('../controllers/libroController');
//<--------------------------------------------

//Rutas publicas
router.get('/', obtenerLibros);

router.get('/:id', [
    check('id', 'ID no valido').isMongoId(),
    validarCampos
],obtenerLibrosPorId);

//Rutas protegidas para usuarios autenticados
router.post('/',[
    validarJWT,
    esAdminRol,
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('autor', 'El autor es obligatorio').not().isEmpty(),
    check('isbn', 'El ISBN es obligatorio').not().isEmpty(),
    validarCampos
], crearLibro);

router.put('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'ID no valido').isMongoId(),
    check('titulo').optional().not().isEmpty().withMessage('Titulo no puede estar vacio'),
    check('autor').optional().not().isEmpty().withMessage('Autor no puede estar vacio'),
    check('isbn').optional().not().isEmpty().withMessage('ISBN no puede estar vacio'),
    validarCampos
], actualizarLibro);

router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'Id no valido').isMongoId(),
    validarCampos
], eliminarLibro);

module.exports = router;