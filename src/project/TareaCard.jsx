import React, { useState } from 'react';
import './ProjectPage.css';

function TareaCard({ tarea }) {

    const dateObj = new Date(tarea.fecha);
    const day = dateObj.getUTCDate().toString().padStart(2, '0');
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getUTCFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    return (
        <div className="tarea-card">
            <div className="TaskTitle">{tarea.titulo}</div>
            <div className="TaskText">{formattedDate}</div>
            <div className="TaskText">{tarea.comentario}</div>
        </div>
    );
}

export default TareaCard;