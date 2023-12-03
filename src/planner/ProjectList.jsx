import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import NewProjectForm from './NewProjectForm';
import "./ProjectList.css";
import axios from "axios";
import { Link } from 'react-router-dom';

function ProjectList({ projects, setProjects, currentUser }) {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const addProject = (newProject) => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/proyectos`,{
            titulo: newProject.title,
            estado: newProject.estado
        })
        .then((response) => {
            setProjects([...projects, response.data]);
            setIsFormVisible(false); // Ocultar el formulario después de agregar un proyecto
            addUsuarioProyecto(response.data.id);
        })
        .catch((error) => {
            console.log(error);
        })
    };

    const addUsuarioProyecto = (projectId) => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/usuario-proyectos`,{
            rol: 'admin',
            usuarioId: currentUser.id,
            proyectoId: projectId
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (

        <div>
            <div className="project-container">
                <div className="create-project-column">
                <button className="create-button" onClick={() => setIsFormVisible(true)}>Crear Proyecto</button>
                {isFormVisible && <NewProjectForm onAddProject={addProject} />}
                </div>
                <div className="project-column">
                    {projects.length === 0 ? (
                        <p className="no-project-text">(No hay proyectos creados)</p>
                    ) : (
                        projects.map((project) => (
                            <Link to={ `/proyecto/${project.id}` } className="link-to-project" key={project.id}>
                                <button className="project-button">
                                    <ProjectCard project={project} />
                                </button>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectList;