import React, { useContext, useState, useEffect } from 'react';
import './EditTarea.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../auth/AuthContext";

function CrearTarea() {
    const { proyectoId } = useParams();
    const [ formData, setFormData ] = useState('');
    const [ usuarioId, setUsuarioId ] = useState('');
    const { token } = useContext(AuthContext);
    const [ errorMessage, setErrorMessage ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          })
            .then((userInfo) => {
                setUsuarioId(userInfo.data.id);
            })
            .catch((userInfoError) => {
                console.error('Error fetching user info: ', userInfoError);
            });
    }, [token]);

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formData.titulo || formData.titulo.trim() === '') {
            setErrorMessage('El título no puede estar vacío');
            return;
        }
        if (!formData.fecha || formData.fecha.trim() === '') {
            setErrorMessage('Debe establecer una fecha límite');
            return;
        }

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/tareas`, {
            titulo: formData.titulo,
            fecha: formData.fecha,
            estado: 'Pendiente',
            comentario: formData.comentario,
            usuarioId: usuarioId,
            proyectoId: proyectoId
        })
        .then((response) => {
            navigate(`/proyecto/${proyectoId}`);
        })
        .catch((error) => {
            console.log(error);
            setErrorMessage('Error al crear la tarea');
        });
    };

    return (
        <div>
            <img className="imagen-fondo" src="/clouds.jpeg" alt="Clouds" />
            <div className="blanco-fondo">
                <div className="ContenedorLogo">
                    <img className="Capra021" src="/capra.png" alt="Capra" />
                </div>
                <div className="contenedor-titulo">
                    <div className="titulo">Crear Tarea</div>
                </div>
                    
                <div className="form-container">
                    { errorMessage && <b><p>{errorMessage}</p></b> }

                    <form onSubmit={handleSubmit} className="edit-form">
                        <label>Título:
                            <input
                            type="text"
                            name="titulo"
                            value={formData.titulo || ''}
                            onChange={handleInputChange}
                            />
                        </label>
                        <label>Fecha límite:
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
                        <button type="submit">Crear Tarea</button>
                    </form>
                </div> 

                <div className="button-container">
                    <button onClick={() => navigate(`/proyecto/${proyectoId}`)}>Volver</button>
                </div>
            </div>
        </div>
    );
}

export default CrearTarea;
