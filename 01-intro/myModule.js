// var exports = module.exports = {};
// module.exports === exports

var local = 123;

function localFun() {
}

// exports.sayHello = function() {
//     console.log('hello');
// };
//
// exports.exportedVar = 456;

module.exports = {
    sayHello: function(person) { console.log('Hello, %s!', person.toUpperCase()); },
    exportedVar: 456
};

// function MyService() {
// }
//
// module.exports = new MyService();
// module.exports.ctor = MyService;
