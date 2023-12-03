import React, { useState } from 'react';
import "./NewProjectForm.css"

function NewProjectForm({ onAddProject}) {
    const [title, setTitle] = useState('');
    const [isShared, setIsShared] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const estado = isShared ? 'Compartido' : 'Privado';

        const newProject = {
        title,
        estado,
        };

        onAddProject(newProject);
        setTitle('');
        setIsShared(false);
    };

    return (
        <form onSubmit={handleSubmit}>
        <h3>Nuevo Proyecto</h3>
        <div>
            <label>Título del proyecto</label>
            <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            />
        </div>
        <br/>
        <div>
            <label>Proyecto Compartido</label>
            <input
            type="checkbox"
            checked={isShared}
            onChange={(event) => setIsShared(event.target.checked)}
            />
        </div>
        <br/>
        <button type="submit">Crear Proyecto</button>
        </form>
    );
}

export default NewProjectForm;

