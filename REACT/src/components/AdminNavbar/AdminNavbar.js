import React, { useContext} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { PageContext } from "../../context/context";
import "./AdminNavbar.css"


function AdminNavbar() {
    const history = useHistory();
    const { loged, setLoged } = useContext(PageContext);

    function logout(){
        document.cookie = "SID="
        setLoged(false);
    }
    return (
        <div className="navbar-container">
        <nav key="navbar" className="navbar">
            <div className="navbar-menu-icon" ><div onClick={() => { history.push("/admin/home") }}> <span className="material-icons">dashboard</span> <p>Inicio</p></div></div>
            <div className="navbar-menu-icon" ><div onClick={() => { history.push("/admin/user") }}> <span className="material-icons">group</span> <p>Usuários</p></div></div>
            <div className="navbar-menu-icon" ><div onClick={() => { history.push("/admin/event") }}> <span className="material-icons">event_note</span> <p>Eventos</p></div></div>
            {/* <div className="navbar-menu-icon" ><div onClick={() => { history.push("/admin/dashboard") }}> <span className="material-icons">assessment</span> <p>Relatório</p></div></div> */}
            <div className="navbar-menu-icon" ><div onClick={logout}> <span className="material-icons">logout</span> <p>Logout</p></div></div>
        </nav>
        </div>
    )
}

export default AdminNavbar;