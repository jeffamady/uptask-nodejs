const passport = require('passport');

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