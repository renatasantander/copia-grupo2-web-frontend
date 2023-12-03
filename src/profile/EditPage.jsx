import React , { useContext, useEffect, useState } from 'react';
import './ProfileRegistration.css';
import axios from "axios"
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from 'react-router-dom';

function EditPage() {
    const [isClicked, setIsClicked] = useState(false); // estado inicial: el botón no ha sido presionado
    const [username, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [usuarioId, setUsuarioId] = useState('');
    const {token, setToken} = useContext(AuthContext);
    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/scope-example/protecteduser`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    .then((userResponse) => {
        console.log("user is authorized");
    })
    .catch((userError) => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/scope-example/protectedadmin`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        .then((adminResponse) => {
            console.log("user is authorized");
        })
        .catch((adminError) => {
            navigate('/login');
        });
    });
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            setUsuarioId(response.data.id);
        })
        .catch((error) => {
            console.log('Error fetching user info: ', error);
        });
    }, [token]);

    const handleClick = async (event) => {
      event.preventDefault();

      axios.post(`${import.meta.env.VITE_BACKEND_URL}/editProfile`, {
          'username': username,
          'mail': mail,
          'password': password
      },{
          headers: {
            'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
          window.alert(response.data);
      }).catch((error) => {
          window.alert(error.response.data);
      })
    }

    const handleDelete = () => {
        const confirmDelete = window.confirm('¿Estás seguro que deseas eliminar tu usuario?');
        if (!confirmDelete) {
            return;
        }
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${usuarioId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            logout();
            navigate('/', {replace: true});
        })
        .catch((error) => {
            console.log(error);
            window.alert('Error al eliminar el usuario');
        });
    };

    return (
        <div>

            <img className="imagen-fondo" src="/clouds.jpeg" alt="Clouds" />
           
            <div className="blanco-fondo">

                <div className="Edit-Profile">

                <div className="ContenedorLogo">
                    <img className="Capra021" src="/capra.png" alt="Capra" />
                </div>

                <div className="Registrarse">Editar Perfil</div>
                
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

                <button className="Boton3" onClick={handleClick}>Editar Perfil</button>
                    {isClicked ? (
                        <div className='ContraseA'></div>
                    ) : (
                        <div className='ContraseA'></div>
                    )}
                
                </div>
                
                <button className="delete-button1" onClick={handleDelete}>Eliminar Usuario</button>
                
            </div>

        </div>
    );
}
export default EditPage;
