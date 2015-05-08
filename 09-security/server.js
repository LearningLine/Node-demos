var fs = require('fs');
var https = require('https');

https.createServer({
  key: fs.readFileSync('my.key', 'utf8'),
  cert: fs.readFileSync('my.crt', 'utf8'),
  requestCert: true,
  rejectUnauthorized: true,
  ca: fs.readFileSync('ca.crt', 'utf8')
}, function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at https://127.0.0.1:1337/');
