import axios from 'axios';
import Swal from 'sweetalert2';
import {actualizarAvance} from '../functions/avance';


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


                    actualizarAvance();
                }
            })

        }

        if(target.classList.contains('fa-trash')) {
            // console.log(target);
            const tareaHtml = target.parentElement.parentElement,
            idTarea = tareaHtml.dataset.tarea;

            // console.log(tareaHtml);
            // console.log(idTarea);
            Swal.fire({
                title: 'Deseas borrar esta Tarea?',
                text: "Una tarea eliminada no se puede recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'SI, Borrar!',
                cancelButtonText: 'No, Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    const url = `${location.origin}/tareas/${idTarea}`

                    // Axios Delete
                    axios.delete(url, { params: { idTarea }})
                    .then(function(respuesta){
                        // Eliminar el nodo
                        tareaHtml.parentElement.removeChild(tareaHtml);

                        // OPtional una alerta
                        Swal.fire(
                            'Hecho Tarea Eliminada',
                            respuesta.data,
                            'success'
                            )

                            actualizarAvance();

                        })

                    }
                })




        }


    });


}

export default tareas;