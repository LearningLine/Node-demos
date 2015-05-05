var stream = require('stream');
var util = require('util');

function Json() {
    stream.Transform.call(this);
    this._writableState.objectMode = true;
}

util.inherits(Json, stream.Transform);

Json.prototype._transform = function(obj, enc, done) {
    this.push(new Buffer(JSON.stringify(obj) + '\n', 'utf8'));

    done();
};

module.exports = Json;
