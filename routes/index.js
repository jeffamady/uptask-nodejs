const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

module.exports = function () {
    // Route for home
    router.get('/', projectsController.homeProject);

    router.get('/nuevo-proyecto', projectsController.formProject);

    router.post('/nuevo-proyecto', projectsController.newProject);

    return router;

}


