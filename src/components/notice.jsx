import '../planner/Notifications.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Notice({ notification }){
	const navigate = useNavigate();

	const responder_invitacion = (accepted) => {
		if (accepted == true){ //funcion si la invitacion es aceptada
			axios.patch(`${import.meta.env.VITE_BACKEND_URL}/usuario-proyectos/usuarios/${notification.usuarioId}/proyectos/${notification.proyecto}`,{
				rol: "user",
			})
			.then((response) => {
				axios.delete(`${import.meta.env.VITE_BACKEND_URL}/notificaciones/${notification.id}`)
				window.alert(`La invitación fue aceptada exitosamente`);
				// Recargar la pagina luego de eliminar la notificacion
				navigate(0)
			})
			.catch((error) => {
				window.alert("Fallo la conexión con servidor, intenta denuevo más tarde");
			})
		}
		else { //funcion si la invitacion es rechazada
			axios.delete(`${import.meta.env.VITE_BACKEND_URL}/usuario-proyectos/usuarios/${notification.usuarioId}/proyectos/${notification.proyecto}`,{})
			.then((response) => {
				axios.delete(`${import.meta.env.VITE_BACKEND_URL}/notificaciones/${notification.id}`)
				window.alert(`La invitación fue rechazada exitosamente`);
				navigate(0)
			})
			.catch((error) => {
				window.alert("Fallo la conexión con servidor, intenta denuevo más tarde");
			})
		}
	};

	const leer = () => {
		axios.patch(`${import.meta.env.VITE_BACKEND_URL}/notificaciones/${notification.id}`,{
			leido: true,
		})
		.then((response) => {
			console.log("cambio a estado leido exitoso");
		})
		.catch((error) => {
            window.alert("Fallo la conexion con servidor, intenta denuevo mas tarde");
		})
	};

	if (notification.tipo == "Invitacion"){
		return (
			<div className="Notification">
                <div className="NotificationType">{notification.tipo}</div>
                <div className="NotificationText">{notification.mensaje}</div>
				<div>
					{/* <button onClick={() => leer()}>Ocultar</button> */}
					<button onClick={() => responder_invitacion(false)}>Rechazar</button>
					<button onClick={() => responder_invitacion(true)}>Aceptar</button>
				</div>
            </div>
		);
	}
	else {
		return (
			<div className="Notification">
                <div className="NotificationType">{notification.tipo}</div>
                <div className="NotificationText">{notification.mensaje}</div>
				<div>
					<button onClick={() => leer()}>Ocultar</button>
				</div>
            </div>
		);
	}
}

export default Notice;