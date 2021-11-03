const fs = require('fs');
let modoSync = 1; // 0 = syncrono / 1 = asyncrono
let dirInfo = "./database/"; // diretorio que deseja ser criado

//////////////////////////////////////////////////////////////////////////////////////////////////
//  VERSÃO 2.0 - 16/10-2021
//  Função para criar diretório.
//  retorna uma Promise com status.
//  PARAMETROS DA FUNÇÃO:
//  (_folder:(diretorio que deseja pesquisar), _modoSync:(0 = syncrono, 1 = asyncrono ))
//
//  CODIGOS DE RESPOSTA: 100 - CRIADO | 200 - EXISTENTE | 300 - NÃO CRIADO
/////////////////////////////////////////////////////////////////////////////////////////////////
function createFolder(_folder, _modoSync) { 
    if(_folder === undefined || _modoSync === undefined) return ({ status: "ERRO", code: "400", errorcode:"-", msg: "| ERRO NA CHAMADA DA FUNÇÃO"})
    return new Promise((resolve, reject) => {
        if (_modoSync == 0) {
            console.log("| MODO: SYNC");
            if (!fs.statSync(_folder, { throwIfNoEntry: false })) {
                if (fs.mkdirSync(_folder, { recursive: true })) {
                    resolve({ status: "OK", code: "100", folder: _folder, msg: "| A pasta foi criada." });
                }
            };
            resolve({ status: "OK", code: "200", folder: _folder, msg: "| A pasta ja existe." });
        } else {
            console.log("| MODO: ASYNC");
            fs.stat(_folder, (err, stat) => {
                if (err) {
                    fs.mkdir(_folder, { recursive: true }, (err) => {
                        if (err) {
                            reject({ status: "ERROR", code: "300", folder: _folder, errorcode: err, msg: "| A pasta não foi possivel criar." });
                        } else {
                            resolve({ status: "OK", code: "100", folder: _folder, msg: "| A pasta foi criada." });
                        }
                    })
                } else {
                    resolve({ status: "OK", code: "200", folder: _folder, msg: "| A pasta ja existe." })
                }
            })
        }
    })
}

createFolder(dirInfo, 
    )
    .then((_status) => {
        console.table(_status);
    })
    .catch((_err) => {
        console.table(_err);
    })