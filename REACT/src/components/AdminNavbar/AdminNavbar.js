import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./AdminNavbar.css"


function AdminNavbar() {
    const history = useHistory();
    const { pathname } = useLocation();
    // style={pathname === "/admin/home" ? { color: "dodgerblue" } : { color: 'white' }}

    return (
        <nav key="navbar" className="navbar">
            <div className="navbar-menu-icon" ><div onClick={() => { history.push("/admin/home") }}> <span className="material-icons">dashboard</span> <span>Inicio</span></div></div>
            <div className="navbar-menu-icon" ><div onClick={() => { history.push("/admin/user") }}> <span className="material-icons">group</span> <span>Usuários</span></div></div>
            <div className="navbar-menu-icon" ><div onClick={() => { history.push("/admin/event") }}> <span className="material-icons">event_note</span> <span>Eventos</span></div></div>
            <div className="navbar-menu-icon" ><div onClick={() => { history.push("/admin/dashboard") }}> <span className="material-icons">assessment</span> <span>Relatório</span></div></div>
            <div className="navbar-menu-icon" ><div onClick={() => { history.push("/admin/settings") }}> <span className="material-icons">settings</span> <span>Configuração</span></div></div>
        </nav>
    )
}

export default AdminNavbar;