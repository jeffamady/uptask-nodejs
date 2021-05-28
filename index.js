const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');


//Connection with DB
const db = require('./config/db');

//Importar el modelo
require('./models/Proyectos');

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

//Read the data in the console with bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/', routes());


app.listen(port, ()=>{
    console.log(`Server on on port: ${port}`);
});