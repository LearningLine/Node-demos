#!/usr/bin/env node

var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(8080, function() {
    // foo = 'bar';
    console.log('server listening on port 8080');
});
