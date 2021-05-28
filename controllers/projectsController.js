const Proyectos = require('../models/Proyectos');

exports.homeProject = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('index', {
        nombrePagina : 'Proyectos ' + res.locals.year,
        proyectos
    });
}

exports.formProject = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('nuevoProyecto', {
        nombrePagina : 'Nuevo Proyecto',
        proyectos
    });
}


exports.newProject = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    const { nombre } = req.body;

    let errores = [];


    if (!nombre) {
        errores.push({'texto': 'Agrega un Nombre al Proyecto'});
    }

    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina : 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        //No errors 
        // Push on DB
        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');
    }
}


exports.urlProject = async (req, res, next) => {
    const proyectos = await Proyectos.findAll();
    
    const project = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    !project 
        ? next()  

        : res.render('tareas', {
            nombrePagina : 'Tareas del Proyecto',
            project,
            proyectos
        });



}