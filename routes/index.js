const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

module.exports = function () {
    // Route for home
    router.get('/', projectsController.homeProject);

    return router;

} 


