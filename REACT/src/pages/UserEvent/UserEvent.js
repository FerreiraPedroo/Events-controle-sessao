import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../../context/context";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import "./UserEvent.css"

function UserEvent() {
    const [dataHome, setDataHome] = useState();
    const { loged, setLoged, eventId } = useContext(PageContext);
    const history = useHistory()

    useEffect(() => {
        if (eventId === null) return history.push('/home');
        (async () => {

            function loadUserEventData(setLoged, setDataHome, id) {
                axios(
                    {
                        method: "post",
                        url: "http://127.0.0.1:8000/user/data",
                        data: {
                            retrieve: "userevent",
                            eventID: id
                        },
                        headers: {
                            "Access-Control-Allow-Origin": "http://127.0.0.1:3000"
                        },
                        withCredentials: true
                    }
                ).then((response) => {
                    let axiosRes = response.data;
                    console.log("RESP AXIOS - USERHOME:", axiosRes);
                    if (axiosRes.code === "20") {
                        console.log(document.cookie.split("=")[0] === "SID" ? true : false)
                        if (document.cookie.split("=")[0] === "SID" ? true : false) {
                            axiosRes.getBackData.reverse()
                            setDataHome(axiosRes.getBackData);
                            setLoged(true);
                        } else {
                            setLoged(false);
                        }
                    } else {
                        setLoged(false);
                    }
                    return "";
                }).catch((response) => {
                    console.log(response)
                    setLoged(false);
                })
            }
            await loadUserEventData(setLoged, setDataHome, eventId);
        })()

    }, [])

    if (dataHome === undefined) { return <><div></div></> };
    return (
        <div className="user-event-container">
            <div className="user-event-container-banner">
                <img src="/event.png" alt="evento imagem" />
            </div>
            <div className="user-event-container-eventname">
                <div className="user-event-container-eventname-info">
                    <p className="user-event-container-eventname-text">XVI ENFOC - Encontro de Iniciação Científica e Fórum Científico, VII Seminário PIBID</p>
                    <p className="user-event-container-eventname-date">12/11/2021 – 19:00 – GMT-3</p>
                </div>
                <div className="user-event-button">
                    <button className="user-event-button-subscript">REALIZAR INSCRIÇÃO</button>
                </div>
            </div>
            <div className="user-event-container-eventname">
                <div className="user-event-container-eventname-info">
                    <p className="user-event-container-eventname-description">INFORMAÇÕES DO EVENTO</p>
                    <p className="user-event-container-eventname-date">Evento de confraternização da confraternização dos integrandes da confraternização de confraterna e de confraim</p>
                </div>

            </div>
        </div>
    );
}

export default UserEvent;