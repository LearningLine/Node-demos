// Topic that publishes broker activity.

module.exports = function(broker) {
    broker.on('subscribe', function(topic, client) {
        broker.publish('broker', 'subscribed ' + client + ' to ' + topic);
    });

    broker.on('unsubscribe', function(topic, client) {
        broker.publish('broker', 'unsubscribed ' + client + ' from ' + topic);
    });

    broker.on('publish', function(topic, message, clients) {
        if (topic !== 'broker') {
            // publishing on ever publish is too noisy
            // maybe collect stats and publish every interval?
            // broker.publish('broker', 'published to ' + Object.keys(clients).length + ' clients on ' + topic);
        }
    });
};
