import React, { useState, useEffect } from 'react';
import './EditProject.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProject() {
    const { projectId } = useParams();
    const [ project, setProject ] = useState([]);
    const [ formData, setFormData ] = useState('');
    const [isShared, setIsShared] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ successMessage, setSuccessMessage ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/proyectos/${projectId}`)
        .then((response) => {
            setProject(response.data);
            setFormData({ titulo: response.data.titulo, estado: response.data.estado });
            setIsShared(response.data.estado === 'Compartido');
        })
        .catch((error) => {
            console.log(error);
        });
    }, [projectId]);

    const handleInputChange = (event) => {
        if (event.target.type === 'checkbox') {
            const value = event.target.checked ? 'Compartido' : 'Privado';
            setIsShared(event.target.checked);
            setFormData({ ...formData, [event.target.name]: value });
        } else {
            setFormData({ ...formData, [event.target.name]: event.target.value });
        }
    };

    const handleEdit = (event) => {
        event.preventDefault();

        if (!formData.titulo || formData.titulo.trim() === '') {
            setErrorMessage('El título no puede estar vacío');
            return;
        }

        axios.patch(`${import.meta.env.VITE_BACKEND_URL}/proyectos/${projectId}`, formData)
        .then((response) => {
            setProject(response.data);
            setSuccessMessage('¡Proyecto editado exitosamente!');
        })
        .catch((error) => {
            console.log(error);
            setErrorMessage('Error al editar el proyecto');
        });
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm('¿Estás seguro que deseas eliminar este proyecto?');
        if (!confirmDelete) {
            return;
        }
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/proyectos/${projectId}`)
        .then((response) => {
            navigate('/pagina-principal', { replace: true });
        })
        .catch((error) => {
            console.log(error);
            setErrorMessage('Error al eliminar el proyecto');
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
                    <div className="titulo-proyecto">Editar Proyecto</div>
                </div>

                <div className="form-container">
                    { successMessage && <p>{successMessage}</p> }
                    { errorMessage && <p>{errorMessage}</p> }

                    <form onSubmit={handleEdit} className="edit-form">
                        <label>Título:
                            <input
                            type="text"
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleInputChange}
                            />
                        </label>
                        <label>Proyecto Compartido:
                            <input
                            type="checkbox"
                            name="estado"
                            checked={isShared}
                            onChange={handleInputChange}
                            />
                        </label>
                        <button type="submit">Guardar Cambios</button>
                    </form>
                </div>
                
                <div className="button-container">
                    <button onClick={() => navigate(`/proyecto/${projectId}`)}>Volver</button>
                    <button className="delete-button" onClick={handleDelete}>Eliminar Proyecto</button>
                </div>
            </div>
        </div>
    );
}

export default EditProject;
