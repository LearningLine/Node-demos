#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var broker = require('../lib/broker');
var server = require('../lib/server');

var topics = process.argv.slice(2);

if (!topics.length) {
    // No topics specified, so load all topics we can find.
    topics = fs.readdirSync(path.join(__dirname, '../lib/topics'))
        .filter(function(file) {
            return (/\.js$/i).test(file);
        })
        .map(function(file) {
            return path.basename(file, '.js');
        })
    ;
}

topics.forEach(function(topic) {
    console.log('starting %s topic', topic);

    require('../lib/topics/' + topic)(broker);
});

var port = process.env.PORT || 1212;

var msgs = {
    subscribe: 'subscribed to',
    unsubscribe: 'unsubscribed from',
    publish: 'published to'
};

server.createServer({ broker: broker })
    .on('client', function(client, id) {
        console.log('client %s connected', id);

        client
            .on('data', function(data) {
                console.log('data from client %s: %s', id, data.toString('hex').match(/../g).join(' '));
            })
            .on('packet', function(packet) {
                console.log('client %s %s %s', id, msgs[packet.type], packet.topic);
            })
            .on('end', function() {
                console.log('client %s disconnected', id);
            })
        ;
    })
    .listen(port, function() {
        console.log('server listening on port %d', port);
    })
;
