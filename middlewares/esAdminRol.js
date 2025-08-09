const esAdminRol = (req, res, next) => {
    //Verificamos el usuario cargado desde el middleware de validarJWT
    if (!req.usuario) {
        return res.status(500).json({
            mensaje: 'Se requiere verificar el rol sin validar el token primero'
        });
    }

    const {rol, nombre} = req.usuario;

    if (rol !== 'admin') {
        return res.status(403).json({
            mensaje: `${nombre} no es administrador - No puede realizar esta acción`
        });
    }
    next();
}

module.exports = esAdminRol;