const fs = require('fs');
let modoSync = 1; // 0 = syncrono / 1 = asyncrono
let dirInfo = "./database"; // diretorio que o conteudo será exibir.


////////////////////////////////////////////////////////////////////////////////////////////////
//  Função para ler o conteúdo de diretório.
//  retorna um Array com os arquivos e pastas existentes no diretório passado no paramentro.
//  PARAMETROS DA FUNÇÃO:
//  (_folder:(diretorio que deseja pesquisar), _modoSync:(0 = syncrono, 1 = asyncrono ))
////////////////////////////////////////////////////////////////////////////////////////////////
function lerDiretorio(_folder, _modoSync) {
    if(_folder === undefined || _modoSync === undefined) return ({ status: "ERRO", code: "400", errorcode:"-", msg: "| ERRO NA CHAMADA DA FUNÇÃO"})

    return new Promise((resolve, reject) => {
        if (_modoSync == 0) {
            console.log("MODO: SYNC");
            resolve(fs.readdirSync(_folder,'utf-8'));
        } else {
            console.log("MODO: ASYNC");
            fs.readdir(_folder, 'utf-8', (err, fs) => {
                if (err) reject(": "+err.message);
                resolve(fs);
            })
        }
    })
}

lerDiretorio(dirInfo, modoSync)
    .then((_fs) => {
        console.log("LISTA DO DIRETORIO:");
        console.log(_fs);
    })
    .catch((_err) => {
        console.log("DIRETORIO NÃO ENCONTRADO "+ _err);
    })