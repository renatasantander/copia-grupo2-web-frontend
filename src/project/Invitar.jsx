import React, { useContext, useState, useEffect } from 'react';
import './EditTarea.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../auth/AuthContext";

function Invitar() {
    const { proyectoId } = useParams();
    const [ usuarioId, setUsuarioId ] = useState('');
    const [proyectoTitulo, setProyectoTitulo] = useState('');
    const [ email, setEmail ] = useState('');
    const { token } = useContext(AuthContext);
    const [ successMessage, setSuccessMessage ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        setEmail(event.target.value);
        setSuccessMessage('');
    };

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/proyectos/${proyectoId}`)
        .then((response) => {
            setProyectoTitulo(response.data.titulo);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [proyectoId]);

    const handleInvitar = (event) => {
        event.preventDefault();

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/mail/${email}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((usuarioResponse) => {
            setUsuarioId(usuarioResponse.data.id);

            axios.post(`${import.meta.env.VITE_BACKEND_URL}/usuario-proyectos`, {
                rol: 'pendiente',
                usuarioId: usuarioId,
                proyectoId: proyectoId,
            })
            .then((usuarioProyectoResponse) => {
                axios.post(`${import.meta.env.VITE_BACKEND_URL}/notificaciones`, {
                    tipo: 'Invitacion',
                    mensaje: `Has sido invitado al proyecto ${proyectoTitulo}`,
                    leido: false,
                    proyecto: proyectoId,
                    usuarioId: usuarioId,
                })
                .then((notificacionResponse) => {
                    setSuccessMessage('Invitación enviada');
                })
            })
            .catch((error) => {
                console.log(error);
                window.alert('El usuario ya está en el proyecto o la invitación ya fue enviada');
            });
        })
        .catch((error) => {
            window.alert('No se encontró un usuario con ese email');
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
                    <div className="titulo">Crear Invitación a Proyecto {proyectoTitulo}</div>
                </div>

                <div className="form-container">
                    { successMessage && <b><p>{successMessage}</p></b> }
                    <form onSubmit={handleInvitar} className="edit-form">
                        <label> 
                            Ingresa el email del usuario a invitar
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleSubmit}
                                className="edit-input"
                            />
                        </label>
                        <button type="submit">Invitar</button>
                        {/* <button className="edit-button">Invitar</button> */}
                    </form>
                </div>

                <div className="button-container">
                    <button onClick={() => navigate(`/proyecto/${proyectoId}`)}>Volver</button>
                </div>
            </div>
        </div>
    )
}

export default Invitar;