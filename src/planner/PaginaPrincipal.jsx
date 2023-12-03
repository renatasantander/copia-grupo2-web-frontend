import React, { useContext, useEffect, useState } from 'react';
import ProjectList from "./ProjectList";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import "./PaginaPrincipal.css"
import { useNavigate } from 'react-router-dom';

function PaginaPrincipal() {
  const { token } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [userProjects, setUserProjects] = useState([]);
  const navigate = useNavigate();

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
    const fetchUserProjects = () => {
      if (token) {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        })
        .then((userInfo) => {
          setCurrentUser(userInfo.data);
          const userId = userInfo.data.id;
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuario-proyectos/usuarios/${userId}/proyectos`)
          .then((projectsResponse) => {
            const filteredProjects = projectsResponse.data.filter(project =>
              project.Usuario_Proyecto.rol === 'user' || project.Usuario_Proyecto.rol === 'admin'
            );
            setUserProjects(filteredProjects);
            })
            .catch((projectsError) => {
              console.error('Error fetching user projects: ', projectsError);
            });
          })
          .catch((userInfoError) => {
            console.error('Error fetching user info: ', userInfoError);
          });
      }
    };

    fetchUserProjects();
  }, [token]);

  return (
    <div>
      

      <img className="imagen-fondo" src="/clouds.jpeg" alt="Clouds"/>
           
      <div className="blanco-fondo">

        <div className="pagina-principal">
          <h2> Bienvenid@ {currentUser.username} </h2>
          <h2> Tus proyectos </h2>
          <ProjectList projects={userProjects} setProjects={setUserProjects} currentUser={currentUser}/>
        </div>
      </div>
    </div>
  );
}

export default PaginaPrincipal;