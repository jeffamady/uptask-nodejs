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
        projectsController.newProject);

    return router;

}


