const jwt = require('jsonwebtoken');
const User = require('../models/User');
//<--------------------------------------------

//Funcion para validar el JWT
const validarJWT = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({mensaje: 'No hay token en la peticion'});
    }

    try {
        //Verificamos token
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        //Buscamos usuario por ID
        const usuario = await User.findById(uid);
        req.usuario = usuario;

        if (!usuario) {
            return res.status(401).json({
                mensaje: 'Token no válido - usuario no existe'
            });
        }

        next();
    } catch(error) {
        return res.status(401).json({mensaje: 'Token invalido'});
    }
};

module.exports = validarJWT;