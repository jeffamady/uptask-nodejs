const express = require('express');
const router = express.Router();

module.exports = function () {
    // Route for home
    router.get('/', (req, res) => {
        res.send('index');
    });

    router.get('/about', (req, res) => {
        res.send('About us');
    });

    return router;

}


