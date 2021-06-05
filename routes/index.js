const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');

const authController = require('../controllers/authController');

//import express validator
const { body } = require('express-validator/check');

module.exports = function () {
    // Route for home
    router.get('/',
        authController.usuarioAutentificado,
        projectsController.homeProject
    );

    router.get('/nuevo-proyecto',
        authController.usuarioAutentificado,
        projectsController.formProject
    );

    router.post('/nuevo-proyecto',
        authController.usuarioAutentificado,
        body('nombre').not().isEmpty().trim().escape(),
        projectsController.newProject
    );

    // List project
    router.get('/proyectos/:url',
        authController.usuarioAutentificado,
        projectsController.urlProject
    );

    // Update project
    router.get('/proyecto/editar/:id',
        authController.usuarioAutentificado,
        projectsController.editForm
    );


    router.post('/nuevo-proyecto/:id',
        authController.usuarioAutentificado,
        body('nombre').not().isEmpty().trim().escape(),
        projectsController.updateProject
    );

    // Delete project
    router.delete('/proyectos/:url',
        authController.usuarioAutentificado,
        projectsController.deleteProject
    );


    // Tareas
    router.post('/proyectos/:url',
        authController.usuarioAutentificado,
        body('nombre').not().isEmpty().trim().escape(),
        tareasController.agregarTarea
    );

    // Actualizar tareas
    router.patch('/tareas/:id',
        authController.usuarioAutentificado,
        tareasController.cambiarEstadoTarea
    );
    // Eliminar Terea
    router.delete('/tareas/:id',
        authController.usuarioAutentificado,
        tareasController.eliminarTarea
    );

    // Crear nueva cuenta
    router.get('/crear-cuenta',
        usuariosController.formCrearCuenta
    );
    router.post('/crear-cuenta',
        usuariosController.crearCuenta
    );


    // Iniciar sesion
    router.get('/iniciar-sesion',
        usuariosController.formIniciarSesion
    );
    router.post('/iniciar-sesion',
        authController.autentificarUsuario
    );

    // Cerrar sesion
    router.get('/cerrar-sesion', authController.cerrarSesion);

    //Restablecer password
    router.get('/restablecer', usuariosController.formRestablecerPassword);
    
    router.post('/restablecer', authController.enviarToken);
    
    router.get('/restablecer/:token', authController.resetPassword);

    return router;

}


