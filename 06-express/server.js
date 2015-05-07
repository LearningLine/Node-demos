#!/usr/bin/env node

var path = require('path');

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

var app = express();

app.set('view engine', 'html');
// app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

app.use(function(req, res, next) {
    console.log('middleware invoked');

    if (req.path === '/server.js') {
        res.status(400).send('stop hacking!');
    } else {
        next();
    }
});

app.use(express.static(path.join(__dirname, 'public'), { index: false }));

app.get('/', function(req, res, next) {
    // throw new Error('oops');

    // res.end('Hello, Express!');

    // res.sendFile(path.join(__dirname, 'index.html'));

    // res.render(path.join(__dirname, 'index.ejs'));

    res.render('index');
});

app.post('/', bodyParser(), function(req, res, next) {
    console.log(req.body);

    setTimeout(function() {
        try {
            var name = req.body.name;

            res.send({
                ok: !!req.body
            });
        } catch (err) {
            next(err);
        }
    });
});

app.get(/\/archive\/(\d{4})/, function(req, res) {
    res.send(req.params[0]);
});

// app.use(errorHandler());

app.use(function(err, req, res, next) {
    if (req.xhr) {
        res.status(500).json({ error: err.message });
    } else {
        res.status(500).send(err.message);
    }
});

var port = process.env.PORT || 1337;

app.listen(port, function() {
    console.log('http://127.0.0.1:%d', port);
});
