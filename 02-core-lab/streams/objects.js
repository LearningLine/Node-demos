var stream = require('stream');
var util = require('util');

function Objects(props) {
    stream.Transform.call(this, {
        objectMode: true
    });

    this.props = props;
}

util.inherits(Objects, stream.Transform);

var numRegExp = /^\d+$/;

Objects.prototype._transform = function(data, enc, done) {
    var obj = {};

    data.split(',').forEach(function(datum, i) {
        if (numRegExp.test(datum)) {
            datum = +datum;
        }

        obj[this.props[i]] = datum;
    }, this);

    this.push(obj);

    done();
};

module.exports = Objects;
