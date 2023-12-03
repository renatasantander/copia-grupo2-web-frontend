import React, { useState, useEffect } from 'react';
import './ProjectPage.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import TareaCard from './TareaCard';

function ProjectPage() {
    const { projectId } = useParams();
    const [ project, setProject ] = useState([]);
    const [ tasks, setTasks ] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/proyectos/${projectId}`)
        .then((projectResponse) => {
            setProject(projectResponse.data);
        })
        .catch((error) => {
            console.log(error);
        });

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/tareas/proyectos/${projectId}`)
        .then((tareasResponse) => {
            setTasks(tareasResponse.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [projectId]);

    const filterTasksByState = (state) => {
        return tasks.filter((task) => task.estado === state);
    };

    const tasksNotStarted = filterTasksByState('Pendiente');
    const tasksInProgress = filterTasksByState('En curso');
    const tasksDone = filterTasksByState('Terminada');

    return (
        <div>
            <img className="imagen-fondo" src="/clouds.jpeg" alt="Clouds" />
            <div className="blanco-fondo">

                <div className="ContenedorLogo">
                    <img className="Capra021" src="/capra.png" alt="Capra" />
                </div>

                <div className="header">
                    <div className="titulo-proyecto">{project.titulo}</div>
                        <Link className="links" to={`/proyecto/${projectId}/crear-tarea`}>
                            <button className="edit-button">Crear Tarea</button>
                        </Link>
                        <Link className="links" to={`/proyecto/${projectId}/invitar`}>
                            <button className="edit-button">Invitar</button>
                        </Link>
                        <Link className="links" to={`/proyecto/${projectId}/editar`}>
                            <button className="edit-button">Editar Proyecto</button>
                        </Link>

                </div>
                
                <div className="grid-container">
                    <div className="column">
                        <div className="filter-title">Tareas Pendientes</div>
                        <div className="tasks">
                            {tasksNotStarted.map((task) => (
                                <Link className="links-tasks" key={task.id} to={`/tarea/${task.id}`}>
                                    <TareaCard key={task.id} tarea={task} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="column">
                        <div className="filter-title">Tareas en Curso</div>
                        <div className="tasks">
                            {tasksInProgress.map((task) => (
                                <Link className="links-tasks"key={task.id} to={`/tarea/${task.id}`}>
                                    <TareaCard key={task.id} tarea={task} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="column">
                        <div className="filter-title">Tareas Terminadas</div>
                        <div className="tasks">
                            {tasksDone.map((task) => (
                                <Link className="links-tasks" key={task.id} to={`/tarea/${task.id}`}>
                                    <TareaCard key={task.id} tarea={task} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectPage;
