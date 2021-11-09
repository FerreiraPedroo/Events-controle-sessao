import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../../context/context";
import axios from "axios";
import "./AdminHome.css"

function longDate(dateTimeStamp) {
    const rawDate = new Date(Number(dateTimeStamp)).toISOString("pt-BR")
    if (dateTimeStamp === undefined) return "";
    const meses = { "01": "Janeiro", "02": "Fevereiro", "03": "Março", "04": "Abril", "05": "Maio", "06": "Junho", "07": "Julho", "08": "Agosto", "09": "Setembro", "10": "Outubro", "11": "Novembro", "12": "Dezembro" };
    const dateLong = rawDate.slice(0, 10).split('-').reverse()
    return (dateLong[0] + " " + meses[String(dateLong[1])] + " de " + dateLong[2])
}

function AdminHome() {
    const [dataHome, setDataHome] = useState();
    const { loged, setLoged } = useContext(PageContext);

    useEffect(() => {
        (async () => {
            function loadHomeData() {
                axios(
                    {
                        method: "post",
                        url: "http://127.0.0.1:8000/admin/data",
                        data: {
                            retrieve: "adminhome"
                        },
                        headers: {
                            "Access-Control-Allow-Origin": "http://127.0.0.1:3000"
                        },
                        withCredentials: true
                    }
                ).then((response) => {
                    let axiosRes = response.data;
                    console.log(axiosRes)
                    if (axiosRes.code === "20") {
                        if (document.cookie.split("=")[0] === "SID" ? true : false) {
                            axiosRes.getBackData.lastEventAdd.reverse()
                            setDataHome(axiosRes.getBackData);
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
            await loadHomeData();
        })()
    }, [])

    if (dataHome === undefined) { return <div></div> };

    console.log(dataHome)
    return (
        <div className="home-container">

            <div className="home-container-top">
                <div className="home-container-top-column">
                    <div className="home-container-top-card">
                        <p></p>
                        <h3>{dataHome.totalMonthEvent}</h3>
                        <p>EVENTOS EM <span className="home-container-top-card-month">OUTUBRO/21</span></p>
                    </div>
                </div>

                <div className="home-container-top-column">
                    <div className="home-container-top-card">
                        <p></p>
                        <h3>{dataHome.allEventQtd}</h3>
                        <p>TOTAL EVENTOS</p>
                    </div>
                </div>

                <div className="home-container-top-column">
                    <div className="home-container-top-card">
                        <p></p>
                        <h3>{dataHome.peopleQtd}</h3>
                        <p>TOTAL PESSOAS CADASTRADAS</p>
                    </div>
                </div>
            </div>

            <div className="home-container-center">
                <div className="home-container-list-info">
                    <p className="home-container-list-info-title">ULTIMO EVENTO ADICIONADO</p>
                    {
                        dataHome.lastEventAdd.map((event) => {
                            return (
                                <div key={event.eventID} className="home-event">
                                    {console.log(event)}
                                    <img className="home-event-img" src={event.eventImagem === "" ? "/img/event.png" : event.eventImagem} alt="Imagem do evento" />
                                    <div className="home-event-info-container">
                                        <div>
                                            <p className="home-event-text-p">ID: <span className="home-event-text">{event.eventID}</span></p>
                                            <p className="home-event-text-p">Evento: <span className="home-event-text">{event.eventName}</span></p>
                                            <p className="home-event-text-p">Local: <span className="home-event-text">{event.eventLocation}</span></p>
                                            <p className="home-event-text-p">Data: <span className="home-event-text">{longDate(event.eventDate)}</span></p>
                                            <p className="home-event-text-p">Inicio: <span className="home-event-text">{event.eventTime}</span></p>
                                        </div>
                                        <div>
                                            <button id={event.eventID} className="home-open-event-button">VISUALIZAR</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="home-container-center">
                <div className="home-container-list-info">
                    <p className="home-container-list-info-title">ULTIMA PESSOA CADASTRADA</p>
                    {
                        dataHome.lastUserAdd.map((user) => {
                            return (
                                <div key={user.ID} className="home-event">
                                    {console.log(user)}
                                    <img className="home-event-img-people" src={user.userPhoto === "" ? "/img/user.jpg" : user.userPhoto} alt="Imagem do evento" />
                                    <div className="home-event-info-container">
                                        <div>
                                            <p className="home-event-text-p">ID: <span className="home-event-text">{user.ID}</span></p>
                                            <p className="home-event-text-p">Nome: <span className="home-event-text">{user.fullName}</span></p>
                                            <p className="home-event-text-p">E-Mail: <span className="home-event-text">{user.email}</span></p>
                                        </div>
                                        <div>
                                            <button id={user.userID} className="home-open-event-button">VISUALIZAR</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div >
    );
}
export default AdminHome;