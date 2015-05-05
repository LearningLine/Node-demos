#!/usr/bin/env node

var Lines = require('./lines');
var Objects = require('./objects2');
var Json = require('./json');

process.stdin
    .pipe(new Lines())
    .pipe(new Objects([ 'id', 'name', 'age' ]))
    .pipe(new Json())
    .pipe(process.stdout)
;
