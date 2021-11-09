import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../../context/context";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./AdminEvent.css";

function longDate(dateTimeStamp) {
    const rawDate = new Date(Number(dateTimeStamp)).toISOString("pt-BR")
    if (dateTimeStamp === undefined) return "";
    const meses = { "01": "Janeiro", "02": "Fevereiro", "03": "Março", "04": "Abril", "05": "Maio", "06": "Junho", "07": "Julho", "08": "Agosto", "09": "Setembro", "10": "Outubro", "11": "Novembro", "12": "Dezembro" };
    const dateLong = rawDate.slice(0, 10).split('-').reverse()
    return (dateLong[0] + " " + meses[String(dateLong[1])] + " de " + dateLong[2])
}

function AdminEvent() {
    const [dataEvent, setDataEvent] = useState();
    const { loged, setLoged } = useContext(PageContext);
    const history = useHistory()

    function redirectRegisterEvent(){
        return  history.push("/admin/register/event");
    }

    useEffect(() => {
        (async () => {
            function loadEventData(setLoged, setDataEvent) {
                axios(
                    {
                        method: "post",
                        url: "http://127.0.0.1:8000/admin/data",
                        data: {
                            retrieve: "adminevent"
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
                            setDataEvent(axiosRes.getBackData);
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
            await loadEventData(setLoged, setDataEvent);
        })()
        console.log(dataEvent)
    }, [])

    if (dataEvent === undefined) { return <></> };
    return (
        <div className="admin-event-container">
            <div className="admin-event-container-center">

                <div className="admin-event-container-register">
                    <button onClick={redirectRegisterEvent} className="admin-user-open-event-button">NOVO EVENTO</button>
                </div>

                <div className="admin-event-container-list-info">
                    <p className="admin-event-container-list-info-title">EVENTOS</p>
                    {
                        dataEvent.map((event) => {
                            return (
                                <div key={event.eventID} className="admin-event-event">
                                    <img className="admin-event-event-img" src={event.eventImagem === "" ? "/img/event.png" : event.eventImagem} alt="Imagem do evento" />
                                    <div className="admin-event-event-info-container">
                                        <div>
                                            <p className="admin-event-event-text-p">ID: <span className="admin-event-event-text">{event.eventID}</span></p>
                                            <p className="admin-event-event-text-p">Evento: <span className="admin-event-event-text">{event.eventName}</span></p>
                                            <p className="admin-event-event-text-p">Local: <span className="admin-event-event-text">{event.eventLocation}</span></p>
                                            <p className="admin-event-event-text-p">Data: <span className="admin-event-event-text">{longDate(event.eventDate)}</span></p>
                                            <p className="admin-event-event-text-p">Inicio: <span className="admin-event-event-text">{event.eventTime}</span></p>
                                            <p className="admin-event-event-text-p">Pessoas cadastradas: <span className="admin-event-event-text">{event.eventQtdPeople.registred.length} / {event.eventQtdPeople.qtd}</span></p>
                                        </div>
                                        {/* <div>
                                            <button className="admin-event-open-event-button">VISUALIZAR</button>
                                        </div> */}
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
export default AdminEvent;