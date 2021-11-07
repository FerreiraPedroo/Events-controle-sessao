console.log(""); console.log(""); console.log("");
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const bcrypt = require("bcrypt");
const validationLoginCookie = require("./funcoes/validationLoginCookie");
// const d = new Date(2021, (11)-1, 30).getTime()
// const d = new Date().getTime()
// console.log(d)
// console.log(new Date(d))

const event =
    [
        {
            eventID: 1,
            eventName: "XVI ENFOC - Encontro de Iniciação Científica e Fórum Científico, VII Seminário PIBID - Programa Institucional de Bolsa de Iniciação à Docência",
            eventDescription: "XVI ENFOC - Encontro de Iniciação Científica e Fórum Científico, VII Seminário PIBID - Programa Institucional de Bolsa de Iniciação à Docência",
            eventLocation: "São José dos Campos, São Paulo",
            eventHost: "Alpha EdTech",
            eventFinish: false,
            eventQtdPeople:
            {
                qtd: "20",
                registred: [
                    { "userName": "Pedro", "qrCode": "" },
                    { "userName": "PH", "qrCode": "" },
                    { "userName": "master", "qrCode": "" }
                ],
                confirmed: [
                    { "userName": "Pedro", "qrCode": "", "date": "1638241200000", "time": "00:00" },
                ]
            },
            eventDate: "1638241200000",
            eventTime: "14:00",
            eventImagem: "./event.png"
        },
        {
            eventID: 2,
            eventName: "Ano novo em Nova York",
            eventDescription: "Ano novo na times square",
            eventLocation: "Nova York, Times square",
            eventHost: "EUA",
            eventFinish: false,
            eventQtdPeople:
            {
                qtd: "5000",
                registred: [
                    {}
                ],
                confirmed: [
                    {}
                ]
            },
            eventDate: "1640919600000",
            eventTime: "20:00",
            eventImagem: "./event.png"
        },
        {
            eventID: 3,
            eventName: "Ano novo em Copacabana",
            eventDescription: "Ano novo na praia de Copacabana",
            eventLocation: "Brasil, Rio de Janeiro",
            eventHost: "EUA",
            eventFinish: false,
            eventQtdPeople:
            {
                qtd: "5000",
                registred: [
                    {}
                ],
                confirmed: [
                    {}
                ]
            },
            eventDate: "1640919600000",
            eventTime: "20:00",
            eventImagem: "./event.png"
        },
        {
            eventID: 4,
            eventName: "XVI ENFOC - Encontro de Iniciação Científica e Fórum Científico, VII Seminário PIBID - Programa Institucional de Bolsa de Iniciação à Docência",
            eventDescription: "XVI ENFOC - Encontro de Iniciação Científica e Fórum Científico, VII Seminário PIBID - Programa Institucional de Bolsa de Iniciação à Docência",
            eventLocation: "França, Paris",
            eventHost: "EUA",
            eventFinish: false,
            eventQtdPeople:
            {
                qtd: "5000",
                registred: [
                    {}
                ],
                confirmed: [
                    {}
                ]
            },
            eventDate: "1640919600000",
            eventTime: "20:00",
            eventImagem: "./event.png"
        },
        {
            eventID: 5,
            eventName: "XVI ENFOC - Encontro de Iniciação Científica e Fórum Científico, VII Seminário PIBID - Programa Institucional de Bolsa de Iniciação à Docência",
            eventDescription: "XVI ENFOC - Encontro de Iniciação Científica e Fórum Científico, VII Seminário PIBID - Programa Institucional de Bolsa de Iniciação à Docência",
            eventLocation: "São José dos Campos, São Paulo",
            eventHost: "Alpha EdTech",
            eventFinish: false,
            eventQtdPeople:
            {
                qtd: "20",
                registred: [
                    { "userName": "Pedro", "qrCode": "" },
                    { "userName": "PH", "qrCode": "" },
                    { "userName": "master", "qrCode": "" }
                ],
                confirmed: [
                    { "userName": "Pedro", "qrCode": "", "date": "1638241200000", "time": "00:00" },
                ]
            },
            eventDate: "1638241200000",
            eventTime: "14:00",
            eventImagem: "./event.png"
        },
        {
            eventID: 6,
            eventName: "Ano novo em Nova York",
            eventDescription: "Ano novo na times square",
            eventLocation: "Nova York, Times square",
            eventHost: "EUA",
            eventFinish: false,
            eventQtdPeople:
            {
                qtd: "5000",
                registred: [
                    {}
                ],
                confirmed: [
                    {}
                ]
            },
            eventDate: "1640919600000",
            eventTime: "20:00",
            eventImagem: "./event.png"
        },
        {
            eventID: 7,
            eventName: "Ano novo em Copacabana",
            eventDescription: "Ano novo na praia de Copacabana",
            eventLocation: "Brasil, Rio de Janeiro",
            eventHost: "EUA",
            eventFinish: false,
            eventQtdPeople:
            {
                qtd: "5000",
                registred: [
                    {}
                ],
                confirmed: [
                    {}
                ]
            },
            eventDate: "1640919600000",
            eventTime: "20:00",
            eventImagem: "./event.png"
        },
        {
            eventID: 8,
            eventName: "XVI ENFOC - Encontro de Iniciação Científica e Fórum Científico, VII Seminário PIBID - Programa Institucional de Bolsa de Iniciação à Docência",
            eventDescription: "XVI ENFOC - Encontro de Iniciação Científica e Fórum Científico, VII Seminário PIBID - Programa Institucional de Bolsa de Iniciação à Docência",
            eventLocation: "França, Paris",
            eventHost: "EUA",
            eventFinish: false,
            eventQtdPeople:
            {
                qtd: "5000",
                registred: [
                    {}
                ],
                confirmed: [
                    {}
                ]
            },
            eventDate: "1640919600000",
            eventTime: "20:00",
            eventImagem: "./event.png"
        },
        {
            eventID: 10,
            eventName: "XVI ENFOC - Encontro de Iniciação Científica e Fórum Científico, VII Seminário PIBID - Programa Institucional de Bolsa de Iniciação à Docência",
            eventDescription: "XVI ENFOC - Encontro de Iniciação Científica e Fórum Científico, VII Seminário PIBID - Programa Institucional de Bolsa de Iniciação à Docência",
            eventLocation: "São José dos Campos, São Paulo",
            eventHost: "Alpha EdTech",
            eventFinish: false,
            eventQtdPeople:
            {
                qtd: "20",
                registred: [
                    { "userName": "Pedro", "qrCode": "" },
                    { "userName": "PH", "qrCode": "" },
                    { "userName": "master", "qrCode": "" }
                ],
                confirmed: [
                    { "userName": "Pedro", "qrCode": "", "date": "1638241200000", "time": "00:00" },
                ]
            },
            eventDate: "1638241200000",
            eventTime: "14:00",
            eventImagem: "./event.png"
        },
        {
            eventID: 11,
            eventName: "Ano novo em Nova York",
            eventDescription: "Ano novo na times square",
            eventLocation: "Nova York, Times square",
            eventHost: "EUA",
            eventFinish: false,
            eventQtdPeople:
            {
                qtd: "5000",
                registred: [
                    {}
                ],
                confirmed: [
                    {}
                ]
            },
            eventDate: "1640919600000",
            eventTime: "20:00",
            eventImagem: "./event.png"
        },
        {
            eventID: 107,
            eventName: "Ano novo em Copacabana",
            eventDescription: "Ano novo na praia de Copacabana",
            eventLocation: "Brasil, Rio de Janeiro",
            eventHost: "EUA",
            eventFinish: false,
            eventQtdPeople:
            {
                qtd: "5000",
                registred: [
                    {}
                ],
                confirmed: [
                    {}
                ]
            },
            eventDate: "1640919600000",
            eventTime: "20:00",
            eventImagem: "./event.png"
        },
        {
            eventID: 1008,
            eventName: "XVI ENFOC - Encontro de Iniciação Científica e Fórum Científico, VII Seminário PIBID - Programa Institucional de Bolsa de Iniciação à Docência",
            eventDescription: "XVI ENFOC - Encontro de Iniciação Científica e Fórum Científico, VII Seminário PIBID - Programa Institucional de Bolsa de Iniciação à Docência",
            eventLocation: "França, Paris",
            eventHost: "EUA",
            eventFinish: false,
            eventQtdPeople:
            {
                qtd: "5000",
                registred: [
                    {}
                ],
                confirmed: [
                    {}
                ]
            },
            eventDate: "1640919600000",
            eventTime: "20:00",
            eventImagem: "./event.png"
        }
    ]
const people = [
    {
        peopleID: 1,
        fullName: "Pedro Henrique de Assis Ferreira",
        email: "master@master.com",
        docCPF: "000.000.000-99",
        userPhoto: "./img/photo.jpg",
        userName: "master12",
        firstPass: "123456789"
    },
    {
        peopleID: 2,
        fullName: '1111111 1111111111',
        email: 'email@email.com',
        docCPF: '12345678901',
        userPhoto: '',
        userName: '1',
        firstPass: '11111111111111111',
    }
]
const app = express();

app.use(cors({
    "origin": "http://127.0.0.1:3000",
    "methods": "GET,POST",
    "credentials": true
}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(validationLoginCookie);


app.post("/admin/data", (req, res) => {
    const reqBody = req.body;
    const getBackData = {};
    console.log("#########################################################################################################");
    console.log("# ROTA: '/admin/data' > METODO: 'POST'                                                                  #");
    console.log("# REQ BODY: " + JSON.stringify(reqBody));

    if (reqBody.sessionCookie.code === "20" && reqBody.level === 1) {
        console.log("# ADMIN - LOGED                                                                                         #");

        if (reqBody.retrieve === "adminhome") {
            ////////////////////////////////////////////////////////////
            // TOTAL DE EVENTOS CADASTRADOS
            getBackData.allEventQtd = event.length;

            ////////////////////////////////////////////////////////////
            // TOTAL DE PESSOAS CADASTRADAS
            getBackData.peopleQtd = people.length;

            ////////////////////////////////////////////////////////////
            // PEGA TODOS OS EVENTOS DO MÊS ATUAL;
            const actualDateMonth = new Date().getMonth() + 1;
            let totalMonthEvent = 0;
            let dateEvent = "";
            for (let e = 0; e < event.length; e++) {
                dateEvent = new Date(Number(event[e].eventDate)).getMonth() + 1
                if (actualDateMonth === dateEvent) {
                    totalMonthEvent++;
                }
            }
            getBackData.totalMonthEvent = totalMonthEvent;

            ////////////////////////////////////////////////////////////
            // PEGA OS ULTIMO "n" EVENTOS CADASTRADOS.
            const lastEventAdd = [];
            const lastEventAddQtd = 3
            if (event.length <= lastEventAddQtd) {
                for (let e = 0; e < event.length; e++) {
                    lastEventAdd[e] = {
                        eventID: event[e].eventID,
                        eventName: event[e].eventName,
                        eventLocation: event[e].eventLocation,
                        eventDate: event[e].eventDate,
                        eventTime: event[e].eventTime,
                        eventImagem: event[e].eventImagem
                    }
                }
            } else {
                for (let e = 0; e < lastEventAddQtd; e++) {
                    lastEventAdd[e] = {
                        eventID: event.slice((event.length - lastEventAddQtd) + e, (event.length - lastEventAddQtd) + e + 1)[0].eventID,
                        eventName: event.slice((event.length - lastEventAddQtd) + e, (event.length - lastEventAddQtd) + e + 1)[0].eventName,
                        eventLocation: event.slice((event.length - lastEventAddQtd) + e, (event.length - lastEventAddQtd) + e + 1)[0].eventLocation,
                        eventDate: event.slice((event.length - lastEventAddQtd) + e, (event.length - lastEventAddQtd) + e + 1)[0].eventDate,
                        eventTime: event.slice((event.length - lastEventAddQtd) + e, (event.length - lastEventAddQtd) + e + 1)[0].eventTime,
                        eventImagem: event.slice((event.length - lastEventAddQtd) + e, (event.length - lastEventAddQtd) + e + 1)[0].eventImagem
                    }
                }
            }
            getBackData.lastEventAdd = lastEventAdd;
            reqBody.sessionCookie.getBackData = getBackData;
            ////////////////////////////////////////////////////////////
            console.log("# GETBACKDATA:", JSON.stringify(getBackData));
            console.log("# reqBody.sessionCookie:", JSON.stringify(reqBody.sessionCookie));
            console.log("#########################################################################################################");
            return res.send(reqBody.sessionCookie);
        }

        if (reqBody.retrieve === "adminuser") {
            reqBody.sessionCookie.getBackData = people.map((people) => {
                delete people.firstPass;
                return people;
            });
            console.log("# GETBACKDATA:", JSON.stringify(getBackData));
            console.log("# reqBody.sessionCookie:", JSON.stringify(reqBody.sessionCookie));
            console.log("#########################################################################################################");
            return res.send(reqBody.sessionCookie);
        }

        if (reqBody.retrieve === "adminevent") {
            reqBody.sessionCookie.getBackData = event
            console.log("# GETBACKDATA:", JSON.stringify(getBackData));
            console.log("# reqBody.sessionCookie:", JSON.stringify(reqBody.sessionCookie));
            console.log("#########################################################################################################");
            return res.send(reqBody.sessionCookie);
        }














    } else {
        console.log("# RES SEND: ", JSON.stringify(reqBody.sessionCookie).slice(0,160)+"...");
        console.log("# LOGIN ERROR                                                                                           #");
        console.log("#########################################################################################################");
        return res.send(reqBody.sessionCookie);
    }


})

app.post("/user/data", (req, res) => {
    const reqBody = req.body;
    const getBackData = {};
    console.log("#########################################################################################################");
    console.log("# ROTA: '/user/data' > METODO: 'POST'                                                                  #");
    console.log("# REQ BODY: " + JSON.stringify(reqBody));

    if (reqBody.sessionCookie.code === "20" && reqBody.level === 0) {
        console.log("# USER - LOGED                                                                                          #");

        if (reqBody.retrieve === "userhome") {
            reqBody.sessionCookie.getBackData = event.map((event) => {
                delete event.eventQtdPeople.confirmed
                for (let e = 0; e < event.eventQtdPeople.registred.length; e++) {
                    if (event.eventQtdPeople.registred[e].hasOwnProperty("userName")) {
                        event.eventQtdPeople.registeredTrue = event.eventQtdPeople.registred[e].userName === reqBody.user ? true : false
                    }
                }
                return event;
            })
            console.log("# GETBACKDATA:", JSON.stringify(getBackData));
            console.log("# reqBody.sessionCookie:", JSON.stringify(reqBody.sessionCookie));
            console.log("#########################################################################################################");
            return res.send(reqBody.sessionCookie);
        }
        if( reqBody.retrieve === "userevent") {
            reqBody.sessionCookie.getBackData = event.filter((event)=>{
                if(event.eventID === reqBody.eventID ){
                    return event;
                }
            })
            console.log("# GETBACKDATA:", JSON.stringify(reqBody.sessionCookie.getBackData));
            console.log("# reqBody.sessionCookie:", JSON.stringify(reqBody.sessionCookie));
            console.log("#########################################################################################################");
            return res.send(reqBody.sessionCookie);
        }

    } else {
        console.log("# RES SEND: ", JSON.stringify(reqBody.sessionCookie));
        console.log("# LOGIN ERROR                                                                                           #");
        console.log("#########################################################################################################");
        return res.send(reqBody.sessionCookie);
    }


})




// REGISTRO DE EVENTO - OK
app.post("/admin/register/event", (req, res) => {
    const reqBody = req.body;
    console.log("#########################################################################################################");
    console.log("# ROTA: '/admin/register/event' > METODO: 'POST'                                                             #");
    console.log("# BODY: " + JSON.stringify(reqBody));

    if (reqBody.sessionCookie.code === "20" && reqBody.level === 1) {
        event.push({
            eventID: (event[event.length - 1].eventID + 1),
            eventName: reqBody.eventName,
            eventDescription: reqBody.eventDescription,
            eventLocation: reqBody.eventLocation,
            eventHost: reqBody.eventHost,
            eventFinish: false,
            eventQtdPeople:
            {
                qtd: reqBody.eventQtdPeople,
                registred: [
                    {}
                ],
                cofirmed: [
                    {}
                ]
            },
            eventDate: "1640919600000",
            eventTime: reqBody.eventTime,
            eventImagem: reqBody.eventImagem
        })
        res.body = req.body.sessionCookie;
        res.body.getBackData = { code: "20", msg: "Evento cadastrado com sucesso." }
        return res.send(res.body);

    } else {
        res.clearCookie("SID");
        console.log("# RES SEND: ", JSON.stringify(reqBody));
        console.log("# LOGIN ERROR                                                                                           #");
        console.log("#########################################################################################################");
        return res.send(reqBody.sessionCookie);
    }
});
// REGISTRO DE USUÁRIOS - OK
app.post("/admin/register/user", (req, res) => {
    const reqBody = req.body;
    console.log("#########################################################################################################");
    console.log("# ROTA: '/admin/register/user' > METODO: 'POST'                                                             #");
    console.log("# BODY: " + JSON.stringify(reqBody));

    if (reqBody.sessionCookie.code === "20" && reqBody.level === 1) {
        (async () => {
            const salt = 10;
            let newUser = true;

            for (let p = 0; p < people.length; p++) {
                if (people[p].userName === req.body.userName) {
                    console.log(people[p])
                    res.body = req.body.sessionCookie;
                    res.body.getBackData = { code: "40", msg: "Usuário não cadastrado, nome do usuário não disponivel." }
                    newUser = false;
                }
            }

            if (newUser) {
                let passwordHash = await bcrypt.hash(reqBody.firstPass, salt).then(function (hash) {
                    console.log("hash:", hash)
                    return hash
                });
                people.push({
                    peopleID: (people[people.length - 1].peopleID + 1),
                    fullName: reqBody.fullName,
                    email: reqBody.email,
                    docCPF: reqBody.docCPF,
                    userPhoto: reqBody.userPhoto,
                    userName: reqBody.userName,
                    firstPass: passwordHash,
                })
                console.log(people)
                res.body = req.body.sessionCookie;
                res.body.getBackData = { code: "20", msg: "Usuário cadastrado com sucesso." }
            }
            return res.send(res.body);
        })();

    } else {
        res.clearCookie("SID");
        console.log("# RES SEND: ", JSON.stringify(reqBody));
        console.log("# LOGIN ERROR                                                                                           #");
        console.log("#########################################################################################################");
        return res.send(reqBody.sessionCookie);
    }
});
// OK
app.post("/", (req, res) => {
    const reqBody = req.body;
    console.log("#########################################################################################################");
    console.log("# ROTA: '/' > METODO: 'POST'                                                                            #");
    console.log("# REQ BODY: " + JSON.stringify(reqBody));
    if (reqBody.sessionCookie.code === "20") {
        reqBody.sessionCookie.level = reqBody.level;
        console.log("# RES SEND: ", JSON.stringify(reqBody.sessionCookie));
        console.log("# LOGIN SUCCESS                                                                                         #");
        console.log("#########################################################################################################");
        return res.send(reqBody.sessionCookie);
    } else {
        console.log("# RES SEND: ", JSON.stringify(reqBody.sessionCookie));
        console.log("# LOGIN ERROR                                                                                           #");
        console.log("#########################################################################################################");
        return res.send(reqBody.sessionCookie);
    }
});
// OK
app.get("/", (req, res) => {
    return res.send();
});
// OK
app.get("/home", (req, res) => {
    return res.send()
})
// OK
app.get("/admin/home", (req, res) => {
    return res.send()
})

app.listen(8000, (err) => {
    console.log("################################################################################");
    console.log("# SERVIDOR ON: 8000                                                            #");
    console.log("# Data: " + new Date().toISOString().slice(0, 10).split("-").reverse().join("/") + "                                                             #")
    console.log("################################################################################");
    console.log("# ");
});








// app.use(function(req, res, next) {  
//     res.header('Access-Control-Allow-Origin', req.headers.Origin);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });