const crypto = require('crypto');
const lzw = require("node-lzw");
const qrcode = require('qrcode');
ValidationException = require('./qrPagueExceptions');

async function createQRCode(qrPaguePayload) {

    return await qrcode.toDataURL(JSON.stringify(create(qrPaguePayload)));

}

function create(qrPaguePayload) {

    const signature = sign(generateHash(qrPaguePayload));

    return compress(`${qrPaguePayload};${signature}`)
}


function read(qrPague) {

    let uncompressed = uncompress(qrPague)

    if (!verify(uncompressed))
        throw new ValidationException("The Signature Dont Match", 500);

    return getPayload(uncompressed);
}


function sign(payload) {

    let signer = crypto.createSign('SHA256');
    signer.update(new Buffer(payload));
    signer.end();
    return signer.sign(global.privateKey, 'base64')
}

function verify(qrPague) {
    let verifier = crypto.createVerify('SHA256');
    verifier.update(new Buffer(getPayloadHash(qrPague)));
    return verifier.verify(global.publicKey, getSignature(qrPague), 'base64');
}

function compress(qrPaguePayload) {
    return lzw.encode(qrPaguePayload)
}

function uncompress(qrPaguePayload) {
    return lzw.decode(qrPaguePayload)
}

function getPayload(qrPague){
    var index = qrPague.lastIndexOf(";");
    return qrPague.substr(0, index);
} 

function getPayloadHash(qrPague){
    var index = qrPague.lastIndexOf(";");
    return generateHash(qrPague.substr(0, index));
} 
function getSignature(qrPague){
    var index = qrPague.lastIndexOf(";");
    return qrPague.substr(index + 1);
}

function generateHash(content){
    const hash = crypto.createHash('sha256');
    hash.update(content);
    return hash.digest('hex');
}
module.exports = {
    create,
    createQRCode,
    read
}