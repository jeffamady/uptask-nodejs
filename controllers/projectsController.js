const Proyectos = require('../models/Proyectos');

exports.homeProject = (req, res) => {
    res.render('index', {
        nombrePagina : 'Proyectos'
    });
}

exports.formProject = (req, res) => {
    res.render('nuevoProyecto', {
        nombrePagina : 'Nuevo Proyecto'
    });
}


exports.newProject = async (req, res) => {
    const { nombre } = req.body;

    let errores = [];


    if (!nombre) {
        errores.push({'texto': 'Agrega un Nombre al Proyecto'});
    }

    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina : 'Nuevo Proyecto',
            errores
        })
    } else {
        //No errors 
        // Push on DB
        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');
    }
}