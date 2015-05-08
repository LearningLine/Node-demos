#!/usr/bin/env node

var http = require('http');

console.log('server pid: %d', process.pid);

http.createServer(function (req, res) {
  console.log('request handled by pid: %d', process.pid);

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World (port is ' + process.env.PORT + ')\n');
}).listen(process.env.PORT || 1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
