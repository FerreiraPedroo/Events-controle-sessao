import "./Login.css"
import React, { useContext, useState } from "react";
import { PageContext } from "../../context/context";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const { loged, setLoged } = useContext(PageContext);
    const { userLevel, setUserLevel } = useContext(PageContext);

    function handleUserInput(_props) {
        setMsg("")
        if (_props.target.name === "user") {
            setUser(_props.target.value);
        } else if (_props.target.name === "password") {
            setPassword(_props.target.value);
        }
    }

    async function sendForm() {
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
            console.log("RESP AXIOS:", axiosRes);
            if (axiosRes.code === "20" && document.cookie.split("=")[0] === "SID" ? true : false) {
                setUserLevel(axiosRes.level)
                setLoged(true)
                if (axiosRes.level === 1) {
                    // history.push("/admin/home");
                    return (<Redirect push to="/admin/home" />);
                } else {
                    return (<Redirect push to="/home" />);
                }
            } else {
                setLoged(false);
                setPassword("");
                setMsg(axiosRes.msg)
                return (<Redirect push to="/" />);
            }
        })
            .catch((response) => {
                console.log("AXIOS ERRO - LOGIN : ", response);
                setLoged(false);
                return (<Redirect push to="/" />);
            })
    }

    return (
        <div id="container">
            <h1 id="text-title">Cheguei</h1>
            <form id="form-login">
                <label forhtml="user">Usuário</label><br />
                <input type="text" id="user" onChange={handleUserInput} name="user" value={user} /><br />

                <label forhtml="password">Senha</label><br />
                <input type="password" id="password" onChange={handleUserInput} name="password" value={password} />

                <input type="button" id="button" onClick={sendForm} value="Enviar" /><br />
                <div className="form-login-errormsg">
                    {
                        msg !== "" ? "Não foi possivel efetuar o login, tente novamente" : ""
                    }
                </div>

            </form>
        </div>
    )
}

export default Login;