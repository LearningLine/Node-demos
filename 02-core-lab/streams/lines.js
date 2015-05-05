var stream = require('stream');
var util = require('util');

function Lines() {
    stream.Transform.call(this);
    this._readableState.objectMode = true;
}

util.inherits(Lines, stream.Transform);

Lines.prototype._transform = function(data, enc, done) {
    var str = (this.buffer || '') + data.toString();
    var lines = str.split('\n');
    this.buffer = lines.pop();
    lines.forEach(this.push.bind(this));
    done();
};

Lines.prototype._flush = function(done) {
    if (this.buffer) {
        this.push(this.buffer);
    }
};

module.exports = Lines;
