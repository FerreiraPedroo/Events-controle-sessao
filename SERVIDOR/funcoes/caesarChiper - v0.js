// CIFRA DE CESAR
const caesarChiper = (_dataToChiper, _type)=> {

    let wordsCodeDecode = JSON.stringify(_dataToChiper);
    let type = _type;
    let alphabetUTF8 = ".!#$%& ()*+,-/0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ";
    // let alphabetUTF8 = ".!#$%& ()*+,-/\\0123456789:;\"<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ";
    let responseWords = "";
    if (wordsCodeDecode == undefined || _type == undefined) return ({ "ERRO": "ERRO INTERNO" });
    
    // CIFRA DE CESAR - CODIFICANDO
    const caesarChiperCode = (_letters) => {
        let codeLetters = _letters;
        let codedLetters = "";
        for (let u = 0; u < codeLetters.length; u++) {
            for (let i = 0; i < alphabetUTF8.length; i++) {
                if (codeLetters[u] == alphabetUTF8[i]) {
                    i + 3 >= 186 ? codedLetters += alphabetUTF8[(i + 3) - 186] : codedLetters += alphabetUTF8[i + 3];
                }
            }
        }
        return (codedLetters);
    }

    // CIFRA DE CESAR - DESIFRANDO
    const caesarChiperDecode = (_letters) => {
        let decodeLetters = _letters;
        let decodedLetters = "";
        for (u = 0; u < decodeLetters.length; u++) {
            for (i = 0; i < alphabetUTF8.length; i++) {
                if (decodeLetters[u] == alphabetUTF8[i]) {
                    i - 3 < 0 ? decodedLetters += alphabetUTF8[(i - 3) + 186] : decodedLetters += alphabetUTF8[i - 3];
                }
            }
        }
        return (decodedLetters);
    }

    if (type == 1) {
        responseWords = caesarChiperCode(wordsCodeDecode);
    } else if (type == 2) {
        responseWords = caesarChiperDecode(wordsCodeDecode);
    }
    return responseWords;

}

module.exports = caesarChiper;