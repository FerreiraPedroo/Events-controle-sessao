import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../../context/context";
import axios from "axios";
import "./Home.css"

async function loadHomeData(setLoged, setDataHome) {
    const data = await axios(
        {
            method: "post",
            url: "http://127.0.0.1:8000/data",
            data: {
                retrieve: "home"
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
                axiosRes.getBackData.lastEventAdd.reverse()
                setDataHome(axiosRes);
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

function Home() {
    const [dataHome, setDataHome] = useState();
    const { loged, setLoged } = useContext(PageContext);

    useEffect(() => {
        (async () => {
            await loadHomeData(setLoged, setDataHome);
        })()
        console.log(dataHome)
    }, [])

    if (dataHome === undefined) { return <></> };
    return (
        <div className="home-container">

            <div className="home-container-top">
                <div className="home-container-top-column">
                    <div className="home-container-top-card">
                        <p></p>
                        <h3>{dataHome.getBackData.totalMonthEvent}</h3>
                        <p>EVENTOS EM <span className="home-container-top-card-month">OUTUBRO/21</span></p>
                    </div>
                </div>

                <div className="home-container-top-column">
                    <div className="home-container-top-card">
                        <p></p>
                        <h3>{dataHome.getBackData.allEventQtd}</h3>
                        <p>TOTAL EVENTOS</p>
                    </div>
                </div>

                <div className="home-container-top-column">
                    <div className="home-container-top-card">
                        <p></p>
                        <h3>{dataHome.getBackData.peopleQtd}</h3>
                        <p>TOTAL PESSOAS CADASTRADAS</p>
                    </div>
                </div>
            </div>

            <div className="home-container-center">
                <div className="home-container-list-info">
                    <p className="home-container-list-info-title">ULTIMOS EVENTOS ADICIONADOS </p>
                    {
                        dataHome.getBackData.lastEventAdd.map((event) => {
                            return (
                                <div key={event.eventID} className="home-event">
                                    {console.log(event)}
                                    <img className="home-event-img" src={event.eventImagem === "" ? "event.png" : event.eventImagem} alt="Imagem do evento" />
                                    <div className="home-event-info-container">
                                        <div>
                                            <p className="home-event-text-p">ID: <span className="home-event-text">{event.eventID}</span></p>
                                            <p className="home-event-text-p">Evento: <span className="home-event-text">{event.eventName}</span></p>
                                            <p className="home-event-text-p">Local: <span className="home-event-text">{event.Location}</span></p>
                                            <p className="home-event-text-p">Data: <span className="home-event-text">{event.eventDate}</span></p>
                                            <p className="home-event-text-p">Inicio: <span className="home-event-text">{event.eventTime}</span></p>
                                        </div>
                                        <div>
                                            <button id={event.eventID} className="home-open-event-button">Visualizar</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>


                <div className="home-container-list-info">
                    <p className="home-container-list-info-title">EVENTOS DE HOJE : 31/10/2021</p>
                    <div className="home-event">
                        <img className="home-event-img" src="./event.png" alt="Imagem do evento" />
                        <div className="home-event-info-container">
                            <div>
                                <p className="home-event-text-p">ID: <span className="home-event-text">xxx-xxx</span></p>
                                <p className="home-event-text-p">Evento: <span className="home-event-text">Nome completo do Evento de estreia</span></p>
                                <p className="home-event-text-p">Local: <span className="home-event-text">Rua do beco A, com esquina da rua 7</span></p>
                                <p className="home-event-text-p">Data: <span className="home-event-text">31/10/2021</span></p>
                                <p className="home-event-text-p">Inicio: <span className="home-event-text">18:00</span></p>
                            </div>
                            <div>
                                <p className="home-event-text-p">Status: <span className="home-event-text">Em andamento</span></p>
                                <button className="home-open-event-button">Visualizar</button>
                            </div>
                        </div>
                    </div>


                </div>

            </div>

        </div >
    );
}
export default Home;