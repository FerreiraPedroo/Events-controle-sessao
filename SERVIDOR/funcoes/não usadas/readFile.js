const fs = require('fs');
let modoSync = 1; // 0 = syncrono / 1 = asyncrono.
let dirInfo = "./database/"; // diretorio que deseja ser.
let arqInfo = "arquivo.txt"; // arquivo que será lido.


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Função para ler o conteúdo do arquivo.
//  exibe o conteudo do arquivo.
//  PARAMETROS DA FUNÇÃO:
//  (_diretorio:(diretorio que onde está o arquivo), _file:(nome do arquivo), _modoSync:(0 = syncrono, 1 = asyncrono ))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function readFile(_dataUserToRegister, _folder, _file, _modoSync) {
    console.log("# [POST] register > readFile > folder:", _folder, " || file:", _file, " || mode:", _modoSync);
    if (_folder === undefined || _file === undefined || _modoSync === undefined) return ({ status: "ERRO", code: "400", errorcode: "-", msg: "| ERRO NA CHAMADA DA FUNÇÃO" })
    return new Promise(async (resolve, reject) => {
        if (_modoSync == 0) {
            return resolve(fs.readFileSync(_folder + _file, 'utf-8'));
        } else {
            await fs.readFile(_folder + _file, 'utf-8', async (err, data) => {
                if (err) return reject({ status: "ERROR", code: "40", msg: "# Não foi possivel ler o arquivo." });
                console.log("  |'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''|");
                console.log("  | Arquivo de usuários carregado                             |");
                const usersData = JSON.parse(data);
                console.log("  | Arquivo convertido em JSON                                |");
                console.log("  | 🔎📑 Verificando se existe um usuário com o nome: ", _dataUserToRegister.user);
                
                for (let u = 0; u < usersData.length; u++) {
                    if (usersData[u].user === _dataUserToRegister.user) {
                        console.log("  | ❌ Existe um usuário com o nome: ", _dataUserToRegister.user);
                        return reject({ status: "ERROR", code: "10", msg: "# Usuário já registrado." })
                    }
                }
                console.log("  | Não existe um usuário com o nome: ", _dataUserToRegister.user);
                usersData.push(_dataUserToRegister);

                await fs.writeFile(_folder + _file, JSON.stringify(usersData), (err) => {
                    if (err) {
                        console.log("  | ❌ ERRO interno, não foi possivel gravar o arquivo", err);
                        return reject({ status: "ERROR", code: "40", msg: "# Não foi possivel gravar o arquivo." });
                    };
                    console.log("  | ✅ Usuário registrado com sucesso.                       |");
                })
                return resolve(data);
            })
        }
    })
        .then((_data) => {
            console.log("  | Usuário gravado com sucesso.                              |");
            console.log("  |_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _|");
            return _data;
        })
        .catch((_err) => {
            console.log("  | ❌ Usuário não foi gravado erro:", _err.code);
            console.log("  |_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _|");
            return { "status": "ERROR" };
        })
}

module.exports = readFile;