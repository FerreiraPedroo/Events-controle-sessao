import React, { useContext, useState } from "react";
import { PageContext } from "../../../context/context";
import { useFormik } from "formik";
import axios from "axios";
import "./RegisterEvent.css"



function RegisterEvent() {
    const { loged, setLoged } = useContext(PageContext);
    const [getBackDataStatus, setGetDataBackStatus] = useState("");

    const validate = values => {
        setGetDataBackStatus("")
        const errors = {};
        if (!values.eventName) {
            errors.eventName = 'Requerido';
        } else if (values.eventName.length < 6) {
            errors.eventName = 'Deve ter 6 digitos ou mais';
        }

        if (!values.eventDescription) {
            errors.eventDescription = 'Requerido';
        } else if (values.eventDescription.length < 6) {
            errors.eventDescription = 'Deve ter 6 digitos ou mais';
        }

        if (!values.eventLocation) {
            errors.eventLocation = 'Requerido';
        } else if (values.eventLocation.length < 6) {
            errors.eventLocation = 'Deve ter 6 digitos ou mais';
        }

        // if (!values.eventHost) {
        //     errors.eventHost = 'Requerido';
        // } else if (values.eventHost.length < 6) {
        //     errors.eventHost = 'Deve ter 6 digitos ou mais';;
        // }

        if (!values.eventQtdPeople) {
            errors.eventQtdPeople = 'Requerido';
        } else if (values.eventQtdPeople <= 0) {
            errors.eventQtdPeople = 'A quantidade deve ser maior que 0';
        }

        if (!values.eventDate) {
            errors.eventDate = 'Requerido';
        } else if (values.eventDate.length < 10) {
            errors.eventDate = 'Insira uma data valida.';
        }

        if (!values.eventTime) {
            errors.eventTime = 'Requerido';
        }

        return errors;
    };
    const initialValues = {
        eventName: 'Primeiro',
        eventDescription: 'Primeiro evento do ano 2022',
        eventLocation: 'Casa123',
        eventHost: 'Eu',
        eventQtdPeople: 1,
        eventDate: '',
        eventTime: '23:59',
        eventImagem: './event.png'

        // eventName: '',
        // eventDescription: '',
        // eventLocation: '',
        // eventHost: '',
        // eventQtdPeople: '',
        // eventDate: '',
        // eventTime: '',
        // eventImagem: ''
    }

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: async (values, { resetForm }) => {
            await axios({
                method: "post",
                url: "http://127.0.0.1:8000/admin/register/event",
                data: values,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                withCredentials: true
            })
                .then((response) => {
                    let axiosRes = response.data;
                    if (axiosRes.code === "20") {
                        if (document.cookie.split("=")[0] === "SID" ? true : false) {
                            setLoged(true);
                            if (axiosRes.getBackData.code === "20") {
                                resetForm(
                                    {
                                        values: {
                                            eventName: "",
                                            eventDescription: "",
                                            eventLocation: "",
                                            eventHost: "",
                                            eventQtdPeople: "",
                                            eventDate: "",
                                            eventTime: "",
                                            eventImagem: ""
                                        }
                                    })
                                setGetDataBackStatus(axiosRes.getBackData);
                            } else {
                                resetForm({
                                    values: {
                                        eventName: "",
                                        eventDescription: "",
                                        eventLocation: "",
                                        eventHost: "",
                                        eventQtdPeople: "",
                                        eventDate: "",
                                        eventTime: "",
                                        eventImagem: ""
                                    }
                                })
                                setGetDataBackStatus(axiosRes.getBackData);
                            }
                        } else {
                            setLoged(false);
                        }
                    } else {
                        setLoged(false);
                    }
                })
                .catch((response) => {
                    console.log("AXIOS ERROR - NO LOGIN")
                    setLoged(false);
                })
        }
    });



    return (
        <div className="registerevent-container">
            <h1 className="registerevent-title">CADASTRAR EVENTO</h1>
            <form className="registerevent-register" onSubmit={formik.handleSubmit}>
                <div>
                    <label forhtml="eventName" className="registerevent-form-label">Evento</label>
                    <div>
                        <input
                            type="text" className="registerevent-form-input" id="eventName" name="eventName" required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.eventName}
                        />
                        {formik.touched.eventName && formik.errors.eventName ? (
                            <div className="registerevent-register-error">{formik.errors.eventName}</div>
                        ) : <div className="registerevent-register-error"> </div>}
                    </div>
                </div>
                <div>
                    <label forhtml="eventDescription" className="registerevent-form-label">Descrição do evento</label>
                    <div>
                        <textarea
                            className="registerevent-form-textarea" id="eventDescription" name="eventDescription" rows="3" cols="30" required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.eventDescription}
                        />
                        {formik.touched.eventDescription && formik.errors.eventDescription ? (
                            <div className="registerevent-register-error">{formik.errors.eventDescription}</div>
                        ) : <div className="registerevent-register-error"> </div>}
                    </div>
                </div>
                <div>
                    <label forhtml="eventLocation" className="registerevent-form-label">Local</label>
                    <div>
                        <input
                            type="text" className="registerevent-form-input" id="eventLocation" name="eventLocation" required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.eventLocation}
                        />
                        {formik.touched.eventLocation && formik.errors.eventLocation ? (
                            <div className="registerevent-register-error">{formik.errors.eventLocation}</div>
                        ) : <div className="registerevent-register-error"> </div>}
                    </div>
                </div>
                <div>
                    <label forhtml="eventHost" className="registerevent-form-label">Anfitrião</label>
                    <div>
                        <input
                            type="text" className="registerevent-form-input" id="eventHost" name="eventHost"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.eventHost}
                        />
                        {formik.touched.eventHost && formik.errors.eventHost ? (
                            <div className="registerevent-register-error">{formik.errors.eventHost}</div>
                        ) : <div className="registerevent-register-error">&nbsp; </div>}
                    </div>
                </div>
                <div>
                    <label forhtml="eventQtdPeople" className="registerevent-form-label">Quantidade de convidados</label>
                    <div>
                        <input
                            type="number" className="registerevent-form-input" id="eventQtdPeople" name="eventQtdPeople" required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.eventQtdPeople}
                        />
                        {formik.touched.eventQtdPeople && formik.errors.eventQtdPeople ? (
                            <div className="registerevent-register-error">{formik.errors.eventQtdPeople}</div>
                        ) : <div className="registerevent-register-error"> </div>}
                    </div>
                </div>
                <div>
                    <label forhtml="eventDate" className="registerevent-form-label">Data do evento</label>
                    <div>
                        <input
                            type="date" className="registerevent-form-input" id="eventDate" name="eventDate" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.eventDate}
                        />
                        {formik.touched.eventDate && formik.errors.eventDate ? (
                            <div className="registerevent-register-error">{formik.errors.eventDate}</div>
                        ) : <div className="registerevent-register-error"> </div>}
                    </div>
                </div>
                <div>
                    <label forhtml="eventTime" className="registerevent-form-label">Hora do inicio</label>
                    <div>
                        <input
                            type="time" className="registerevent-form-input" id="eventTime" name="eventTime" required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.eventTime}
                        />
                        {formik.touched.eventTime && formik.errors.eventTime ? (
                            <div className="registerevent-register-error">{formik.errors.eventTime}</div>
                        ) : <div className="registerevent-register-error"> </div>}
                    </div>
                </div>
                <div>
                    <label forhtml="eventImagem" className="registerevent-form-label">Imagens</label>
                    <div>
                        <input type="file" className="registerevent-form-input-img" id="eventImagem" name="eventImagem" accept="image/*" />
                    </div>
                </div>
                <button type="submit" className="registerevent-form-button">Cadastrar</button>
            </form>
            {
                getBackDataStatus !== "" ? <div className={getBackDataStatus.code === "20" ? "registerevent-status-green" : "registerevent-status-red"}>{getBackDataStatus.msg}</div> : ""
            }
        </div>
    )
}

export default RegisterEvent;