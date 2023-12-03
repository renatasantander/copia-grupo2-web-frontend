import React, { useContext, useState, useEffect } from 'react';
import './EditTarea.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../auth/AuthContext";

function EditTarea() {
    const { tareaId } = useParams();
    const [ tarea, setTarea ] = useState([]);
    const [ formData, setFormData ] = useState('');
    const [ user, setUser ] = useState({});
    const [ etiquetas, setEtiquetas ] = useState([]);
    const { token } = useContext(AuthContext);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ successMessage, setSuccessMessage ] = useState('');
    const [ editMode, setEditMode ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/tareas/${tareaId}`)
        .then((response) => {
            setTarea(response.data);
            setFormData({ 
                titulo: response.data.titulo, 
                fecha: response.data.fecha, 
                estado: response.data.estado, 
                comentario: response.data.comentario 
            });
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

    const handleEdit = (event) => {
        event.preventDefault();

        if (!formData.titulo || formData.titulo.trim() === '') {
            window.alert('El título no puede estar vacío');
            return;
        }

        axios.patch(`${import.meta.env.VITE_BACKEND_URL}/tareas/${tareaId}`, formData)
        .then((response) => {
            setTarea(response.data);
            window.alert('¡Tarea editada exitosamente!');
            setEditMode(false);
        })
        .catch((error) => {
            console.log(error);
            window.alert('Error al editar tarea');
        });
    };

    const handleDeleteTarea = () => {
        const confirmDelete = window.confirm('¿Estás seguro que deseas eliminar esta tarea?');
        if (!confirmDelete) {
            return;
        }
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tareas/${tareaId}`)
        .then((response) => {
            navigate(`/proyecto/${tarea.proyectoId}`, { replace: true });
        })
        .catch((error) => {
            console.log(error);
            window.alert('Error al eliminar tarea');
        });
    };

    const handleDeleteEtiqueta = (etiquetaId) => {
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/etiquetas/${etiquetaId}`)
        .then((response) => {
            setEtiquetas(etiquetas.filter((etiqueta) => etiqueta.id !== etiquetaId));
        })
        .catch((error) => {
            console.log(error);
            window.alert('Error al eliminar etiqueta');
        });
    }

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

                    <div className="form-container">
                        { errorMessage && <b><p>{errorMessage}</p></b> }

                        <form onSubmit={handleEdit} className="edit-form">
                            <label>Título:
                                <input
                                type="text"
                                name="titulo"
                                value={formData.titulo || ''}
                                onChange={handleInputChange}
                                />
                            </label>
                            <label>Fecha:
                                <input
                                type="date"
                                name="fecha"
                                value={formData.fecha || ''}
                                onChange={handleInputChange}
                                />
                            </label>
                            <label>Comentario:
                                <input
                                type="text"
                                name="comentario"
                                value={formData.comentario || ''}
                                onChange={handleInputChange}
                                />
                            </label>
                            <label>Estado:
                                <select
                                name="estado"
                                value={formData.estado || ''}
                                onChange={handleInputChange}
                                >
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="En curso">En curso</option>
                                    <option value="Terminada">Terminada</option>
                                </select>
                            </label>
                            <button type="submit">Guardar Cambios</button>
                        </form>
                    </div>

                    <div className="etiquetas-container">
                        <div className="etiquetas-title">Etiquetas</div>
                        <div className="etiquetas">
                        {etiquetas.map((etiqueta) => (
                        <div key={etiqueta.id} className="etiqueta">
                            <span>{etiqueta.nombre}</span>
                            <button className="delete-etiqueta-button" onClick={() => handleDeleteEtiqueta(etiqueta.id)}>x</button>
                        </div>
                        ))}
                        </div>
                    </div>

                    <div className="button-container">
                        <button onClick={() => navigate(`/tarea/${tareaId}`)}>Volver</button>
                        <button className="delete-button" onClick={handleDeleteTarea}>Eliminar Tarea</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EditTarea;
