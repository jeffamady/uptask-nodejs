const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');

//import express validator
const { body } = require('express-validator/check');

module.exports = function () {
    // Route for home
    router.get('/', projectsController.homeProject);

    router.get('/nuevo-proyecto', projectsController.formProject);

    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        projectsController.newProject
    );
    
    // List project
    router.get('/proyectos/:url', projectsController.urlProject);
    
    // Update project
    router.get('/proyecto/editar/:id', projectsController.editForm);
    
    
    router.post('/nuevo-proyecto/:id', 
    body('nombre').not().isEmpty().trim().escape(),
    projectsController.updateProject
    );

    // Delete project
    router.delete('/proyectos/:url', projectsController.deleteProject);
    
    
    // Tareas
    router.post('/proyectos/:url', 
        body('nombre').not().isEmpty().trim().escape(),
        tareasController.agregarTarea
    );

    // Actualizar tareas
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);
    // Eliminar Terea
    router.delete('/tareas/:id', tareasController.eliminarTarea);
    
    // Crear nueva cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);

    return router;
    
}


