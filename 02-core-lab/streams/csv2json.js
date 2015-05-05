#!/usr/bin/env node

var Lines = require('./lines');
var Objects = require('./objects');
var Json = require('./json');

process.stdin
    .pipe(new Lines())
    .pipe(new Objects([ 'id', 'name', 'age' ]))
    .pipe(new Json())
    .pipe(process.stdout)
;
