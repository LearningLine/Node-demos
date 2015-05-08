var crypto = require('crypto');
var fs = require('fs');

var input = fs.createReadStream('plain.txt', 'utf8');
var cipher = crypto.createCipher('aes-256-ctr', 'secret');
var output = fs.createWriteStream('cipher.txt', 'utf8');

input.pipe(cipher).pipe(output);
