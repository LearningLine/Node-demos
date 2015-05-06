// Topic that publishes current time every second.

module.exports = function(broker) {
    setInterval(function() {
        broker.publish('time', new Date().toISOString());
    }, 1000);
};
