import proyectos from './modules/proyectos';
import tareas from './modules/tareas';
import {actualizarAvance} from './functions/avance';


document.addEventListener('DOMContentLoaded', () => {
    actualizarAvance();
})