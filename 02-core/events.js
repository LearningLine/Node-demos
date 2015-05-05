'use strict';

var events = require('events');
var fs = require('fs');
var util = require('util');

// var emitter = new events.EventEmitter();
//
// emitter.on('foo', function(arg) {
//     console.log(arg);
// });
//
// emitter.emit('foo', 'bar');

function FileFinder() {
    events.EventEmitter.call(this);
}

util.inherits(FileFinder, events.EventEmitter);

FileFinder.prototype.findFiles = function(path) {
    // this is good
    var self = this;
    fs.readdir(path, function(err, files) {
        // this is gone
        if (err) {
            self.emit('error', err);
        } else {
            files.forEach(function(file) {
                // this is still gone
                self.emit('found', file);
            });
        }
    });
};

var finder = new FileFinder();

finder.findFiles(__dirname);

finder.on('found', function(file) {
    console.log('found: %s', file);
});

finder.on('error', function(err) {
    console.log(err);
});









//
