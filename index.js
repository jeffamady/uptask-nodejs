const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

// helpers
const helpers = require('./helpers');


//Connection with DB
const db = require('./config/db');

//Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');

db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error));

//configuration
const app = express();
const port = process.env.PORT?process.env.PORT:3000;


//PUG
app.set('view engine', 'pug');
//Add views folder
app.set('views', path.join(__dirname, './views'));
//Static files
app.use(express.static('public'));

// Use vardump
app.use((req, res, next) => {
    const date = new Date();
    res.locals.year = date.getFullYear();
    res.locals.vardump = helpers.vardump;
    next();
});

//Read the data in the console with bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/', routes());


app.listen(port, ()=>{
    console.log(`Server on on port: ${port}`);
});