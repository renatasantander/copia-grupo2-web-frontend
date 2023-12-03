import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./profile/LandingPage"
import PaginaPrincipal from "./planner/PaginaPrincipal"
import ProjectPage from "./project/ProjectPage"
import EditProject from "./project/EditProject"
import Invitar from "./project/Invitar"
import CrearTarea from "./project/CrearTarea"
import GetTarea from "./project/GetTarea"
import EditTarea from "./project/EditTarea"
import App from "./App"
import ProfileRegistration from "./profile/ProfileRegistration"
import Login from "./profile/Login"
import Navbar from "./components/Navbar"
import Notifications from "./planner/Notifications"
import LogoutButton from "./profile/Logout"
import EditPage from "./profile/EditPage"
import Instructions from "./planner/Instructions"
import AdminPage from "./planner/AdminPage"

function Routing() {
    return (
        <>
        <BrowserRouter>
            <Navbar/>
            <Routes> 
                <Route path={'/'} element={<LandingPage/>}/>
                <Route path={'/profile-registration'} element={<ProfileRegistration/>}/>
                <Route path={'/pagina-principal'} element={<PaginaPrincipal/>}/>
                <Route path={'/proyecto/:projectId'} element={<ProjectPage/>}/>
                <Route path={'/proyecto/:projectId/editar'} element={<EditProject/>}/>
                <Route path={'/proyecto/:proyectoId/invitar'} element={<Invitar/>}/>
                <Route path={'/proyecto/:proyectoId/crear-tarea'} element={<CrearTarea/>}/>
                <Route path={'/tarea/:tareaId'} element={<GetTarea/>}/>
                <Route path={'/tarea/:tareaId/editar'} element={<EditTarea/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/notifications'} element={<Notifications/>}/>
                <Route path={'/logout'} element={<LogoutButton/>}/>
                <Route path={'/edit-page'} element={<EditPage/>}/>
                <Route path={'/pagina-instrucciones'} element={<Instructions/>}/>
                <Route path={'/admin'} element={<AdminPage/>}/>
          
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing
