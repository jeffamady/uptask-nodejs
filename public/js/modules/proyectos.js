import Swal from 'sweetalert2';
import axios from 'axios';


// id="eliminar-proyecto"

const btnElimininar = document.querySelector('#eliminar-proyecto');

if(btnElimininar) {
    btnElimininar.addEventListener('click', ({target}) => {
        const urlProject = target.dataset.projectUrl;
        // console.log(urlProject);
        
        Swal.fire({
            title: 'Deseas borrar este proyecto?',
            text: "Un proyecto eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI, Borrar!',
            cancelButtonText: 'No, Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {

                // Enviar peticion a axios
                const url = ` ${location.origin}/proyectos/${urlProject}`;
                
                axios.delete(url, { params: {urlProject}})
                    .then(function(response) {
                        console.log(response);
                        // return;
                        Swal.fire(
                            'Eliminado!',
                            response.data,
                            'success'
                        );
            
                        // Redirect at Home
                        setTimeout(() => {
                            window.location.href = '/'
                        } , 3000);
                    })
                    .catch(() => {
                        Swal.fire({
                            type: 'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el Proyecto'
                        })
                    });


            }
          })
    })

}
export default btnElimininar;