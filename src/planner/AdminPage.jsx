import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from 'react-router-dom';

function AdminPage(){
	const { token } = useContext(AuthContext);
	const [ is_admin, setAdmin ] = useState(false);
	const [ users, setUsers ] = useState([]);
	const [ proyects, setProyects ] = useState([]);
	const [ tasks, setTasks ] = useState([]);
	const [ notices, setNotices ] = useState([]);
	const navigate = useNavigate();
	axios.get(`${import.meta.env.VITE_BACKEND_URL}/scope-example/protectedadmin`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
	.then((response) => {
		setAdmin(true);
	})
	.catch((userInfoError) => {
        navigate('/pagina-principal');
    });
	
	useEffect(() => {
		const fetchAll = () => {
			if (is_admin) {
				axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios`, {
					headers: {
						'Authorization': `Bearer ${token}`
					},
				})
				.then((userResponse) => {
					setUsers(userResponse.data);
				})
				.catch((userError) => {
					window.alert('Error obteniendo informacion de usuarios');
				});

				axios.get(`${import.meta.env.VITE_BACKEND_URL}/proyectos`, {
					headers: {
						'Authorization': `Bearer ${token}`
					},
				})
				.then((proyectResponse) => {
					setProyects(proyectResponse.data);
				})
				.catch((proyectError) => {
					window.alert('Error obteniendo informacion de proyectos');
				});

				axios.get(`${import.meta.env.VITE_BACKEND_URL}/tareas`, {
					headers: {
						'Authorization': `Bearer ${token}`
					},
				})
				.then((taskResponse) => {
					setTasks(taskResponse.data);
				})
				.catch((taskError) => {
					window.alert('Error obteniendo informacion de tareas');
				});

				axios.get(`${import.meta.env.VITE_BACKEND_URL}/notificaciones`, {
					headers: {
						'Authorization': `Bearer ${token}`
					},
				})
				.then((noticeResponse) => {
					setNotices(noticeResponse.data);
				})
				.catch((noticeError) => {
					window.alert('Error obteniendo informacion de notificaciones');
				});
			}
		};

		fetchAll();
	}, [is_admin]);

	const Erase = (table, key) => {
		axios.delete(`${import.meta.env.VITE_BACKEND_URL}/${table}/${key}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        })
		.then((response) => {
			console.log("Eliminacion exitosa");
		})
		.catch((error) => {
            window.alert("Fallo la conexion con servidor, intenta denuevo mas tarde");
		})
	};

	return (
		<div className="grid-container">
            <div className="column">
				<div className="filter-title">Usuarios</div>
				{users.map((user) => (
					<div key={user.id}>
						<div>{user.username}</div>
						<div>{user.mail}</div>
						<div>
							<button onClick={() => Erase('usuarios', user.id)}>Eliminar</button>
						</div>
					</div>
				))}
			</div>
			<div className="column">
				<div className="filter-title">Proyectos</div>
				{proyects.map((proyect) => (
					<div key={proyect.id}>
						<div>{proyect.titulo}</div>
						<div>{proyect.estado}</div>
						<div>
							<button onClick={() => Erase('proyectos', proyect.id)}>Eliminar</button>
						</div>
					</div>
				))}
			</div>
			<div className="column">
				<div className="filter-title">Tareas</div>
				{tasks.map((task) => (
					<div key={task.id}>
						<div>{task.titulo}</div>
						<div>{task.fecha}</div>
						<div>{task.estado}</div>
						<div>
							<button onClick={() => Erase('tareas', task.id)}>Eliminar</button>
						</div>
					</div>
				))}
			</div>
			<div className="column">
				<div className="filter-title">Notificaciones</div>
				{notices.map((notice) => (
					<div key={notice.id}>
						<div>{notice.tipo}</div>
						<div>{notice.mensaje}</div>
						<div>
							<button onClick={() => Erase('notificaciones', notice.id)}>Eliminar</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default AdminPage;