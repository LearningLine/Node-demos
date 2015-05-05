#!/usr/bin/env node

var fs = require('fs');
// var path = require('path');
var request = require('request');
// var foo = require('./foo');

var args = process.argv.slice(2);

if (!args.length) {
    console.log('usage: node placekitten.js <WIDTHxHEIGHT...>');
    process.exit(1);
}

args.forEach(function(spec) {
    var url = 'http://fillmurray.com/' + spec.replace('x', '/');
    console.log('downloading %s', url);
    request.get(url).pipe(fs.createWriteStream('kitten.' + spec + '.png'));
});
