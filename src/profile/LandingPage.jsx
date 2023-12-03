import React, { useState } from 'react';
import './LandingPage.css';

function LandingPage() {
    const [isClicked, setIsClicked] = useState(false); // estado inicial: el botón no ha sido presionado

    const handleClick = () => {
        setIsClicked(true); // cambia el estado a "true" cuando se presiona el botón
    }

    return (
        <div>
            <img className="imagen-fondo" src="/clouds.jpeg" alt="Clouds" />
            <div className="blanco">

            <div className="ContenedorLogo">
              <img className="Capra021" src="/capra.png" alt="Capra" />
            </div>

            <div className="Titulo">¡Bienvenidos a nuestro planner online!</div>
            
            <div className="Frame">
                <div className="Rectangle">
                    <div className="Texto">En nuestra plataforma, encontrarás una forma sencilla y eficiente de organizar proyectos y tareas. <br></br> Desde la creación de proyectos individuales o colaborativos hasta la asignación de tareas y el seguimiento de fechas de vencimiento,<br></br> nuestra herramienta te mantendrá organizado y en control.<br></br> Recibe notificaciones en tiempo real para estar al tanto de invitaciones y fechas importantes.<br></br> Únete a nosotros y simplifica tu vida con una planificación inteligente y colaborativa.</div>
                </div>
            </div>
            
            </div>
           
        </div>
    );
}

export default LandingPage;
