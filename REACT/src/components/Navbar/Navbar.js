import React from "react";
import "./Navbar.css"




function Navbar (){



    return(
        <nav key="navbar" className="navbar">
            <div className="navbar-menu-icon"><a href="/home"> <span class="material-icons">dashboard</span> <span>Inicio</span></a></div>
            <div className="navbar-menu-icon"><a href="/admin/user"> <span class="material-icons">group</span> <span>Usuários</span></a></div>
            <div className="navbar-menu-icon"><a href="/admin/event"> <span class="material-icons">event_note</span> <span>Eventos</span></a></div>
            <div className="navbar-menu-icon"><a href="/admin/dashboard"> <span class="material-icons">assessment</span> <span>Relatório</span></a></div>
            <div className="navbar-menu-icon"><a href="/home"> <span class="material-icons">settings</span> <span>Configuração</span></a></div>

        </nav>

    )
}

export default Navbar;