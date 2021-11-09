const fs = require('fs');
// let modoSync = 1; // 0 = syncrono / 1 = asyncrono.
// let dirInfo = "./database/"; // diretorio que deseja ser.
// let arqInfo = "arquivo.txt"; // arquivo que será lido.

function saveFile(_folder, _file, _modoSync, _data) {
    console.log("#| MIDDLE: ReadFile                                                                                    |#");
    console.log("#| PARAMS: folder:", _folder, " || file:", _file, " || mode:", _modoSync);
    if (_folder === undefined || _file === undefined || _modoSync === undefined) {
        console.log("#| ❌ ERROR: Falta de parametros.                                                                      |#");
        return { code: "40", msg: "❌ Erro ao interno do servidor." };
    }
    return new Promise(async (resolve, reject) => {
        if (_modoSync == 0) {
            resolve(fs.readFileSync(_folder + _file, "utf-8"));
        } else {
            await fs.writeFile(_folder + _file, _data, "utf-8", (err) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        }
    })
        .then((_data) => {
            console.log("#| STATUS: Arquivo lido com sucesso - FIM                                                              |#");
            console.log("#|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|#");
            console.log("SIM SAVE FILE", _data)
            return _data;
        })
        .catch((_err) => {
            console.log("#| STATUS: ❌ ERROR AO LER O ARQUIVO - FIM                                                             |#");
            console.log("#|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|#");
            return _err;
        })
}
module.exports = saveFile;