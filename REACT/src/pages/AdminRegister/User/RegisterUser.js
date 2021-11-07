import React, { useContext, useState } from "react";
import { PageContext } from "../../../context/context";
import { useFormik } from "formik";
import "./RegisterUser.css"
import axios from "axios";

function RegisterUser() {
    const { loged, setLoged } = useContext(PageContext);
    const [getBackDataStatus, setGetDataBackStatus] = useState("");

    const validate = values => {
        console.log(values)
        setGetDataBackStatus("")
        const errors = {};
        if (!values.fullName) {
            errors.fullName = 'Requerido';
        } else if (values.fullName.split(" ").length < 2) {
            errors.fullName = 'Digite seu nome completo';
        }

        if (!values.email) {
            errors.email = 'Requerido';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Endereço de e-mail inválido';
        }

        if (!values.docCPF) {
            errors.docCPF = 'Requerido';
        } else if (values.docCPF.length !== 11) {
            errors.docCPF = 'O CPF deve ter 11 digitos';
        }

        if (!values.userName) {
            errors.userName = 'Requerido';
        } else if (values.userName.length < 8) {
            errors.userName = 'Deve ter 8 digitos ou mais';
        }

        if (!values.firstPass) {
            errors.firstPass = 'Requerido';
        } else if (values.firstPass.length < 6) {
            errors.firstPass = 'Deve ter 6 digitos ou mais';
        }

        if (!values.secondPass) {
            errors.secondPass = 'Requerido';
        } else if (values.secondPass.length < 6) {
            errors.secondPass = 'Deve ter 6 digitos ou mais';
        } else if ((!!values.secondPass && !!values.firstPass) && (values.secondPass !== values.firstPass)) {
            errors.secondPass = 'A senha não é igual';
        }

        return errors;
    };
    const initialValues = {
        // fullName: '',
        // email: '',
        // docCPF: '',
        // userPhoto: '',
        // userName: '',
        // firstPass: '',
        // secondPass: ''
        fullName: '11111 11111',
        email: '111@111.com',
        docCPF: '11111111111',
        userPhoto: '',
        userName: '11111111111',
        firstPass: '11111111111',
        secondPass: '11111111111'
    }

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: async (values, { resetForm }) => {
            await axios({
                method: "post",
                url: "http://127.0.0.1:8000/admin/register/user",
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
                                            fullName: "",
                                            email: "",
                                            docCPF: "",
                                            userPhoto: "",
                                            userName: "",
                                            firstPass: "",
                                            secondPass: ""
                                        }
                                    })
                                setGetDataBackStatus(axiosRes.getBackData);
                            } else {
                                resetForm({
                                    values: {
                                        fullName: values.fullName,
                                        email: values.email,
                                        docCPF: values.docCPF,
                                        userPhoto: values.userPhoto,
                                        userName: "",
                                        firstPass: "",
                                        secondPass: ""
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
                    console.log("axios error - login")
                    setLoged(false);
                })
        }
    });

    return (
        <div className="registeruser-container">
            <h1 className="registeruser-title">CADASTRAR USUÁRIO</h1>
            <form className="registeruser-register" onSubmit={formik.handleSubmit}>
                <div>
                    <label forhtml="fullName" className="registeruser-form-label">Nome completo</label>
                    <div>
                        <input
                            type="text" className="registeruser-form-input" id="fullName" name="fullName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullName}
                        />
                        {formik.touched.fullName && formik.errors.fullName ? (
                            <div className="registeruser-register-error">{formik.errors.fullName}</div>
                        ) : <div className="registeruser-register-error"> </div>}
                    </div>
                </div>
                <div>
                    <label forhtml="email" className="registeruser-form-label">Email</label>
                    <div>
                        <input
                            type="email" className="registeruser-form-input" id="email" name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="registeruser-register-error">{formik.errors.email}</div>
                        ) : <div className="registeruser-register-error"> </div>}
                    </div>
                </div>
                <div>
                    <label forhtml="docCPF" className="registeruser-form-label">CPF</label>
                    <div>
                        <input
                            type="text" className="registeruser-form-input" id="docCPF" name="docCPF"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.docCPF}
                        />
                        {formik.touched.docCPF && formik.errors.docCPF ? (
                            <div className="registeruser-register-error">{formik.errors.docCPF}</div>
                        ) : <div className="registeruser-register-error"> </div>}
                    </div>
                </div>
                <div>
                    <label forhtml="userPhoto" className="registeruser-form-label">Foto</label>
                    <div>
                        <input
                            type="file" className="registeruser-form-input-img" id="userPhoto" name="userPhoto" accept="image/*"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userPhoto}
                        />
                        <div className="registeruser-register-error"> </div>
                    </div>
                </div>
                <div>
                    <label forhtml="userName" className="registeruser-form-label">Nome de usuário</label>
                    <div>
                        <input
                            type="text" className="registeruser-form-input" id="userName" name="userName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userName}
                        />
                        {formik.touched.userName && formik.errors.userName ? (
                            <div className="registeruser-register-error">{formik.errors.userName}</div>
                        ) : <div className="registeruser-register-error"> </div>}
                    </div>
                </div>
                <div>
                    <label forhtml="firstPass" className="registeruser-form-label">Senha</label>
                    <div>
                        <input
                            type="password" className="registeruser-form-input" id="firstPass" name="firstPass"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstPass}
                        />
                        {formik.touched.firstPass && formik.errors.firstPass ? (
                            <div className="registeruser-register-error">{formik.errors.firstPass}</div>
                        ) : <div className="registeruser-register-error"> </div>}
                    </div>
                </div>
                <div>
                    <label forhtml="secondPass" className="registeruser-form-label">Repetir Senha</label>
                    <div>
                        <input
                            type="password" className="registeruser-form-input" id="secondPass" name="secondPass"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.secondPass}
                        />
                        {formik.touched.secondPass && formik.errors.secondPass ? (
                            <div className="registeruser-register-error">{formik.errors.secondPass}</div>
                        ) : <div className="registeruser-register-error"> </div>}
                    </div>
                </div>
                <button type="submit" className="registeruser-form-button">Cadastrar</button>
            </form>
            {
                getBackDataStatus !== "" ? <div className={getBackDataStatus.code === "20" ? "registeruser-status-green" : "registeruser-status-red"}>{getBackDataStatus.msg}</div> : ""
            }
        </div>
    )
}

export default RegisterUser;