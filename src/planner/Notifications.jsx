import React, { useContext, useEffect, useState } from 'react';
import './Notifications.css';
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import Notice from "../components/notice";
import { useNavigate } from 'react-router-dom';

function Notifications() {
  const { token } = useContext(AuthContext);
  const [ currentUser, setCurrentUser ] = useState({});
  const [ notifications, setNotifications ] = useState([]);
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
    const fetchUserNotifications = () => {
      if (token) {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        })
        .then((userInfo) => {
          setCurrentUser(userInfo.data);
          const userId = userInfo.data.id;
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/notificaciones/reminder/${userId}`)
          .then((reminderResponse) => {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/notificaciones/usuarios/${userId}`)
            .then((notificationsResponse) => {
              setNotifications(notificationsResponse.data);
            })
            .catch((notificationsError) => {
              console.error('Error fetching user notifications: ', notificationsError);
            });
          })
          .catch((reminderError) => {
            console.error('Error fetching user notifications: ', reminderError);
          });
        })
        .catch((userInfoError) => {
          console.error('Error fetching user info: ', userInfoError);
        });
      }
    };

    fetchUserNotifications();
  }, [token]);

    return (
        <div>
            <img className="imagen-fondo" src="/clouds.jpeg" alt="Clouds" />
            <div className="blanco-fondo">

              <div className="ContenedorLogo">
                <img className="Capra021" src="/capra.png" alt="Capra"/>
              </div>

              <div className="TituloNotificaciones">Notificaciones</div>
              
              <div className="NotificationsContainer">
                <div className="NotificationsBox">
                  {notifications.length === 0 && (
                    <div>No hay notificaciones</div>
                  )}
                  {notifications.map((notification) => (
                    <div key={notification.id}>
                      <Notice notification={notification} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          
        </div>
    );
}

export default Notifications;
