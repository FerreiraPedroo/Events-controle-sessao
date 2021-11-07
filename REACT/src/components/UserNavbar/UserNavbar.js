import React from "react";
import { useHistory } from "react-router-dom";
import "./UserNavbar.css"

function UserNavbar() {
    const history = useHistory()

    return (
        <div className="usernavbar-container">
            <nav key="leftbar" className="usernavbar-top">
                <div className="usernavbar-top-title"><div onClick={() => { history.push("/user/home") }}>Cheguei</div></div>
                <div className="usernavbar-top-menu">
                    {/* <div className="usernavbar-top-menu-link" href="/user/event">
                        <div onClick={() => { history.push("/user/home") }}><span className="material-icons md-36">person</span></div>
                    </div> */}
                    <div className="usernavbar-top-menu-link" href="/user/event">
                        <div onClick={() => { history.push("/user/home") }}><span className="material-icons md-36">menu</span></div>
                    </div>
                </div>
            </nav>
        </div >
    )
}

export default UserNavbar;
