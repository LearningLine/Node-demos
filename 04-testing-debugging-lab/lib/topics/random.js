// Topic that randomly publishes a random number.

module.exports = function(broker) {
    (function tick() {
        broker.publish('random', Math.random().toString());

        setTimeout(tick, Math.random() * 2000);
    })();
};
