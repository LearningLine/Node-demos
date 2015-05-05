// npm i through2
var through2 = require('through2');

var numRegExp = /^\d+$/;

module.exports = function(props) {
    return through2({ objectMode: true }, function(data, enc, done) {
        var obj = {};

        data.split(',').forEach(function(datum, i) {
            if (numRegExp.test(datum)) {
                datum = +datum;
            }

            obj[props[i]] = datum;
        });

        this.push(obj);

        done();
    });
};
