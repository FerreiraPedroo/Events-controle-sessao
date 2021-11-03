const crypto = require("crypto");

// Mudar o IV ou KEY para o SALT
//
//
//
//

const cryptoCipher = (_typeMethod, _encrypt, _pass) => {
    console.log("# cryptoCipher: Parametros recebidos: tipo:",_typeMethod," || data:", _encrypt," || password:", _pass)
    if (_typeMethod === 0 && _encrypt !== undefined) {
        console.log("# encrypt > DADOS PARA ENCRIPTOGRAFAR:", _encrypt, "|| tamanho:", _encrypt.length);
        
        const iv = crypto.createHash("sha256").update(_encrypt).digest("hex");
        console.log("# encrypt > HASH iv :", iv, "|| tamanho:", iv.length);

        const key = "12345678912345678912345678912340";
        console.log("# encrypt > KEY:", key, "|| tamanho:", key.length, "|| typeof:", typeof key.length);

        const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
        let encrypted = cipher.update(_encrypt, "utf8", "hex");
        console.log("# encrypt > ENCRYPTED:", encrypted, "|| tamanho:", encrypted.length);

        encrypted += cipher.final("hex");
        console.log("# encrypt > ENCRYPTED FINAL:", encrypted, "|| tamanho:", encrypted.length); console.log("# ");

        return encrypted;

    } else if(_typeMethod === 1 && (_encrypt !== undefined && _pass !== undefined)){
        console.log("# decrypt > DADOS PARA DESCRIPTOGRAFAR:", _encrypt, "|| tamanho:", _encrypt.length);

        const key = "12345678912345678912345678912340";
        const iv = crypto.createHash("sha256").update(_pass).digest("hex");

        const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
        const decrypted = decipher.update(_encrypt, "hex", "utf8");
        console.log("# decrypt > DESCRIPTOGRAFADO:", decrypted, "|| tamanho:", decrypted.length);

        return decrypted;

    }else {
        return {"ERRO":"Falta de parametros"}

    }
}

module.exports = cryptoCipher