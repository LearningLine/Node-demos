var fs = require('fs');
var stream = require('stream');
var util = require('util');

var input = fs.createReadStream('data.txt');
var output = fs.createWriteStream('output.txt');

function MyTransform() {
    stream.Transform.call(this);
    this.count = 0;
    this.buffer = '';
}

util.inherits(MyTransform, stream.Transform);

MyTransform.prototype._transform = function(data, enc, done) {
    var lines = (this.buffer + data.toString()).split('\n');

    this.buffer = lines.pop() || '';

    lines.forEach(function(line) {
        ++this.count;

        this.push(this.count + ': ' + line + '\n');
    }, this);

    done();
};

MyTransform.prototype._flush = function(done) {
    ++this.count;

    this.push(this.count + ': ' + this.buffer + '\n');
};

var transform = new MyTransform();

input.pipe(transform).pipe(output);
