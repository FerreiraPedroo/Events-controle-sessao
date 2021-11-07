const fs = require('fs');
let modoSync = 1; // 0 = syncrono / 1 = asyncrono.
let dirInfo = "./database/"; // diretorio que deseja ser.
let arqInfo = "arquivo.txt"; // arquivo que será lido.


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Função para ler o conteúdo do arquivo.
//  Retorna o conteudo em JSON.
//  PARAMETROS DA FUNÇÃO:
//  (_diretorio:(diretorio que onde está o arquivo), _file:(nome do arquivo), _modoSync:(0 = syncrono, 1 = asyncrono ))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function readFile(_folder, _file, _modoSync) {
    console.log("#| MIDDLE: ReadFile                                                                                    |#");
    console.log("#| PARAMS: folder:", _folder, " || file:", _file, " || mode:", _modoSync);

    if (_folder === undefined || _file === undefined || _modoSync === undefined) {
        console.log("#| ❌ ERROR: Falta de parametros.                                                                      |#");
        return { code: "40", msg: "❌ Erro ao interno do servidor." };
    }

    return new Promise(async (resolve, reject) => {
        if (_modoSync == 0) {
            return resolve(fs.readFileSync(_folder + _file, "utf-8"));
        } else {
            await fs.readFile(_folder + _file, "utf-8", async (err, data) => {
                if (err) {
                    console.log("#| ❌ ERROR: Não foi possivel ler o arquivo.                                                           |#");
                    return reject({ code: "40", msg: " ❌ Erro ao interno do servidor." });
                }
                return resolve(data);
            })
        }
    })
        .then((_data) => {
            console.log("#| STATUS: Arquivo lido com sucesso - FIM                                                              |#");
            console.log("#|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|#");
            return JSON.parse(_data);
        })
        .catch((_err) => {
            console.log("#| STATUS: ❌ ERROR AO LER O ARQUIVO - FIM                                                             |#");
            console.log("#|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|#");
            return _err;
        })
}

module.exports = readFile;







// await fs.writeFile(_folder + _file, JSON.stringify(usersData), (err) => {
//     if (err) {
//         console.log("  | ❌ ERRO interno, não foi possivel gravar o arquivo", err);
//         return reject({ status: "ERROR", code: "40", msg: "# Não foi possivel gravar o arquivo." });
//     };
//     console.log("  | ✅ Usuário registrado com sucesso.                       |");
// })