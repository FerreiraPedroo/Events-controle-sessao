import "./Login.css"
import React, { useContext, useState } from "react";
import { PageContext } from "../../context/context";
import axios from "axios";
import { Redirect } from "react-router";

function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const { loged, setLoged } = useContext(PageContext);

    function handleUserInput(_props) {
        if (_props.target.name === "user") {
            setUser(_props.target.value);
        } else if (_props.target.name === "password") {
            setPassword(_props.target.value);
        }
    }
    async function sendForm(){
        await axios({
            method: "post",
            url: "http://127.0.0.1:8000/",
            data: {
                "user": user,
                "password": password
            },
            headers: {
                "Access-Control-Allow-Origin": "http://127.0.0.1:3000"
            },
            withCredentials: true
        }
        ).then((response) => {
            let axiosRes = response.data;
            console.log("RESP AXIOS:", axiosRes)
            if (axiosRes.code === "20") {
                if (document.cookie.split("=")[0] === "SID" ? true : false) {
                    setLoged(true);
                    return <Redirect to="/home" />
                } else {
                    setLoged(false);
                }
            } else {
                setLoged(false);
            }
        })
            .catch((response) => {
                console.log("axios error - login")
                setLoged(false);
            })
        // const xhr = new XMLHttpRequest();
        // xhr.open("POST", "http://127.0.0.1:8000/");
        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // xhr.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000")
        // xhr.withCredentials = true;
        // xhr.onreadystatechange = (_this) => {
        //     if (xhr.readyState === 4) {
        //         if (xhr.status === 200) {
        //             console.log(xhr.getResponseHeader('Set-Cookie'))
        //             console.log(cookie)

        //         } else {
        //             // setCookie("sessionCookies",(Math.random()*500))

        //         }
        //     }
        // }
        // xhr.send(`user=${user}&password=${password}`)
    }

    return (
        <div id="container">
            <h1 id="text-title">Cheguei</h1>
            <form id="form-login">
                <label forhtml="user">Usuário</label><br />
                <input type="text" id="user" onChange={handleUserInput} name="user" value={user} /><br />

                <label forhtml="password">Senha</label><br />
                <input type="text" id="password" onChange={handleUserInput} name="password" value={password} />

                <input type="button" id="button" onClick={sendForm} value="Enviar" /><br />
                {/* <span>
                    {
                    cookie.SID === undefined ? loged === false ? "" : "Não foi possivel efetuar o login, tente novamente" : ""
                }
                </span> */}
            </form>
        </div>
    )
}

export default Login;