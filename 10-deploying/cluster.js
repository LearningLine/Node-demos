#!/usr/bin/env node

var cluster = require('cluster');
var os = require('os');

if (cluster.isMaster) {
  console.log('master pid: %d', process.pid);

  for (var i = 0, n = os.cpus().length; i < n; i++) {
    cluster.fork();
  }
} else {
  require('./server');
}
