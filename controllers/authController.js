const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
//generar token
const crypto = require('crypto');
const bcrypt = require('bcrypt');


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
    } else{
        usuario.token = crypto.randomBytes(20).toString('hex'); 
        usuario.expiracion = Date.now() + 3600000;
    
        // // Save datas
        await usuario.save();
    
        // // URL reset
        const resetUrl = `http://${req.headers.host}/restablecer/${usuario.token}`;
    
        console.log(resetUrl);
        

    }

}

exports.validarToken = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    });
 
    if(!usuario) {
        req.flash('error', 'No Válido');
        res.redirect('/restablecer');
    }

    res.render('resetPassword', {
        nombrePagina : 'Restablecer Contraseña'
    })
} 


// Cambiar Pass
exports.actualizarPassword = async (req, res) => {
    // Verifica el token valido y tambien la fecha de expiración
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte] : Date.now()
            }
        }
    });
    
    // console.log(usuario);
    if(!usuario) {
        req.flash('error', 'No válido');
        res.redirect('/restablecer');
    }
    
    // Hashear el pass
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10) );
    usuario.token = null;
    usuario.expiracion = null;

    //Guardar el Nuevo pass
    await usuario.save();
    req.flash('correcto', 'Tu password se ha modificado correctamente');
    res.redirect('/iniciar-sesion');

}