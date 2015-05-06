#!/usr/bin/env node

var client = require('../lib/client');

var port = process.env.PORT || 1212;

var args = process.argv.slice(2);

if (args.length < 1) {
    console.error('usage: %s <topic...>', path.basename(process.argv[1]));
    return process.exit(1);
}

client.connect({ port: port }, function(connection) {
    console.log('connected');

    connection.on('message', function(topic, message) {
        console.log('%s: %s', topic, message);
    });

    connection.on('end', function() {
        console.log('disconnected');
    });

    connection.on('error', function(err) {
        console.log(err);
    });

    args.forEach(connection.subscribe);
});
