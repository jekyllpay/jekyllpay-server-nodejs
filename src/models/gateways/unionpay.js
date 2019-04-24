const fs = require('fs');
const axios = require('axios');
const up_gateway_apis = require('./unionpay-api');

class UnionPay {

    getpublicByKeypair() { }
    decryptBypublic() { }
    getPrivateKey(keyPath, password) {
        let keyStream = fs.createReadStream(keyPath);
    }
}

