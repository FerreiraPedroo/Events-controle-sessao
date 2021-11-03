import React from "react";
import { Redirect } from "react-router";
import "./Leftbar.css"


function Leftbar() {


    return (
        <aside key="leftbar" className="leftbar-aside">
            <ul>
                <li><a className="leftbar-aside-li" href="/admin/register/event">EVENTOS</a></li>
                <li ><a className="leftbar-aside-li" href="/admin/register/user">USUARIOS</a></li>
            </ul>
            <ul>
            <li className="leftbar-aside-li">DESLOGAR</li>
            </ul>
        </aside>
    )
}

export default Leftbar;
