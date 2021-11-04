console.log(""); console.log(""); console.log("");
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const validationLoginCookie = require("./funcoes/validationLoginCookie");
// const d = new Date(2021, (11)-1, 30).getTime()
const d = new Date().getTime()
console.log(d)
console.log(new Date(d))
const event =
    [
        {
            eventID: 1,
            eventName: "Apresentação",
            eventDescription: "Apresentaçao de controle de sessão",
            eventLocation: "São José dos Campos, São Paulo",
            eventHost: "Alpha EdTech",
            eventFinish: false,
            eventQtdPeople:
            {
                qtd: "20",
                registred: [
                    {}
                ],
                cofirmed: [
                    {}
                ]
            },
            eventDate: "1638241200000",
            eventTime: "14:00:00",
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
                cofirmed: [
                    {}
                ]
            },
            eventDate: "1640919600000",
            eventTime: "20:00:00",
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
                cofirmed: [
                    {}
                ]
            },
            eventDate: "1640919600000",
            eventTime: "20:00:00",
            eventImagem: "./event.png"
        },
        {
            eventID: 4,
            eventName: "Ano novo Paris",
            eventDescription: "Ano novo na Torre Eiffel em Paris",
            eventLocation: "França, Paris",
            eventHost: "EUA",
            eventFinish: false,
            eventQtdPeople:
            {
                qtd: "5000",
                registred: [
                    {}
                ],
                cofirmed: [
                    {}
                ]
            },
            eventDate: "1640919600000",
            eventTime: "20:00:00",
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


app.get("/", (req, res) => {
    return res.send();
});
app.post("/", (req, res) => {
    const reqBody = req.body;
    console.log("#########################################################################################################");
    console.log("# ROTA: '/' > METODO: 'POST'                                                                            #");
    console.log("# REQ BODY: " + JSON.stringify(reqBody));
    if (reqBody.sessionCookie.code === "20") {
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





// REGISTRO DE EVENTO - OK
app.post("/admin/register/event", (req, res) => {
    const reqBody = req.body;
    console.log("#########################################################################################################");
    console.log("# ROTA: '/admin/register/event' > METODO: 'POST'                                                             #");
    console.log("# BODY: " + JSON.stringify(reqBody));

    if (reqBody.sessionCookie.code === "20") {
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

    if (reqBody.sessionCookie.code === "20") {
        let newEvent = true;
        for (let p = 0; p < people.length; p++) {
            if (people[p].userName === req.body.userName) {
                console.log(people[p])
                res.body = req.body.sessionCookie;
                res.body.getBackData = { code: "40", msg: "Usuário não cadastrado, nome do usuário não disponivel." }
                newEvent = false;
            }
        }
        if (newEvent) {
            people.push({
                peopleID: (people[people.length - 1].peopleID + 1),
                fullName: reqBody.fullName,
                email: reqBody.email,
                docCPF: reqBody.docCPF,
                userPhoto: reqBody.userPhoto,
                userName: reqBody.userName,
                firstPass: reqBody.firstPass,
            })
            console.log(people)
            res.body = req.body.sessionCookie;
            res.body.getBackData = { code: "20", msg: "Usuário cadastrado com sucesso." }
        }
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>", res.body)
        return res.send(res.body);

    } else {
        res.clearCookie("SID");
        console.log("# RES SEND: ", JSON.stringify(reqBody));
        console.log("# LOGIN ERROR                                                                                           #");
        console.log("#########################################################################################################");
        return res.send(reqBody.sessionCookie);
    }
});

// ENVIDO DE DADOS DA HOME - OK
app.post("/admin/data", (req, res) => {
    const reqBody = req.body;
    const getBackData = {};
    console.log("#########################################################################################################");
    console.log("# ROTA: '/admin/data' > METODO: 'POST'                                                                        #");
    console.log("# REQ BODY: " + JSON.stringify(reqBody));

    if (reqBody.sessionCookie.code === "20") {
        console.log("# USER LOGED                                                                                            #");

        if (reqBody.retrieve === "home") {
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
            console.log("# GETBACKDATA:", getBackData);
            console.log("# reqBody.sessionCookie:", reqBody.sessionCookie);
            console.log("#########################################################################################################");
            return res.send(reqBody.sessionCookie);
        }

        if (reqBody.retrieve === "user") {

            reqBody.sessionCookie.getBackData = people.map((people) => {
                delete people.firstPass;
                return people;
            });

            console.log("# GETBACKDATA:", getBackData);
            console.log("# reqBody.sessionCookie:", JSON.stringify(reqBody.sessionCookie));
            console.log("#########################################################################################################");
            return res.send(reqBody.sessionCookie);

        }

        if (reqBody.retrieve === "event") {
            
            reqBody.sessionCookie.getBackData = event
            console.log("# GETBACKDATA:", getBackData);
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