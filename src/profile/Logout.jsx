import React, {useContext, useState} from 'react';
import './Login.css';
import './Logout.css';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
	const {logout} = useContext(AuthContext);
	const [msg, setMsg] = useState("");
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		setMsg("Has hecho logout con exito!")
		navigate('/', {replace: true});
	}

	return (
		<div>
            <img className="imagen-fondo" src="/clouds.jpeg" alt="Clouds" />
           
            <div className="blanco-fondo">

						<div className="ContenedorLogo">
              <img className="Capra021" src="/capra.png" alt="Capra" />
            </div>
		<>
			{msg.length > 0 && <div className="successMsg"> {msg} </div>}
			<button className="logout-button" onClick={handleLogout}>
			Cerrar sesion
			</button>
		</>
		</div>
		</div>
	);
}

export default LogoutButton;