const crypto = require('crypto')
const lzw = require("node-lzw");
const qrcode = require('qrcode');
ValidationException = require('./qrPagueExceptions');

async function createQRCode(qrPaguePayload) {

    return await qrcode.toDataURL(JSON.stringify(create(qrPaguePayload)));

}

function create(qrPaguePayload) {

    let qrPagueToken = {
        payload: compress(qrPaguePayload)
    };

    qrPagueToken.signature = sign(qrPagueToken)

    return qrPagueToken
}


function read(qrPague) {

    if (!verify(qrPague))
        throw new ValidationException("The Signature Dont Match", 500);

    return uncompress(qrPague.payload);
}


function sign(qrPague) {

    let signer = crypto.createSign('SHA256');
    signer.update(new Buffer(qrPague.payload));
    signer.end();
    return signer.sign(global.privateKey, 'base64')
}

function verify(qrPague) {

    var verifier = crypto.createVerify('SHA256');
    verifier.update(new Buffer(qrPague.payload));
    return verifier.verify(global.publicKey, qrPague.signature, 'base64');
}

function compress(qrPaguePayload) {
    return lzw.encode(qrPaguePayload)
}

function uncompress(qrPaguePayload) {
    return lzw.decode(qrPaguePayload)
}

module.exports = {
    create,
    createQRCode,
    read
}