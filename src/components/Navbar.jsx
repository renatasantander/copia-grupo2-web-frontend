import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import './Navbar.css';


function Navbar() {
  const { token } = useContext(AuthContext);
  const [access, setAccess] = useState();
  const [isloading, setloading] = useState(true);

  const Load = () => {
      if (isloading){
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/scope-example/protecteduser`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              },
          })
          .then((response) => {
              setAccess(
                  <>
                    <li>
                      <NavLink to="/pagina-principal" activeClassName="active">Página Principal</NavLink>
                    </li>
                    <li>
                      <NavLink to="/notifications" activeClassName="active">Notificaciones</NavLink>
                    </li>
                    <li>
                      <NavLink to="/pagina-instrucciones" activeClassName="active">Instrucciones</NavLink>
                    </li>
                    <li>
                      <NavLink to="/edit-page" activeClassName="active">Editar Perfil</NavLink>
                    </li>
                    <li>
                      <NavLink to="/logout" activeClassName="active">Logout</NavLink>
                    </li>
                  </>
              );
              setloading(false);
          })
          .catch((error) => {
              axios.get(`${import.meta.env.VITE_BACKEND_URL}/scope-example/protectedadmin`, {
                  headers: {
                     'Authorization': `Bearer ${token}`
                  },
              })
              .then((response) => {
                  setAccess(
                      <>
                        <li>
                          <NavLink to="/pagina-principal" activeClassName="active">Página Principal</NavLink>
                        </li>
                        <li>
                          <NavLink to="/notifications" activeClassName="active">Notificaciones</NavLink>
                        </li>
                        <li>
                          <NavLink to="/pagina-instrucciones" activeClassName="active">Instrucciones</NavLink>
                        </li>
                        <li>
                          <NavLink to="/edit-page" activeClassName="active">Editar Perfil</NavLink>
                        </li>
                        <li>
                          <NavLink to="/logout" activeClassName="active">Logout</NavLink>
                        </li>
                        <li>
                          <NavLink to="/admin" activeClassName="active">Admin</NavLink>
                        </li>
                      </>
                  );
                  setloading(false);
              })
              .catch((error) => {
                  setAccess(
                      <>
                        <li>
                          <NavLink to="/profile-registration" activeClassName="active">Registrarse</NavLink>
                        </li>
                        <li>
                          <NavLink to="/login" activeClassName="active">Iniciar Sesión</NavLink>
                        </li>
                        <li>
                          <NavLink to="/pagina-instrucciones" activeClassName="active">Instrucciones</NavLink>
                        </li>
                      </>
                  );
                  setloading(false);
              });
          })
      };
  };
  Load();

  useEffect(() => {
      setloading(true);
  }, [token]);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" activeClassName="active">Inicio</NavLink>
        </li>

        {access}
      </ul>
    </nav>
  )
}

export default Navbar;



