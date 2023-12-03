import Invite from '../components/Invite';
import NewProjectForm from './NewProjectForm';
import "./Instructions.css";

function Instructions() {
    return (
        <div>
            <img className="imagen-fondo" src="/clouds.jpeg" alt="Clouds" />
            <img className="imagen-fondo2" src="/clouds.jpeg" alt="Clouds" />
            <img className="imagen-fondo3" src="/clouds.jpeg" alt="Clouds" />
            <img className="imagen-fondo4" src="/clouds.jpeg" alt="Clouds" />
            <img className="imagen-fondo5" src="/clouds.jpeg" alt="Clouds" />
            <img className="imagen-fondo6" src="/clouds.jpeg" alt="Clouds" />
          
            <div className="blanco7"></div>
            <br></br>
            <br />
            <h1 className='Texto4'>Instrucciones</h1>
            <h2 className='Texto4'>Elegir proyecto</h2>
                <p className="Texto2">Dentro de la pagina principal puedes ver tus proyectos ordenados </p>
                <img src="/pblanco.png" alt="Proyecto Blanco" className="imagen-centrada" />
                <p className="Texto2">Aqui puedes presionar un proyecto para seleccionarlo y ver su contenido</p>
                <br />
            <h2 className='Texto4'>Crear proyecto</h2>
                <p className="Texto3">Al presionar el boton:</p>
                <button className="create-button">Crear proyecto</button>
                <p className="Texto3">se generara el siguiente formulario</p>
                <div className="create-project-column">
                    <NewProjectForm />
                </div>
                <p className="Texto2">Al ser rellenados y presionar el boton, se creara un nuevo proyecto</p>
                <br />
            <h2 className='Texto4'>Modificar proyecto</h2>
                <p className="Texto2">Dentro de un proyecto, si eres el administrador del proyecto, podras ver las opciones de</p>
                <p className="Texto2">- Modificar el nombre del proyecto</p>
                <p className="Texto2">- Agregar o modificar la fecha de termino</p>
                <p className="Texto2">- Designar a un miembro como administrador del proyecto</p>
                <br />
            <h2 className='Texto4'>Ver tareas de un proyecto</h2>
                <p className="Texto2">Dentro de un proyecto, sus tareas apareceran ordenadas dependiendo de su estado</p>
                <img src="/lista_tareas.png" />
                <p className="Texto2">Las tareas son identificables por su nombre, y se pueden arrastrar de una categoria a otra para actualizar su progreso actual</p>
                <p className="Texto2">(Esto provocaria un cambio para todos los usuarios que colaboren en este proyecto)</p>
                <br />
            <h2 className='Texto4'>Crear tareas</h2>
                <p className="Texto2">Dentro de un proyecto, se pueden crear tareas a traves del boton</p>
                <button className="create-button">Crear Tarea</button>
                <p className="Texto2">Este abrira un formulario donde se escriba el nombre de la tarea, y se agrege a la seccion "Por hacer"</p>
                <br />
            <h2 className='Texto4'>Modificar tareas</h2>
                <p className="Texto2">Al presionar sobre una tarea, se daran las siguientes opciones</p>
                <p className="Texto2">- cambiar el nombre de la tarea</p>
                <p className="Texto2">- agregar/cambiar la persona asignada</p>
                <p className="Texto2">- eliminar la tarea</p>
                <br />
            <h2 className='Texto4'>Invitar a un proyecto</h2>
                <p className="Texto2">Dentro de un proyecto, puedes encontrar el boton</p>
                <button>Invitar</button>
                <p className="Texto2">se generara el siguiente formulario</p>
                <div className="form">
                    <Invite />
                </div>
                <p className="Texto2">con los botones "Invite More" y "Invite Less", puedes ajustar el numero de personas que deseas invitar</p>
                <p className="Texto2">una vez rellenado, al presionar "Send" se enviaran las invitaciones a colaborar a todas las personas indicadas</p>
                <br />
            <h2 className='Texto4'>Recibir invitacion a un proyecto</h2>
                <p className="Texto2">Puedes acceder a tus invitaciones recibidas a traves de la barra de navegacion</p>
                <p className="Texto2">se mostrara podras ver todas las invitaciones del tipo</p>
                <div className="form">
                    <div className="H_Container">
                        <p className="Texto3">has sido invitado por </p>
                        <p className="SpecialText">Usuario</p>
                    </div>
                    <div className="H_Container">
                        <p className="Texto3">a colaborar en </p>
                        <p className="SpecialText">Proyecto</p>
                    </div>
                    <div className="H_Container">
                        <button className="Texto3">Aceptar</button>
                        <button className="Texto3">Rechazar</button>
                    </div>
                </div>
                <p className="Texto2">donde el texto en rojo, sera reemplazado por el nombre del usuario que te invito y el nombre del proyecto.</p>
                <p className="Texto2">Si escoges Aceptar, te uniras al proyecto. Si eliges Rechazar, la invitacion se dejara de mostrar.</p>
                <br />
            <h2 className='Texto4'>Editar cuenta personal</h2>
                <p className="Texto2">A travez de la barra de navegacion, puedes ingresar a la configuracion de tu cuenta</p>
                <p className="Texto2">en este lugar, puedes editar tu informacion personal (username & password)</p>
        </div>
    )
}

export default Instructions;