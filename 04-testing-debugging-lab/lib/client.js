var net = require('net');

var generator = require('./generator');
var parser = require('./parser');

// Connects to a broker.
//
// Returns the socket extended with `subscribe`, `unsubscribe`, and `publish` methods.
//
// Emits `message` events with `topic` and `message` arguments.
exports.connect = exports.createConnection = function(options, connectListener) {
    if (typeof options === 'function') {
        connectListener = options;
        options = {};
    }

    options = options || {};

    options.port = options.port || 1212;

    var connection = net.connect(options, function() {
        if (connectListener) {
            connectListener(connection);
        }
    });

    var buffer = null;

    connection.on('data', function(data) {
        buffer = buffer ? Buffer.concat([ buffer, data ]) : data;

        var packet = parser.parse(buffer);

        while (packet) {
            connection.emit('message', packet.topic, packet.message);
            buffer = buffer.slice(packet.length);
            packet = parser.parse(buffer);
        }
    });

    connection.subscribe = function(topic, callback) {
        return connection.write(generator.generate({
            type: 'subscribe',
            topic: topic
        }), callback);
    };

    connection.unsubscribe = function(topic, callback) {
        return connection.write(generator.generate({
            type: 'unsubscribe',
            topic: topic
        }), callback);
    };

    connection.publish = function(topic, message, callback) {
        return connection.write(generator.generate({
            type: 'publish',
            topic: topic,
            message: message
        }), callback);
    };

    return connection;
};
