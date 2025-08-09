//Importamos el modelo USER
const User = require('../models/User'); 

//Lo usamos para encricptar contraseñas
const bcrypt = require('bcryptjs');

//Funcion para generar un JWT
const generarJWT = require('../helpers/generarJWT'); 
//<--------------------------------------------


const registrarUsuario = async (req, res) => {
    //Obtenemos los datos por el body
    const {nombre,correo,password} = req.body;

    //Verificamos si ya existe un usuario con el correo
    const existe = await User.findOne({correo});
    if (existe) return res.status(400).json({mensaje: 'Correo ya registrado'}); 

    //Creamos el usuario y encriptamos la contraseña con bcrypt
    const usuario = new User({nombre, correo, password});
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardamos el usuario en la base de datos y generamos su token
    await usuario.save();
    const token = await generarJWT(usuario.id);

    //Respondemos con los datos y el token generado
    res.status(201).json({usuario, token});
}

const loginUsuario = async (req, res) => {
    //Obtenemos los datos por el body
    const {correo, password} = req.body;

    //Verificamos si el correo existe
    const usuario = await User.findOne({correo});
    if (!usuario) return res.status(400).json({mensaje: 'Correo incorrecto'});

    //Comparamos la contraseña ingresada con la guardada
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) return res.status(400).json({mensaje: 'Contraseña incorrecta'});

    //Generamos token y respondemos con los datos del usuario
    const token = await generarJWT(usuario.id);
    res.json({usuario, token});
}

const perfilUsuario = async (req, res) => {
    //Buscamos el usuario por su ID
    const usuario = await User.findById(req.uid).select('-password');
    if (!usuario) return res.status(500).json({mensaje: 'Error al obtener perfil'});


    res.json({mensaje: 'Acceso concedido', usuario});
}

const listarUsuarios = async (req, res) => {
    try{
        const usuarios = await User.find();
        res.json({usuarios});
    } catch (error) {
        res.status(500).json({mensaje: 'Error al obtener usuarios'});
    }
}
module.exports = {registrarUsuario, loginUsuario, perfilUsuario, listarUsuarios};