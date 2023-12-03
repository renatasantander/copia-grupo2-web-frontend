import React , { useState } from 'react';
import './ProfileRegistration.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function ProfileRegistration() {
    const [isClicked, setIsClicked] = useState(false); // estado inicial: el botón no ha sido presionado
    const [username, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
  
    const handleClick = async (event) => {
      event.preventDefault();

      axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
          'username': username,
          'mail': mail,
          'password': password
      }).then((response) => {
          navigate('/login');
      }).catch((error) => {
          window.alert(error.response.data.errors[0].message);
      })
    }
    return (
        <div>

            <img className="imagen-fondo" src="/clouds.jpeg" alt="Clouds" />
           
            <div className="blanco-fondo">
            
                <div className="ContenedorLogo">
                    <img className="Capra021" src="/capra.png" alt="Capra" />
                </div>

                <div className="Registrarse">Registrarse</div>

                <div className="Frame3">
                    <input 
                    type="text"  
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    style={{
                    fontFamily: 'Inter',
                    fontSize: '35px',
                    textAlign: 'center',
                    color: 'black',
                    /* Otros estilos si es necesario */
                    }} 
                    className="Rectangle2"
                    placeholder="Usuario" />
                    
                </div> 
                            
                <div className="Frame2">
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

                <button className="Boton3" onClick={handleClick}>Registrarme</button>
                    {isClicked ? (
                        <div className='ContraseA'></div>
                    ) : (
                        <div className='ContraseA'></div>
                    )}

            </div>

        </div>
    );
}
export default ProfileRegistration;





            
          
            










