import axios from 'axios';

const tareas = document.querySelector('.listado-pendientes');

if (tareas) {

    tareas.addEventListener('click', ({target}) => {
        if(target.classList.contains('fa-check-circle')) {
            const icono = target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            // console.log(idTarea);
            // Request hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`
            // console.log(url);

            axios.patch(url, { idTarea })
                .then(function(respuesta){
                    if(respuesta.status === 200){
                         icono.classList.toggle('completo');
                    }
                })

        }
    });


}

export default tareas;