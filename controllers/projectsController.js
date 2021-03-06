const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.homeProject = async (req, res) => {
    
    // console.log(res.locals.usuario);

    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: { usuarioId }});

    res.render('index', {
        nombrePagina : 'Proyectos ' + res.locals.year,
        proyectos
    });
}

exports.formProject = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: { usuarioId }});

    res.render('nuevoProyecto', {
        nombrePagina : 'Nuevo Proyecto',
        proyectos
    });
}


exports.newProject = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: { usuarioId }});

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
        const usuarioId = res.locals.usuario.id;
        await Proyectos.create({ nombre, usuarioId });
        res.redirect('/');
    }
}


exports.urlProject = async (req, res, next) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({where: { usuarioId }});
    const projectPromise = Proyectos.findOne({
        where: {
            url: req.params.url,
            usuarioId
        }
    });
    
    const [ proyectos, project ] = await Promise.all([proyectosPromise, projectPromise]);

    // consultar tareas del Proyecto actual
    // console.log(project);
    const tareas = await Tareas.findAll({
        where: {
            proyectoId: project.id
        },
        // include: [
        //     {model: Proyectos}
        // ]
    })
    
    !project 
    ? next()  
    
    : res.render('tareas', {
        nombrePagina : 'Tareas del Proyecto',
        project,
        proyectos,
        tareas
    });
}

exports.editForm = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({where: { usuarioId }});
    const projectPromise = Proyectos.findOne({
        where: {
            id: req.params.id,
            usuarioId
        }
    });
    
    const [ proyectos, project ] = await Promise.all([proyectosPromise, projectPromise]);
    res.render('nuevoProyecto', {
        nombrePagina : 'Editar Proyecto',
        proyectos,
        project
    });
}




exports.updateProject = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: { usuarioId }});

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
        await Proyectos.update(
            { nombre: nombre },
            { where: { id: req.params.id }}
            );
        res.redirect('/');
    }
}

exports.deleteProject = async (req, res, next) => {
    // req.query o req.params
    // console.log(req.query);
    const {urlProject} = req.query;

    const response = await Proyectos.destroy({where: { url: urlProject}});

    if(!response) {
        return next();
    }

    res.send('El proyecto se ha eliminado correctamente!');

}

