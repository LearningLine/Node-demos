#!/usr/bin/env node

var args = process.argv.slice(2);

if (args.length < 1) {
    console.log('usage: node data.js <file>');
    process.exit(1);
}

var fs = require('fs');
var path = require('path');

var _ = require('lodash');

// console.log(__dirname);

var p = path.resolve(__dirname, args[0]);

// nodeback or errback
fs.readFile(p, { encoding: 'utf8' }, function(err, data) {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {
        var lines = data.split('\n');

        var sorted = _(lines.slice(1))
            .filter()
            .sortBy()
            .value();

        console.log(sorted);
    }
});

// var data = fs.readFileSync(p);
// console.log(data);
