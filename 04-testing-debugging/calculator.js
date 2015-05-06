var Promise = require('bluebird');

module.exports = Calculator;

function Calculator(timeout, db) {
    // poor man's dependency injection
    this.timeout = timeout || setTimeout;

    this.db = db || {
        write: function(data, cb) {
            console.log('writing to db: %j', data);
            setTimeout(cb, 1000); // pretending to write
        }
    };
}

Calculator.prototype = {
    add: function(a, b) {
        return a + b;
    },

    useDB: function(cb) {
        this.db.write({ data: 123 }, function() {
            cb();
        });
    },

    factorPrimes: function(cb) {
        this.timeout(function() {
            cb(null, 17);
        }, 500);
    },

    factorPrimesAsync: function() {
        var self = this;

        return new Promise(function(resolve, reject) {
            self.factorPrimes(function(err, prime) {
                if (err) { reject(err); }
                else     { resolve(prime); }
            });
        });
    }
};
