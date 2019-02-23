const assert = require('chai').assert;
const fs = require('fs')
const qrPague = require('./qrPague');


beforeAll(() => {
    global.publicKey = fs.readFileSync('./assets/certificates/rsa.pkcs8', {
        encoding: 'utf8'
    });
    global.privateKey = fs.readFileSync('./assets/certificates/mykey.pem', {
        encoding: 'utf8'
    });
});

describe('qrpague', () => {
    describe('create', () => {
        it('Generate a QRCode', async () => {
            let qr = await qrPague.createQRCode("0.1.0;5afad42239ee9f000fe92189;;10;BRL;99999999999;756;Fulano de Tal;0001;700000001;;;1526387746083");
            assert.match(qr, /^data:image*/);
        });
    });
    describe('createContent', () => {
        it('Generate Content with signature', async () => {
            let qr = qrPague.create("0.1.0;5afad42239ee9f000fe92189;;10;BRL;99999999999;756;Fulano de Tal;0001;700000001;;;1526387746083");
            assert.isNotNull(qr.signature);
        });
    });
    describe('read', () => {
        it('Should return read the same object', async () => {
            let payload = "0.1.0;5afad42239ee9f000fe92189;;10;BRL;99999999999;756;Fulano de Tal;0001;700000001;;;1526387746083"
            let qr = qrPague.create(payload);
            let result = qrPague.read(qr);
            assert.equal(payload, result);
        });
        it('Should fail if change the payload', async () => {
            try {
                qrPague.create("0.1.0;5afad42239ee9f000fe92189;;10;BRL;99999999999;756;Fulano de Tal;0001;700000001;;;1526387746083");
                payload = "changed payload;kUyjBaklZGecr3D0dGX40VHEXhIB0XVWkJRTŒCkZgJ0NCokBfĴ8B/XxlxTZcpJBIv/wnR1ARDvbU9IhKnbfcALNW3OcBS8Vq8EgBy36lKeyV88pMWČq4g7t17/j2GIWscJHacqE7yuywGoFN3I1QvƔ/3h4E5YiUOUSQBX/I=";
                qrPague.read(payload);
                assert.fail()
            } catch (e) {
                assert.equal(e.name, "ValidationException");
            }
        });
    });
});