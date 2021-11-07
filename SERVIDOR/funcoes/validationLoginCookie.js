const caesarChiper = require('./caesarChiper - v0');
const bcrypt = require("bcrypt");
const readFile = require('./readFile-v0');
// const salt = 10;
// const PlaintextPassword = "123456"//body.password;
// const hash = bcrypt.hash(PlaintextPassword, salt, function(err, hash) {
//     console.log("hash:",hash)
//     console.log(err)
//     return hash
// });

// const users = [{ "user": "ph", "password": "$2b$10$Go1bJHy/4Ga9NtLgwG7UiuSI8F6ldOeS9ZvFAPCmb.FltYC59l/Wa" }, { "user": "master", "password": "123456" }, { "user": "ph2", "password": "123456" }, { "user": "ph3", "password": "123456" }];


const sessions = [];



const validationLoginCookie = async (req, res, next) => {
    const dataLocal = new Date();
    const cookies = req.cookies;
    const body = req.body;
    let newCookie = null;
    let level = 0; // 1 - admin / 0 - user //
    // o level só está sendo enviado na hora do login, nas outras solicitações não está sendo verificado se ele
    // é administrador ou usuario - caso ele digite a URL pode acessar as outras páginas e possivelmente alterar.
    // COLOCAR O LEVEL TAMBÉM NA VALIDAÇÃO DA SESSÃO
    console.log("#");
    console.log("#########################################################################################################");
    console.log("#| MIDDLE: Validation                                                                                  |#");
    console.log("#| PATH:", req.path);
    console.log("#| BODY:", JSON.stringify(body), "(body)");
    console.log("#| COOKIES RECEIVED:", cookies);
    console.log("#| SESSIONS OPEN:", JSON.stringify(sessions));
    console.log("#|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|#");
    const users = await readFile("./database/", "users.json", 1);
    // VALIDAÇÃO EM OUTRAS ROTAS - COM COOKIE - OK 
    if (req.path !== "/" && (cookies.SID !== undefined && cookies.SID !== "")) {
        console.log("#| Validando a sessão: Verificar cookie para outras rotas                                              |#");
        for (let s = 0; s < sessions.length; s++) {
            if (sessions[s].SID === cookies.SID) {
                console.log("#| Usuário validado: [", JSON.stringify(sessions[s]), "]");
                req.body.sessionCookie = { "code": "20", "msg": "Usuário logado." };
                req.body.level = sessions[s].level;
                req.body.user = sessions[s].userName;
                newCookie = "sessão validada";
                break
            }
        }
        if (newCookie === null) {
            res.clearCookie("SID");
            console.log("#| Sessão do usuário não é valida: SESSION - ERROR");
            req.body.sessionCookie = { "code": "40", "msg": "Erro na sessão, não reconhecida." };
        }
        console.log("#########################################################################################################");
        return next();
    }

    // VALIDAÇÃO EM OUTRAS ROTAS - SEM COOKIE - LIMPA O COOKIE E REDIRECIONA PARA 'LOGIN' - OK
    if (req.path !== "/" && (cookies.sessionCookie === undefined || cookies.sessionCookie === "")) {
        console.log("#| Cookie validation: PASS - não tem cookie                                                            |#");
        console.log("#########################################################################################################");
        res.clearCookie("SID");
        req.body.sessionCookie = { "code": "40", "msg": "Cookie não recebido." };
        return next();
    }

    // ROTA DE LOGIN - OK
    if (req.path === "/" && req.method === "POST" && "user" in body && "password" in body) {

        console.log("#| Usuario para logar:", body);
        // PROCURA O NOME DO USUÁRIO NA LISTAGEM
        for (let u = 0; u < users.length; u++) {

            // VERIFICA SE O USUÁRIO É IGUAL
            if (users[u].userName === body.user) {
                console.log("#| Usuario verificado:", users[u]);

                // VERIFICA O HASH DO PASSWORD DO USUÁRIO
                const passwordHashVerify = await bcrypt.compare(body.password, users[u].password).then((result) => {
                    return result;
                });

                if (passwordHashVerify) {
                    level = users[u].level === "admin" ? 1 : 0

                    for (let s = 0; s < sessions.length; s++) {
                        if (sessions[s].userName === users[u].userName) {
                            console.log("| Usuario com sessão anterior existente: [", JSON.stringify(sessions[s]), "]");
                            sessions[s].SID = caesarChiper(`[${users[u].user}, ${dataLocal.toISOString("pt-BR")}]`, 1);
                            newCookie = sessions[s].SID;
                            break;
                        }
                    }

                    if (newCookie === null) {
                        let cookie = caesarChiper(`[${users[u].userName}, ${dataLocal.toISOString("pt-BR")}]`, 1);
                        console.log("#| Usuario com nova sessão: [", cookie, "]");
                        sessions.push({ "userName": users[u].userName, "SID": cookie, "maxAge": 60000, "level": level });
                        newCookie = cookie;
                    }
                    res.cookie("SID", newCookie);                    
                    req.body.sessionCookie = { "code": "20", "msg": "Usuário logado com sucesso."};
                    req.body.level = level;
                    console.log(req.body)
                    break;                    
                }
            }
        }
        if (newCookie === null) {
            res.clearCookie("SID");
            console.log("#| Usuario para logar: SENHA E LOGIN - ERROR                                                           |#");
            req.body.sessionCookie = { "code": "40", "msg": "Erro ao tentar logar, usuário ou senha incorreto." };
        }
        console.log("#########################################################################################################");
        return next()
    }

    console.log("==============================  VERIFICAR - VALIDAÇÃO ERRADA =====================================")
}

module.exports = validationLoginCookie;