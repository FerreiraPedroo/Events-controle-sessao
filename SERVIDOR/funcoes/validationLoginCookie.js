const caesarChiper = require('./caesarChiper - v0');
const users = [{ "user": "ph", "password": "123456" }, { "user": "master", "password": "123456" }, { "user": "ph2", "password": "123456" }, { "user": "ph3", "password": "123456" }];
const sessions = [];

const validationLoginCookie = (req, res, next) => {
    const dataLocal = new Date();
    const cookies = req.cookies;
    const body = req.body;
    let newCookie = "";
    // console.log(req)
    console.log("#");
    console.log("#########################################################################################################");
    console.log("#| MIDDLE: Validation                                                                                  |#");
    console.log("#| PATH:", req.path);
    console.log("#| BODY:", JSON.stringify(body), "(body)");
    console.log("#| COOKIES RECEIVED:", cookies);
    console.log("#| SESSIONS OPEN:", JSON.stringify(sessions));
    console.log("#|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|#");

    // OK 
    if (req.path !== "/" && (cookies.SID !== undefined && cookies.SID !== "")) {
        console.log("#| Validando a sessão: Verificar cookie para outras rotas                                              |#");
        for (let s = 0; s < sessions.length; s++) {
            if (sessions[s].SID === cookies.SID) {
                console.log("#| Usuário validado: [", JSON.stringify(sessions[s]), "]");
                req.body.sessionCookie = { "code": "20", "msg": "Usuário logado." };
                newCookie = "sessão validada";
                break
            }
        }
        if (newCookie === "") {
            console.log("#| Sessão do usuário não é valida: SESSION - ERROR");
            req.body.sessionCookie = { "code": "40", "msg": "Erro na sessão, não reconhecida." };
        }
        console.log("#########################################################################################################");
        return next();
    }
    // OK - Caso não encontre envia um code 40 - error
    // VERIFICA A EXISTENCIA DE COOKIE NA ROTA DO LOGIN '/', NÃO EXISTINDO COOKIE ELE EXIBE A PAGINA DE LOGIN.
    if (req.path !== "/" && (cookies.sessionCookie === undefined || cookies.sessionCookie === "")) {
        console.log("#| Cookie validation: PASS - não tem cookie                                                            |#");
        console.log("#########################################################################################################");
        res.clearCookie("SID");
        req.body.sessionCookie = { "code": "40", "msg": "Cookie não recebido." };
        return next();
    }

    // OK
    // PATH DE LOGIN
    if (req.path === "/" && req.method === "POST" && "user" in body && "password" in body) {
        console.log("#| Usuario para logar:", body);
        for (let u = 0; u < users.length; u++) {
            if (users[u].user === body.user && users[u].password === body.password) {
                console.log("#| Usuario verificado:", users[u]);
                for (let s = 0; s < sessions.length; s++) {
                    if (sessions[s].user === users[u].user) {
                        console.log("| Usuario com sessão anterior existente: [", JSON.stringify(sessions[s]), "]");
                        sessions[s].SID = caesarChiper(`[${users[u].user}, ${dataLocal.toISOString("pt-BR")}]`, 1);
                        newCookie = sessions[s].SID;
                        break;
                    }
                }
                if (newCookie === "") {
                    let cookie = caesarChiper(`[${users[u].user}, ${dataLocal.toISOString("pt-BR")}]`, 1);
                    console.log("#| Usuario com nova sessão: [", cookie, "]");
                    sessions.push({ "user": users[u].user, "SID": cookie, "maxAge": 60000 });
                    newCookie = cookie;
                }
                res.cookie("SID", newCookie);
                req.body.sessionCookie = { "code": "20", "msg": "Usuário logado com sucesso." };
                break;
            }
        }
        if (newCookie === "") {
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