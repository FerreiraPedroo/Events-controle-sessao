import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../../context/context";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./AdminUser.css";



function AdminUser() {
    const [dataUser, setDataUser] = useState();
    const { loged, setLoged } = useContext(PageContext);
    const history = useHistory()

    function redirectRegisterUser() {
        return history.push("/admin/register/user");
    }

    useEffect(() => {
        (async () => {
            function loadUserData() {
                axios(
                    {
                        method: "post",
                        url: "http://127.0.0.1:8000/admin/data",
                        data: {
                            retrieve: "adminuser"
                        },
                        headers: {
                            "Access-Control-Allow-Origin": "http://127.0.0.1:3000"
                        },
                        withCredentials: true
                    }
                ).then((response) => {
                    let axiosRes = response.data;
                    if (axiosRes.code === "20") {
                        setLoged(true);
                        if (document.cookie.split("=")[0] === "SID" ? true : false) {
                            setDataUser(axiosRes.getBackData);
                        } else {
                            setLoged(false);
                        }
                    } else {
                        setLoged(false);
                    }
                }).catch((response) => {
                    setLoged(false);
                })
            }
            await loadUserData();
        })()
        console.log(dataUser)
    }, [])

    if (dataUser === undefined) { return <></> };
    return (
        <div className="admin-user-container">
            <div className="admin-user-container-center">
                <div className="admin-user-container-register">
                    <button onClick={redirectRegisterUser} className="admin-user-open-event-button">NOVO USUÁRIO</button>
                </div>

                <div className="admin-user-container-list-info">
                    <p className="admin-user-container-list-info-title">USUÁRIOS</p>
                    {
                        dataUser.map((user) => {
                            return (
                                <div key={user.ID} className="admin-user-event">
                                    <img className="admin-user-event-img-people" src={user.userPhoto === "" ? "/img/user.jpg" : user.userPhoto} alt="Imagem do evento" />
                                    <div className="admin-user-event-info-container">
                                        <div>
                                            <p className="admin-user-event-text-p">ID: <span className="admin-user-event-text">{user.ID}</span></p>
                                            <p className="admin-user-event-text-p">Usuário: <span className="admin-user-event-text">{user.userName}</span></p>
                                            <p className="admin-user-event-text-p">Nome: <span className="admin-user-event-text">{user.fullName}</span></p>
                                            <p className="admin-user-event-text-p">E-Mail: <span className="admin-user-event-text">{user.email}</span></p>
                                            <p className="admin-user-event-text-p">CPF: <span className="admin-user-event-text">{user.docCPF}</span></p>
                                        </div>
                                        <div>
                                            <button id={user.userID} className="admin-user-open-event-button">DETALHES</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}
export default AdminUser;