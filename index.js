const express = require('express');
const routes = require('./routes');
const path = require('path');
const expressValidator = require("express-validator");
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');


// helpers
const helpers = require('./helpers');


//Connection with DB
const db = require('./config/db');

//Importar los modelos
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
.then(() => console.log('Conectado al Servidor'))
.catch(error => console.log(error));

//configuration
const app = express();
const port = process.env.PORT?process.env.PORT:3000;


//Read the data in the console with bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator());
//Static files
app.use(express.static('public'));
//PUG
app.set('view engine', 'pug');
//Add views folder
app.set('views ', path.join(__dirname, './views'));

// Agregar flash message
app.use(flash());

app.use(cookieParser());

// Sessions 
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Use vardump
app.use((req, res, next) => {
    const date = new Date();
    res.locals.year = date.getFullYear();
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    
    next();
});



app.use('/', routes());


app.listen(port, ()=>{
    console.log(`Server on on port: ${port}`);
});