const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req, res, next) => {
    const proyecto = await Proyectos.findOne({where: { url: req.params.url }});

    // Leer el valor del input
    const {tarea} = req.body;
    
    // Estado 0 = incompleto y ID de Proyecto
    const estado = 0;
    const proyectoId = proyecto.id;

    //Insertar in la base de datos
    const resultado = await Tareas.create({ tarea, estado, proyectoId });

    if(!resultado) {
        next();
    }

    // Redireccionar
    res.redirect(`/proyectos/${req.params.url}`)
}