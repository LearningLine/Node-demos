#!/usr/bin/env node

var http = require('http');
var path = require('path');

var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

io.on('connect', function(socket) {
    // socket.emit('authenticateYourself', 'nonce');

    console.log('client %s connected', socket.id);

    socket.on('hi', function() {
        console.log('client %s said hi', socket.id);
    });

    socket.on('sendMessage', function(room, msg) {
        io.to(room).emit('chatMessage', msg);
    });

    socket.on('joinRoom', function(room) {
        socket.join(room);
    });

    socket.emit('hello');
});

app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 1337;

server.listen(port, function() {
    console.log('http://127.0.0.1:%d', port);
});
