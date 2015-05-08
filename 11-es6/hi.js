'use strict';

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x3,
    property = _x4,
    receiver = _x5; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

// arrow functions

// function inc(a) { return a + 1; }
// var inc = function(a) { return a + 1; }
// var inc = a => a + 1;
// console.log(inc(123));

// function Person(name) {
//     this.name = name;
//
//     this.speak = function(otherPeople) {
//         // otherPeople.forEach(function(otherPerson) {
//         //     console.log('Hi, %s! My name is %s.', otherPerson, this.name);
//         // });
//
//         otherPeople.forEach(otherPerson =>
//             console.log('Hi, %s! My name is %s.', otherPerson, this.name)
//         );
//     }
//
//     // this.speak = () => console.log(this.name);
// }
//
// var jason = new Person('Jason');
// jason.speak([ 'Alice', 'Bob' ]);

// classes

var Person = (function () {
    function Person(name) {
        _classCallCheck(this, Person);

        this.name = name;
    }

    _createClass(Person, [{
        key: 'speak',
        value: function speak() {
            console.log('Hi, my name is %s!', this.name);
        }
    }], [{
        key: 'staticMethod',
        value: function staticMethod() {
            console.log('static');
        }
    }]);

    return Person;
})();

var jason = new Person('Jason');
jason.speak();

var Employee = (function (_Person) {
    function Employee(name, dept) {
        _classCallCheck(this, Employee);

        _get(Object.getPrototypeOf(Employee.prototype), 'constructor', this).call(this, name);

        this.dept = dept;
    }

    _inherits(Employee, _Person);

    _createClass(Employee, [{
        key: 'speak',
        value: function speak() {
            _get(Object.getPrototypeOf(Employee.prototype), 'speak', this).call(this);

            console.log('I work in the %s department.', this.dept);
        }
    }]);

    return Employee;
})(Person);

var alice = new Employee('Alice', 'IT');
alice.speak();

// destructuring

var person = {
    firstName: 'Jason',
    lastName: 'Diamond'
};

function formatName1(person) {
    var first = person.firstName;
    var last = person.lastName;

    return first + ' ' + last;
}

function formatName2(person) {
    var firstName = person.firstName;
    var lastName = person.lastName;

    return firstName + ' ' + lastName;
}

function formatName3(person) {
    var first = person.firstName;
    var last = person.lastName;

    return first + ' ' + last;
}

function formatName4(_ref) {
    var first = _ref.firstName;
    var last = _ref.lastName;

    return first + ' ' + last;
}

function formatName(_ref2) {
    var first = _ref2.firstName;
    var last = _ref2.lastName;

    // template literals
    return '' + first + ' ' + last.toUpperCase();
}

function formatArray(_ref3) {
    var _ref32 = _slicedToArray(_ref3, 2);

    var first = _ref32[0];
    var last = _ref32[1];

    return first + ' ' + last;
}

console.log(formatName(person));
console.log(formatArray(['Alice', 'Smith']));

// template literal tags

function myTag(template, values) {
    console.log(arguments);
}

myTag(_taggedTemplateLiteral(['a number: ', ', a string: ', ', a date: ', ''], ['a number: ', ', a string: ', ', a date: ', '']), 123, 'foo', new Date());

//html`<p>${user.name}</p>`

// get`http://aouhsatnoeuhtsoe.com
// Content-Type: asohuasetno
//
// snathusna
// anoteuhans
// aoeuast
// `

// spread and rest operators

// params int[] nums
function sum() {
    for (var _len = arguments.length, nums = Array(_len), _key = 0; _key < _len; _key++) {
        nums[_key] = arguments[_key];
    }

    return nums.reduce(function (p, c) {
        return p + c;
    }, 0);
}

console.log(sum(1, 2, 3));

var nums = [4, 5, 6];

console.log(sum.apply(undefined, nums));

// default argument values

function foo() {
    var a = arguments[0] === undefined ? 123 : arguments[0];
    var b = arguments[1] === undefined ? 456 : arguments[1];
}

// let and const

function bar() {
    // console.log(a);

    if (false) {
        var a = 1;
        var b = 1;
        // b = 2;
    }

    // console.log(a);
}

bar();

//

// a = a || 123;
// b = b || 456;
