#!/usr/bin/env node

// argv[0] === 'node'
// argv[1] === 'test.js'
// argv[2]+ your script args

var args = process.argv.slice(2);

if (args.length < 1) {
    console.log('usage: node test.js <name>');
    process.exit(1);
}

console.log('Hello, Node.js!');

// var crypto = require('crypto');
// console.log(crypto.getHashes());

var myModule = require('./myModule');

console.log(myModule);

var person = args[0];

myModule.sayHello(person);
