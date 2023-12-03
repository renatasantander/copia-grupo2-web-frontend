import React, { useContext, useState, useEffect } from 'react';
import './EditTarea.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../auth/AuthContext";

function GetTarea() {
    const { tareaId } = useParams();
    const [ tarea, setTarea ] = useState([]);
    const [ formData, setFormData ] = useState('');
    const [ user, setUser ] = useState({});
    const [ etiquetas, setEtiquetas ] = useState([]);
    const { token } = useContext(AuthContext);
    const [ successMessage, setSuccessMessage ] = useState('');
    const [ editMode, setEditMode ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/tareas/${tareaId}`)
        .then((response) => {
            setTarea(response.data);
            // obtener el usuario asignado a la tarea
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${response.data.usuarioId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
            })
            .then((usuarioResponse) => {
                setUser(usuarioResponse.data);
            })
            .catch((error) => {
                console.log(error);
            });
            // obtener etiquetas de tarea
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/etiquetas/tareas/${tareaId}`)
            .then((etiquetasResponse) => {
                setEtiquetas(etiquetasResponse.data);
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }, [tareaId]);

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleAddEtiqueta = (event) => {
        event.preventDefault();
        if (!formData.nombre || formData.nombre.trim() === '') {
            return;
        }
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/etiquetas`, {
            nombre: formData.nombre,
            tareaId: tareaId,
        })
        .then((response) => {
            setEtiquetas([...etiquetas, response.data]);
            setFormData({ nombre: '' });
        })
        .catch((error) => {
            console.log(error);
        });
    };
        
    const dateObj = new Date(tarea.fecha);
    const day = dateObj.getUTCDate().toString().padStart(2, '0');
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getUTCFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    return (
        <div>
            <img className="imagen-fondo" src="/clouds.jpeg" alt="Clouds" />
            <div className="blanco-fondo">
                <div className="ContenedorLogo">
                    <img className="Capra021" src="/capra.png" alt="Capra" />
                </div>
                <div className="contenedor-titulo">
                    <div className="titulo">Detalle Tarea</div>
                </div>

                <div className="contenedor-cuerpo">

                    <div className="task-info">
                        <p>Título: {tarea.titulo}</p>
                        <p>Usuario Asignado: {user.username}</p>
                        <p>Fecha: {formattedDate}</p>
                        <p>Comentario: {tarea.comentario}</p>
                        <p>Estado: {tarea.estado}</p>
                    </div>
                    
                    <div className="etiquetas-container">
                        <div className="etiquetas-title">Etiquetas</div>
                        <div className="etiquetas">
                            {etiquetas.map((etiqueta) => (
                            <span key={etiqueta.id} className="etiqueta">
                                {etiqueta.nombre}</span>
                            ))}
                        </div>
                        <div className="agregar-etiqueta">
                            <input
                                type="text"
                                placeholder="Agregar etiqueta"
                                value={formData.nombre || ''}
                                onChange={handleInputChange}
                                name="nombre"
                            />
                            <button className="agregar-etiqueta-button" onClick={handleAddEtiqueta}>+</button>
                        </div>
                    </div>
                    
                    <div className="button-container">
                        <button onClick={() => navigate(`/proyecto/${tarea.proyectoId}`)}>Volver</button>
                        <button onClick={() => navigate(`/tarea/${tareaId}/editar`)}>Editar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetTarea;
