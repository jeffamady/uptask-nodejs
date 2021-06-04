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

exports.cambiarEstadoTarea = async (req, res, next) => {
    // console.log(req.params);
    const { id } = req.params;
    const tarea = await Tareas.findOne({where: { id }});
    // console.log(tarea);

    // cambiar el estado
    let estado = 0;
    if(tarea.estado === estado) {
        estado = 1;
    }
    tarea.estado = estado;
    
    const resultado = await tarea.save();
    
    if(!resultado) return next();

    res.status(200).send('Actualizado');
}

exports.eliminarTarea = async (req, res, next) => {
    const { id } = req.params;
    // Eliminar ña tarea 
    const resultado = await Tareas.destroy({where: { id }});

    if(!resultado){
        return next();
    }
    
    res.status(200).send('Tarea Eliminada!');
}