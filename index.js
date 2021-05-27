const express = require('express');
const routes = require('./routes');
const path = require('path');





const app = express();

//Static files
app.use(express.static('public'));

//PUG
app.set('view engine', 'pug');


//Add views folder
app.set('views', path.join(__dirname, './views')); 

app.use('/', routes());


app.listen(3000, () => console.log('server on port: 3000'));
