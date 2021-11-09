import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { PageContext } from "../../context/context";
import "./UserNavbar.css"


function UserNavbar() {
    const history = useHistory()
    const { loged, setLoged } = useContext(PageContext);

    function logout(){
        document.cookie = "SID="
        setLoged(false);
    }

    return (
        <div className="usernavbar-container">
            <nav key="leftbar" className="usernavbar-top">
                <div className="usernavbar-top-title"><div onClick={() => { history.push("/user/home") }}>Cheguei</div></div>
                <div className="usernavbar-top-menu">
                    <div id="usernavbar-links">
                        {/* <div className="usernavbar-menu-icon" ><div onClick={() => { history.push("/admin/event") }}> <span className="material-icons md-36">event_note</span> </div></div> */}
                        <div className="usernavbar-menu-icon" ><div onClick={() => { history.push("/user/myevent") }}> <span className="material-icons md-36">event_available</span> </div></div>
                        <div className="usernavbar-menu-icon" ><div onClick={logout}> <span className="material-icons md-36">logout</span> </div></div>
                    </div>
                </div>
            </nav>
        </div >
    )
}

export default UserNavbar;
