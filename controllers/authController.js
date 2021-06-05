const passport = require('passport');
const Usuarios = require('../models/Usuarios');

//generar token
const crypto = require('crypto');

exports.autentificarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos Campos son Obligatorios'
});

exports.usuarioAutentificado = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/iniciar-sesion');
}

// Log out
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');
    })
}

// Tocken
exports.enviarToken = async (req, res) => {
    const usuario = await Usuarios.findOne({where: { email: req.body.email }})

    if(!usuario) {
        req.flash('error', 'No existe esa cuenta')
        res.redirect('/restablecer');
    }

    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    // Save datas
    await usuario.save();

    // URL reset
    const resetUrl = `http://${req.headers.host}/restablecer/${usuario.token}`;

    console.log(resetUrl);
    
}

exports.resetPassword = async (req, res) => {
    res.json(req.params.token);
}