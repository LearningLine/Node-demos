var events = require('events');
var util = require('util');

// Represents the "brain" of the server without any direct dependencies on
// so it can be tested in isolation.
//
// `subscribe`, `unsubscribe`, and `publish` methods use two indexes to
// perfom fast lookups instead of wastefully looping and comparing.
//
// Should not leak memory as clients subscribe and unsubscribe.
function Broker() {
    events.EventEmitter.call(this);

    // Maps topics to clients for fast publishing:
    this._topics = {
        // topic1: { client1: client1, client2: client2 },
        // topic2: { client2: client2 }
    };

    // Maps clients to topics for fast subscribing and unsubscribing:
    this._clients = {
        // id1: { topic1: topic1 },
        // id2: { topic1: topic1, topic2: topic2 }
    };

    // Would be nice to use Map and Set from ES6 for this!
}

util.inherits(Broker, events.EventEmitter);

Broker.prototype.subscribe = function(topic, client) {
    var topics = this._topics[topic];

    if (!topics) {
        topics = this._topics[topic] = {};
    }

    topics[client] = client;

    var clients = this._clients[client];

    if (!clients) {
        clients = this._clients[client] = {};
    }

    clients[topic] = topic;

    this.emit('subscribe', topic, client);
};

Broker.prototype.unsubscribe = function(topic, client) {
    var topics = this._topics[topic];

    if (topics) {
        delete topics[client];

        if (!Object.keys(topics).length) {
            delete this._topics[topic];
        }
    }

    var clients = this._clients[client];

    if (clients) {
        delete clients[topic];

        if (!Object.keys(clients).length) {
            delete this._clients[client];
        }
    }

    this.emit('unsubscribe', topic, client);
};

// Unsubscribe a client from all topics.
// Useful when a client disconnects.
Broker.prototype.unsubscribeAll = function(client) {
    var clients = this._clients[client];

    if (clients) {
        for (var topic in clients) {
            this.unsubscribe(topic, client);
        }
    }
};

Broker.prototype.publish = function(topic, message) {
    var topics = this._topics[topic];

    if (topics) {
        this.emit('publish', topic, message, topics);
    }
};

// Get a description of the topics the broker is managing subscriptions for.
// Useful for testing, diagnostics, and serialization.
Broker.prototype.topics = function() {
    var topics = {};

    for (var topic in this._topics) {
        topics[topic] = Object.keys(this._topics[topic]);
    }

    return topics;
};

// Get a description of the clients the broker is managing subscriptions for.
// Useful for testing, diagnostics, and serialization.
Broker.prototype.clients = function() {
    var clients = {};

    for (var id in this._clients) {
        clients[id] = Object.keys(this._clients[id]);
    }

    return clients;
};

// Default export is a "global" broker instance:
module.exports = exports = new Broker();

// For creating custom brokers:
exports.Broker = Broker;
