import React, { useState, useContext } from 'react';
import './Login.css';
import axios from "axios"
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from 'react-router-dom';

function Login() {
  const {token, setToken} = useContext(AuthContext);
  const [isClicked, setIsClicked] = useState(false); // estado inicial: el botón no ha sido presionado
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleClick = async (event) => {
      event.preventDefault();

      axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
          'mail': mail,
          'password': password
      }).then((response) => {
          const access_token = response.data.access_token;
          setToken(access_token);
          navigate('/pagina-principal');
      }).catch((error) => {
          window.alert(error.response.data);
      })
  }


  
    return (
        <div>
            <img className="imagen-fondo" src="/clouds.jpeg" alt="Clouds" />
           
            <div className="blanco-fondo">
                
                <div className="Registrarse">Inicio Sesión</div>

                <div className="Framemail">
                    <input 
                    type="text"
                    value={mail}
                    onChange={(event) => setMail(event.target.value)}
                    style={{
                    fontFamily: 'Inter',
                    fontSize: '35px',
                    textAlign: 'center',
                    color: 'black',
                    /* Otros estilos si es necesario */
                    }} 
                    className="Rectangle2"  
                    placeholder="Mail"/>
                </div>
                
                <div className="Frame1">
                <input 
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    style={{
                    fontFamily: 'Inter',
                    fontSize: '35px',
                    textAlign: 'center',
                    color: 'black',
                    /* Otros estilos si es necesario */
                    }} 
                    className="Rectangle2"  
                    placeholder="Contraseña"/>
                </div>

                <div className="ContenedorLogo">
                <img className="Capra021" src="/capra.png" alt="Capra" />
                </div>

                <button className="Boton" onClick={handleClick}>Ingresar</button>
                {isClicked ? (
                    <div className='ContraseA'></div>
                ) : (
                    <div className='ContraseA'></div>
                )}

            </div>

        </div>
    );
}
export default Login;
