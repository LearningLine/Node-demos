#!/usr/bin/env node

var fs = require('fs');

var Promise = require('bluebird');

console.log('about to read file...');

// fs.readFile(__filename, 'utf8', function(err, data) {
//     console.log(data);
// });

// var readFileAsync = Promise.promisify(fs.readFile);

Promise.promisifyAll(fs);

// fs.readFileAsync = Promise.promisify(fs.readFile);

fs.readFileAsync('1.txt', 'utf8')
    .then(function(data1) {
        return fs.readFileAsync('2.txt', 'utf8')
            .then(function(data2) {
                return [ data1, data2 ];
            })
        ;
    })
    .map(function(data) {
        return data.trim();
    })
    .then(function(data) {
        console.log(data);
    })
    .catch(function(err) {
        console.log('caught an error!');
        console.log(err);
        // throw err;
    })
;

// try {
//     var data = readFile();
//     data = data.toUpperCase();
//     console.log(data);
// } catch (err) {
//     console.log(err);
// }

console.log('script looks done...');
