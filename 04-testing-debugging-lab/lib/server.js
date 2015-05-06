var net = require('net');

var Broker = require('./broker').Broker;
var generate = require('./generator').generate;
var parse = require('./parser').parse;

exports.createServer = function(options) {
    options = options || {};

    var broker = options.broker || new Broker();

    var count = 0; // for assigning clients unique ids
    var clients = {}; // for looking up clients by id

    broker.on('publish', function(topic, message, ids) {
        var packet = generate({
            type: 'publish',
            topic: topic,
            message: message
        });

        for (var id in ids) {
            var client = clients[ids[id]];
            client.write(packet);
        }
    });

    return net.createServer(function(client) {
        var id = ++count + '-' + client.remoteAddress + ':' + client.remotePort;

        clients[id] = client;

        client.server.emit('client', client, id);

        var buffer = null;

        client.on('data', function(data) {
            buffer = buffer ? Buffer.concat([ buffer, data ]) : data;

            var packet = parse(buffer);

            // bug?
            if (packet) {
                client.emit('packet', packet);

                switch (packet.type) {
                    case 'subscribe':
                        broker.subscribe(packet.topic, id);
                        break;
                    case 'unsubscribe':
                        broker.unsubscribe(packet.topic, id);
                        break;
                    case 'publish':
                        broker.publish(packet.topic, packet.message);
                        break;
                }

                buffer = buffer.slice(packet.length);

                packet = parse(buffer);
            }
        });

        client.on('end', function() {
            broker.unsubscribeAll(id);

            delete clients[id];
        });
    });
};
