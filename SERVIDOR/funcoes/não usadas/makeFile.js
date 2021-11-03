const fs = require('fs');
let modoSync = 1; // 0 = syncrono / 1 = asyncrono
let dirInfo = "./database"; // diretorio onde o arquivo será criado.
let arqInfo = "arquivo.txt" // arquivo que deseja criar.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  VERSÃO 2.0 - 16/10-2021
//  Função para criar arquivo.
//  PARAMETROS DA FUNÇÃO:
//  (_folder:(diretorio que será criado o arquivo), _file:(nome do arquivo), _modoSync:(0 = syncrono, 1 = asyncrono ))
//
//  CODIGOS DE RESPOSTA: 100 - CRIADO | 200 - EXISTENTE | 300 - NÃO CRIADO | 400 - erro na chamada da função
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function makeFile(_folder, _file, _modoSync) {
    if(_folder === undefined || _file === undefined || _modoSync === undefined) return ({ status: "ERRO", code: "400", errorcode:"-", msg: "| ERRO NA CHAMADA DA FUNÇÃO"})
    return new Promise((resolve, reject) => {
        if (_modoSync == 0) {
            console.log("| MODO: SYNC");
            if (!fs.statSync(_folder + _file, { throwIfNoEntry: false })) {
                fs.openSync(_folder + _file, 'w');
                resolve({ status: "OK", code: "100", file: _file, msg: "| O arquivo : " + _folder + _file + " - foi criado." });
            }
            resolve({ status: "OK", code: "200", file: _file, msg: "| O arquivo : " + _folder + _file + " - ja existe." });
        } else {
            console.log("| MODO: ASYNC");
            fs.stat(_folder + _file, (err, stat) => {
                if (err) {
                    fs.open(_folder + _file, 'w', (err, fd) => {
                        if (err) {
                            reject({ status: "ERROR", code: "300", file: _file, errorcode: err, msg: "| O arquivo : " + _folder + _file + " - não foi possivel criar." });
                        } else {
                            fs.close(fd);
                            resolve({ status: "OK", code: "100", file: _file, msg: "| O arquivo : " + _folder + _file + " - foi criado." });
                        }
                    })
                } else {
                    stat.isFile() ? resolve({ status: "OK", code: "200", file: _file, msg: "| O arquivo : " + _folder + _file + " - ja existe." }) : "";
                    reject({ status: "ERROR", code: "300", file: _file, msg: "_file + | não foi possivel criar no diretorio | _folder | - " + err })
                }
            });
        }
    })
}
/*
makeFile(dirInfo, arqInfo, modoSync)
    .then((_file) => {
        console.table(_file);
    })
    .catch((_file) => {
        console.table(_file)
    })
*/

module.exports = makeFile;