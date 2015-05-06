#!/usr/bin/env node

var path = require('path');

var client = require('../lib/client');

var port = process.env.PORT || 1212;

var args = process.argv.slice(2);

if (args.length < 1) {
    console.error('usage: %s <topic> [message]', path.basename(process.argv[1]));
    return process.exit(1);
}

var topic = args[0];
var message = args.slice(1).join(' ');

client.connect({ port: port }, function(connection) {
    console.log('connected');

    connection.on('end', function() {
        console.log('disconnected');
    });

    connection.on('error', function(err) {
        console.log(err);
    });

    console.log('publishing to %s', topic);

    connection.publish(topic, message, function() {
        connection.end();
    });
});
