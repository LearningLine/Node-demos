#!/usr/bin/env node

var path = require('path');

var express = require('express');
var morgan = require('morgan');
var jsonServer = require('json-server');

var port = process.env.PORT || 1337;

var app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

var server = jsonServer.create();
server.use('/api', jsonServer.router(path.join(__dirname, 'db.json')));
app.use(server);

app.listen(port, function() {
    console.log('server running at http://127.0.0.1:%d/', port);
});
