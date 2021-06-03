const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

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

    return router;

}


