const express = require('express');
const {check} = require('express-validator');
const {registrarUsuario, loginUsuario, perfilUsuario, listarUsuarios} = require('../controllers/userController')
const validarCampos = require('../middlewares/validarCampos');
const validarJWT = require('../middlewares/validarJWT.js');
const esAdminRol = require('../middlewares/esAdminRol.js');

const router = express.Router();
//<--------------------------------------------

//Validamos campos antes de ejecutar registrarUsuario
router.post('/register', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'Correo no valido').isEmail(),
    check('password', 'Minimo 6 caracteres').isLength({min: 6}),
    validarCampos
], registrarUsuario);

//Validamos login antes de ejecutar loginUsuario
router.post('/login', [
    check('correo', 'Correo requerido').isEmail(),
    check('password', 'Contraseña requerida').not().isEmpty(),
    validarCampos
], loginUsuario);

//Ruta protegida
router.get('/perfil', validarJWT, perfilUsuario);

//listar todos los usuarios
router.get('/', [
    validarJWT,
    esAdminRol
    ], listarUsuarios);

module.exports = router;