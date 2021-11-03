const fs = require("fs");
const caesarChiper = require('./caesarChiper');
const path = require('path');
const databaseFilePath = path.join(__dirname, '/../database/');

const loginValidation = (req, res, next) => {
    const dateLocal = new Date();

    if (req.body !== undefined) {
        let loginAutentication = req.body;
        console.log("#'''''''''''''''''''''''''''''''''''''''''''''''''''''''")
        console.log("# Login autentication");
        console.log("# body: ", req.body)
        console.log(databaseFilePath)


        if (loginAutentication.user === undefined && loginAutentication.token !== undefined) {
            console.log("||=======================================================1")
            console.log("| USUARIO JA LOGADO RECEBENDO TOKEN")
            fs.readFile("loged.txt", "utf-8", (err, data) => {
                if (err) {
                    req.body.statusLogin = { "CODE": 50, "LOGIN": "ERRO AO EFETUAR O LOGIN" };
                    next()
                }
                let userListJSONPosition = 0;
                let userListJSON = JSON.parse(data);
                for (u of userListJSON) {
                    if (u.token === loginAutentication.token) {
                        console.log("| USUARIO JA LOGADO ENCONTRADO...")
                        req.body.statusLogin = { "CODE": 20, "LOGIN": "USUÁRIO LOGADO" };
                        next()
                        break;
                    }
                    userListJSONPosition++;
                }
                if (userListJSONPosition == userListJSON.length) {
                    console.log("| USUARIO NÃO LOGADO REJEITANDO")
                    req.body.statusLogin = { "CODE": 50, "LOGIN": "ERRO AO EFETUAR O LOGIN" };
                    next()
                }
            })

        }

        if (loginAutentication.user !== undefined && loginAutentication.password !== undefined) {
            const loginFindUser = new Promise((resolve, reject) => {
                console.log("# Login autentication > Usuario solicitando login :", JSON.stringify(loginAutentication))
                fs.readFile(databaseFilePath + "users.txt", "utf-8", (err, data) => {
                    if (err) {
                        console.log("# Login autentication > Não foi possivel autenticar: ERROR - não foi possiver ler o arquivo users.txt");
                        return reject()
                    }
                    let userListJSONPosition = 0;
                    let userListJSON = JSON.parse(data);

                    for (u of userListJSON) {
                        if (u.user === loginAutentication.user && u.password === loginAutentication.password) {
                            console.log("# Login autentication > Usuário encontrato")
                            fs.readFile(databaseFilePath + "loged.txt", "utf-8", async (err, data) => {
                                if (err) {
                                    console.log("# Login autentication > Não foi possivel autenticar: ERROR - não foi possiver ler o arquivo loged.txt");
                                    return reject()
                                }
                                let usersLoged = JSON.parse(data);
                                let dataToToken = `{user: ${u.user}, data:${dateLocal.toISOString("pt-BR")}}`;
                                let dataToked = caesarChiper(dataToToken, 1)
                                usersLoged.push({ "token": dataToked, "data": dateLocal.toISOString("pt-BR") })
                                console.log(usersLoged)
                                await fs.writeFile(databaseFilePath + "loged.txt", JSON.stringify(usersLoged), (err) => {
                                    if (err) {
                                        console.log("# Login autentication > Não foi possivel autenticar: ERROR - não foi possiver gravar no arquivo loged.txt");
                                        return reject();
                                    }
                                    console.log("# Login autentication > Usuário autenticado: OK");
                                    return resolve();
                                })
                            })
                        }
                        userListJSONPosition++;
                   }

                    if (userListJSONPosition == userListJSON.length) {
                        console.log("# Login autentication > Usuario não encontrado")
                        return reject()
                    }
                })
            })
            
            loginFindUser
                .then((_data) => {
                    console.log("# Login autentication > Usuario autenticado com sucesso")
                    let userAutentication = _data;
                    return next()

                })
                .catch(() => {
                    console.log("||=======================================================2.1")
                    req.body.statusLogin = { "CODE": 50, "LOGIN": "ERRO AO EFETUAR O LOGIN" };
                    return next()
                })
        }

        if (loginAutentication.user === undefined && loginAutentication.password === undefined && loginAutentication.token === undefined) {
            console.log("||=======================================================3")
            req.body.statusLogin = { "CODE": 50, "LOGIN": "ERRO AO EFETUAR O LOGIN" };

        }
    }
    next()
}


module.exports = loginValidation;