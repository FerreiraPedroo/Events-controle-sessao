import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PageContext } from "../../context/context";
import axios from "axios";
import "./UserEvent.css"

function longDate(dateTimeStamp, infoReturn) {
    if (dateTimeStamp === undefined || infoReturn === undefined) return "";
    if (infoReturn === "dateBR") {
        const rawDate = new Date(Number(dateTimeStamp)).toISOString("pt-BR")
        const dateLong = rawDate.slice(0, 10).split('-').reverse().join("/")
        return (dateLong)

    } else if (infoReturn === "datePassed") {
        // COMPARA DATA RECEBIDA COM A DATA ATUAL(HOJE), SE JÁ ESTIVER PASSADO RETURNA "true" NÃO TENDO PASSADO OU SEJA NO MESMO DIA RETORNA "false"
        const dateActual = new Date().getTime()
        const dateDiference = dateTimeStamp - dateActual;
        const datePassed = parseInt((((parseInt(dateDiference / 1000) / 60) / 60) / 24))
        if (datePassed > 0) {
            return false;
        } else {
            return true;
        }

    } else if (infoReturn === "dateDescribe") {
        const rawDate = new Date(Number(dateTimeStamp)).toISOString("pt-BR")
        const meses = { "01": "Janeiro", "02": "Fevereiro", "03": "Março", "04": "Abril", "05": "Maio", "06": "Junho", "07": "Julho", "08": "Agosto", "09": "Setembro", "10": "Outubro", "11": "Novembro", "12": "Dezembro" };
        const dateLong = rawDate.slice(0, 10).split('-').reverse()
        return (dateLong[0] + " " + meses[String(dateLong[1])] + " de " + dateLong[2])
    }

}

function UserEvent() {
    const [dataEvent, setDataEvent] = useState();
    const [subscriptShow, setSubscriptShow] = useState();
    const [qrcodeshow, setQrCodeShow] = useState(false)
    const { loged, setLoged, eventId, setEventId } = useContext(PageContext);
    const history = useHistory()


    function ButtonEventRegister() {
        if (!!dataEvent.registred) {
            return (
                <>
                    <div className="user-event-container-eventname-registred-text">Inscrito</div>
                    <button className="user-event-button-subscript" onClick={() => { setQrCodeShow(true) }}>CONVITE QRCODE</button>
                </>
            )
        } else if (dataEvent.getBackData[0].eventQtdPeople.registred.length >= Number(dataEvent.getBackData[0].eventQtdPeople.qtd) || longDate(dataEvent.getBackData[0].eventDate, "datePassed")) {
            return <div className="user-event-container-eventname-date-end">Inscrições encerradas</div>
        } else {
            return <button className="user-event-button-subscript" onClick={() => { setSubscriptShow(true) }}>REALIZAR INSCRIÇÃO</button>
        }
    }
    function SubscriptSubPage() {
        return (
            <div id="user-event-confirm" className="user-event-container-register">
                <div className="user-event-container-register-form animatein">
                    <div className="user-event-container-register-form-imgcontainer">
                        <img className="user-event-container-register-form-img-avatar" src={dataEvent.getBackData[0].eventImagem === "" ? "/img/event.jpg" : dataEvent.getBackData[0].eventImagem} alt="Avatar" />
                    </div>
                    <div className="user-event-container-confirm">
                        <button className="confirmbtn" onClick={subscriptSend}>CONFIRMAR</button>
                        <button className="cancelbtn" onClick={() => { setSubscriptShow(false) }}>CANCELAR</button>
                    </div>
                </div>
            </div>
        )
    }
    function subscriptSend() {
        console.log(dataEvent.getBackData[0].eventID)
        axios(
            {
                method: "post",
                url: "http://127.0.0.1:8000/user/data",
                data: {
                    "eventID": dataEvent.getBackData[0].eventID,
                    "retrieve": "usereventregister",
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
                    setEventId(eventId);
                    setLoged(true);
                    return history.push('/user/event')
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
    function QrCodeSubPage() {
        console.log(dataEvent.registred.qrcodeImg)
        return (
            <div key="qrcode" id={qrcodeshow ? "user-event-confirm-true" : "user-event-confirm-false"} className="user-event-container-register">
                <div className="user-event-container-register-form animatein">
                    <div className="user-event-container-register-form-imgcontainer">
                    <img src={dataEvent.registred.qrcodeImg} alt="QRCODE" />
                    </div>
                    <div className="user-event-container-confirm">
                        <button className="confirmbtn" onClick={() => { setQrCodeShow(false) }}>VOLTAR</button>
                    </div>
                </div>
            </div>
        )
    }


    useEffect(() => {
        if (eventId === null) return history.push('/home');
        (async () => {
            function loadUserEventData(id) {
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
                    console.log("AXIOSRES: ", axiosRes)
                    if (axiosRes.code === "20") {
                        if (document.cookie.split("=")[0] === "SID" ? true : false) {
                            setDataEvent(axiosRes);
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
            await loadUserEventData(eventId);
        })()
    }, [])

    if (dataEvent === undefined) { return (<div></div>) };

    return (
        <div className="user-event-container">

            <div className="user-event-container-banner">
                <img src={dataEvent.getBackData[0].eventImagem === "" ? "/img/event.jpg" : dataEvent.getBackData[0].eventImagem} alt="evento imagem" />
            </div>

            <div className="user-event-container-eventname">
                <div className="user-event-container-eventname-info">
                    <p className="user-event-container-eventname-text">{dataEvent.getBackData[0].eventName}</p>
                    <p className="user-event-container-eventname-date">{dataEvent.getBackData[0].eventLocation}</p>
                    <p className="user-event-container-eventname-date">{longDate(dataEvent.getBackData[0].eventDate, "dateBR")} – {dataEvent.getBackData[0].eventTime} – GMT-3</p>
                    <p className="user-event-container-eventname-date">Pessoas cadastradas – {dataEvent.getBackData[0].eventQtdPeople.registred.length} / {dataEvent.getBackData[0].eventQtdPeople.qtd}</p>
                </div>
                <div className="user-event-button">
                    <ButtonEventRegister />
                </div>
            </div>

            <div className="user-event-container-eventname">
                <div className="user-event-container-eventname-info">
                    <p className="user-event-container-eventname-description">INFORMAÇÕES DO EVENTO</p>
                    <p className="user-event-container-eventname-date">{dataEvent.getBackData[0].eventDescription}</p>
                </div>
            </div>
            {subscriptShow && <SubscriptSubPage />}
            {qrcodeshow ? <QrCodeSubPage /> : ""}
        </div>
    );
}

export default UserEvent;