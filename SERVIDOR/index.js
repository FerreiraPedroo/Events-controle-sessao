console.log(""); console.log(""); console.log("");
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const bcrypt = require("bcrypt");
const qrcode = require("qrcode-generator")
const readFile = require('./funcoes/readFile-v0');
const saveFile = require('./funcoes/saveFile');
const validationLoginCookie = require("./funcoes/validationLoginCookie");
// const d = new Date(2021, (11)-1, 30).getTime()
// const d = new Date().getTime()
// console.log(d)
// console.log(new Date(d))
let event = ""
let people = "";
(async () => {
    people = await readFile("./database/", "users.json", 1);
    event = await readFile("./database/", "event.json", 1);
})()


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
            const lastEventAddQtd = 1;
            if (event.length <= lastEventAddQtd) {
                for (let e = 0; e < event.length; e++) {
                    lastEventAdd[e] = event[(event.length - (e + 1))]
                }
            } else {
                for (let e = 0; e < lastEventAddQtd; e++) {
                    lastEventAdd[e] = event[(event.length - (e + 1))]
                    // lastEventAdd[e] = {
                    //     eventID: event.slice((event.length - lastEventAddQtd) + e, (event.length - lastEventAddQtd) + e + 1)[0].eventID,
                    //     eventName: event.slice((event.length - lastEventAddQtd) + e, (event.length - lastEventAddQtd) + e + 1)[0].eventName,
                    //     eventLocation: event.slice((event.length - lastEventAddQtd) + e, (event.length - lastEventAddQtd) + e + 1)[0].eventLocation,
                    //     eventDate: event.slice((event.length - lastEventAddQtd) + e, (event.length - lastEventAddQtd) + e + 1)[0].eventDate,
                    //     eventTime: event.slice((event.length - lastEventAddQtd) + e, (event.length - lastEventAddQtd) + e + 1)[0].eventTime,
                    //     eventImagem: event.slice((event.length - lastEventAddQtd) + e, (event.length - lastEventAddQtd) + e + 1)[0].eventImagem
                    // }
                }
            }
            getBackData.lastEventAdd = lastEventAdd;

            ////////////////////////////////////////////////////////////
            // PEGA OS ULTIMO "n" USUARIOS CADASTRADOS.
            const lastUserAdd = [];
            const lastUserAddQtd = 1;

            if (people.length <= lastUserAddQtd) {
                for (let u = 0; u < people.length; u++) {
                    lastUserAdd[u] = people[(people.length - (u + 1))];
                }
            } else {
                for (let u = 0; u < lastUserAddQtd; u++) {
                    lastUserAdd[u] = people[(people.length - (u + 1))];
                }
            }
            getBackData.lastUserAdd = lastUserAdd;

            reqBody.sessionCookie.getBackData = getBackData;
            ////////////////////////////////////////////////////////////
            console.log("# GETBACKDATA:", JSON.stringify(getBackData));
            console.log("# reqBody.sessionCookie:", JSON.stringify(reqBody.sessionCookie));
            console.log("#########################################################################################################");
            return res.send(reqBody.sessionCookie);
        }

        if (reqBody.retrieve === "adminuser") {
            reqBody.sessionCookie.getBackData = people.map((people) => {
                return people;
            });
            console.log("# GETBACKDATA:", JSON.stringify(getBackData));
            console.log("# reqBody.sessionCookie:", JSON.stringify(reqBody.sessionCookie));
            console.log("#########################################################################################################");
            return res.send(reqBody.sessionCookie);
        }

        if (reqBody.retrieve === "adminevent") {
            reqBody.sessionCookie.eventQtdTotal = event.length
            reqBody.sessionCookie.getBackData = event
            console.log("# GETBACKDATA:", JSON.stringify(getBackData));
            console.log("# reqBody.sessionCookie:", JSON.stringify(reqBody.sessionCookie));
            console.log("#########################################################################################################");
            return res.send(reqBody.sessionCookie);
        }














    } else {
        console.log("# RES SEND: ", JSON.stringify(reqBody.sessionCookie).slice(0, 160) + "...");
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
                for (let e = 0; e < event.eventQtdPeople.registred.length; e++) {
                    if (event.eventQtdPeople.registred[e].hasOwnProperty("userName")) {
                        event.eventQtdPeople.registeredTrue = event.eventQtdPeople.registred[e].userName === reqBody.user ? true : false
                    }
                }
                return event;
            })
            console.log("# GETBACKDATA:", JSON.stringify(getBackData));
            console.log("#########################################################################################################");
            return res.send(reqBody.sessionCookie);
        }

        if (reqBody.retrieve === "userevent") {
            reqBody.sessionCookie.getBackData = event.filter((event) => {
                if (event.eventID === reqBody.eventID) {
                    return event;
                }
            })
            reqBody.sessionCookie.registred = reqBody.sessionCookie.getBackData[0].eventQtdPeople.registred.find((user) => {
                return user.userID === reqBody.userID;
            })
            if (reqBody.sessionCookie.registred === undefined) {
                reqBody.sessionCookie.registred = false
            } else {
                const qr = qrcode(6, "L");
                qr.addData("http://127.0.0.1:8000/confirm/qrcode?e=" + reqBody.eventID + "&q=" + reqBody.sessionCookie.registred.qrcode);
                qr.make();
                reqBody.sessionCookie.registred.qrcodeImg = qr.createImgTag(3, 4);
                reqBody.sessionCookie.registred.qrcodeImg = reqBody.sessionCookie.registred.qrcodeImg.split(" ")[1].slice(5).slice(0, -1)
                // console.log(reqBody.sessionCookie.registred.qrcodeImg)
                // console.log(qr.createImgTag(3, 4, "Imagem QRCODE"))
            }

            console.log("# GETBACKDATA:", JSON.stringify(reqBody.sessionCookie.getBackData));
            console.log("#########################################################################################################");
            return res.send(reqBody.sessionCookie);
        }

        if (reqBody.retrieve === "usereventregister") {
            (async () => {
                const salt = 10;
                const password = "/" + reqBody.user + "/" + reqBody.eventID
                let passwordHash = await bcrypt.hash(password, salt).then(function (hash) {
                    console.log("PASS       /" + reqBody.user + "/" + reqBody.eventID + " - hash:", hash)
                    return hash
                });

                event.map((event) => {
                    if (event.eventID === reqBody.eventID) {
                        event.eventQtdPeople.registred.push({ "userID": reqBody.userID, "qrcode": passwordHash })
                    }
                    return event
                })
                let result = await saveFile("./database/", "event.json", 1, JSON.stringify(event))

                console.log("# GETBACKDATA:", JSON.stringify(reqBody.sessionCookie.getBackData));
                console.log("# reqBody.sessionCookie:", JSON.stringify(reqBody.sessionCookie));
                console.log("#########################################################################################################");
                return res.send(reqBody.sessionCookie);
            })();
        }


    } else {
        console.log("# RES SEND: ", JSON.stringify(reqBody.sessionCookie));
        console.log("# LOGIN ERROR                                                                                           #");
        console.log("#########################################################################################################");
        return res.send(reqBody.sessionCookie);
    }


})




app.get("/confirm/:qr", (req, res) => {

    const qrcode = req.query;
    let confirmationResponse = "";
    if (qrcode.hasOwnProperty("e") && qrcode.hasOwnProperty("q")) {
        let confirmedQrcode = false;
        let registredQrcode = false;
        let userConfirmed = "";
        let moveRegistredToConfirm = undefined;
        event.find((eve) => {
            if (eve.eventID === qrcode.e) {
                eve.eventQtdPeople.confirmed.find((confirmed) => {
                    if (confirmed.qrcode === qrcode.q) {
                        confirmedQrcode = true;
                        confirmationResponse = "<div>VOCÊ JÀ CONFIRMOU SUA PRESENÇA</div>";
                    }
                })
            }
        })

        if (!confirmedQrcode) {
            event.map((eve) => {
                if (eve.eventID === qrcode.e) {
                    eve.eventQtdPeople.registred.map((registred) => {
                        if (registred.qrcode === qrcode.q) {
                            moveRegistredToConfirm = registred;
                        } else {
                            return registred
                        }
                    })
                    if (moveRegistredToConfirm !== undefined) {
                        eve.eventQtdPeople.confirmed.push(moveRegistredToConfirm);
                        let result = saveFile("./database/", "event.json", 1, JSON.stringify(event))
                        registredQrcode = true;
                        userConfirmed = moveRegistredToConfirm;
                        confirmationResponse = "<div>VOCE ACABOU DE CONFIRMAR SUA PRESENÇA</div>"
                    } else {
                        confirmationResponse = "<div>Erro não foi possivel confirmar seu QR-CODE</div>"
                    }
                    moveRegistredToConfirm = undefined;

                } else {
                    return event;
                }
            })

        }
        if (!confirmedQrcode === !registredQrcode) {
            confirmationResponse = "<div>Não foi possivel confirmar o seu QR-CODE</div>"
        }
console.log(userConfirmed)
    } else {
        confirmationResponse = "<div>Houve um erro, não foi possivel confirmar o QR-CODE</div>"
    }
    
    return res.send(confirmationResponse)

})

// REGISTRO DE EVENTO - OK
app.post("/admin/register/event", (req, res) => {
    const reqBody = req.body;
    console.log("#########################################################################################################");
    console.log("# ROTA: '/admin/register/event' > METODO: 'POST'                                                             #");
    console.log("# BODY: " + JSON.stringify(reqBody));

    if (reqBody.sessionCookie.code === "20" && reqBody.level === 1) {
        (async () => {
            const eventDateConvert = new Date(reqBody.eventDate).getTime()
            event.push({
                eventID: "EVENT-" + (Number(event[event.length - 1].eventID.split("-")[1]) + 1),
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
                eventDate: eventDateConvert,
                eventTime: reqBody.eventTime,
                eventImagem: reqBody.eventImagem
            })
            let result = await saveFile("./database/", "event.json", 1, JSON.stringify(event))

            res.body = req.body.sessionCookie;
            res.body.getBackData = { code: "20", msg: "Evento cadastrado com sucesso." }
            return res.send(res.body);
        })()
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
                    ID: "USER-" + (Number(people[people.length - 1].ID.split("-")[1]) + 1),
                    fullName: reqBody.fullName,
                    email: reqBody.email,
                    docCPF: reqBody.docCPF,
                    userPhoto: reqBody.userPhoto,
                    userName: reqBody.userName,
                    password: passwordHash,
                    level: "user"
                })
                let result = await saveFile("./database/", "users.json", 1, JSON.stringify(people))
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