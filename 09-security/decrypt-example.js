var crypto = require('crypto');
var fs = require('fs');

var input = fs.createReadStream('cipher.txt', 'utf8');
var cipher = crypto.createDecipher('aes-256-ctr', 'secret');
var output = fs.createWriteStream('decrypted.txt', 'utf8');

input.pipe(cipher).pipe(output);
