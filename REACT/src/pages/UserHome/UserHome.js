import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../../context/context";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./UserHome.css"

function longDate(dateTimeStamp) {
    const rawDate = new Date(Number(dateTimeStamp)).toISOString("pt-BR")
    if (dateTimeStamp === undefined) return "";
    const meses = { "01": "Janeiro", "02": "Fevereiro", "03": "Março", "04": "Abril", "05": "Maio", "06": "Junho", "07": "Julho", "08": "Agosto", "09": "Setembro", "10": "Outubro", "11": "Novembro", "12": "Dezembro" };
    const dateLong = rawDate.slice(0, 10).split('-').reverse()
    return (dateLong[0] + " " + meses[String(dateLong[1])] + " de " + dateLong[2])
}

function UserHome() {
    const [dataHome, setDataHome] = useState();
    const { setLoged, eventId, setEventId } = useContext(PageContext);
    const history = useHistory()

    function redirectToEvent(id) {
        setEventId(id);
        return history.push('/user/event')
    }

    useEffect(() => {
        (async () => {
            function loadHomeData() {
                axios(
                    {
                        method: "post",
                        url: "http://127.0.0.1:8000/user/data",
                        data: {
                            retrieve: "userhome"
                        },
                        headers: {
                            "Access-Control-Allow-Origin": "http://127.0.0.1:3000"
                        },
                        withCredentials: true
                    }
                ).then((response) => {
                    let axiosRes = response.data;
                    if (axiosRes.code === "20") {
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
            await loadHomeData(setLoged, setDataHome);
        })()
    }, [])

    if (dataHome === undefined) { return <><div></div></> };
    console.log(dataHome)
    return (
        <div className="user-home-container">
            <div className="user-home-bg">
            </div>

            <div className="user-home-container-list-info">
                <p className="home-container-list-info-title">EVENTOS</p>
                {
                    dataHome.map((event) => {
                        return (
                            <div key={"event-" + event.eventID} onClick={() => { redirectToEvent(event.eventID) }} className="user-home-event">
                                <img className="user-home-event-img" src={event.eventImagem === "" ? "/img/event.jpg" : event.eventImagem} alt="Imagem do evento" />
                                <div className="user-home-event-info-container">
                                    <div className="user-home-event-text">{event.eventName}</div>
                                </div>
                                <div className="user-home-event-date">
                                    <span className="material-icons">today</span>
                                    <span className="user-home-event-text">
                                        {longDate(event.eventDate)}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
export default UserHome;